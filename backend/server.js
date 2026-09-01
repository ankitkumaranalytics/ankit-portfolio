const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'ankit kumar';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Ankit@8757';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
const frontendPath = path.join(__dirname, '..', 'frontend');
const databaseDir = path.join(__dirname, '..', 'database');
const rootDbPath = path.join(__dirname, '..', 'messages.db');
const dbPath = path.join(databaseDir, 'messages.db');

// Submission tracking for rate limiting
const submissionTracker = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// Input validation constants
const FIELD_LIMITS = {
  name: 100,
  email: 255,
  subject: 200,
  message: 5000
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

fs.mkdirSync(databaseDir, { recursive: true });

if (!fs.existsSync(dbPath) && fs.existsSync(rootDbPath)) {
  fs.copyFileSync(rootDbPath, dbPath);
}

app.use(cors());
app.use(express.json());

// Security: Sanitize input
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Validate email format
function isValidEmail(email) {
  return EMAIL_REGEX.test(email) && email.length <= FIELD_LIMITS.email;
}

// Check rate limit
function checkRateLimit(ip) {
  const now = Date.now();
  if (!submissionTracker.has(ip)) {
    submissionTracker.set(ip, []);
  }
  
  const submissions = submissionTracker.get(ip);
  const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT_WINDOW);
  submissionTracker.set(ip, recentSubmissions);
  
  return recentSubmissions.length < MAX_SUBMISSIONS_PER_WINDOW;
}

// Record submission
function recordSubmission(ip) {
  if (!submissionTracker.has(ip)) {
    submissionTracker.set(ip, []);
  }
  submissionTracker.get(ip).push(Date.now());
}

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(frontendPath, 'admin.html'));
});

app.use(express.static(frontendPath));

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      reply TEXT,
      replied_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (createErr) => {
    if (createErr) {
      console.error('Table setup failed:', createErr.message);
      return;
    }

    // Add subject column if it doesn't exist
    db.run('ALTER TABLE messages ADD COLUMN subject TEXT', (subjectErr) => {
      if (subjectErr && !/duplicate column name/i.test(subjectErr.message)) {
        console.error('Subject column setup failed:', subjectErr.message);
      }
    });

    // Add status column if it doesn't exist
    db.run("ALTER TABLE messages ADD COLUMN status TEXT DEFAULT 'new'", (statusErr) => {
      if (statusErr && !/duplicate column name/i.test(statusErr.message)) {
        console.error('Status column setup failed:', statusErr.message);
      }
    });

    // Add updated_at column if it doesn't exist (without default)
    db.run('ALTER TABLE messages ADD COLUMN updated_at DATETIME', (updatedErr) => {
      if (updatedErr && !/duplicate column name/i.test(updatedErr.message)) {
        console.error('Updated_at column setup failed:', updatedErr.message);
      }
    });

    db.run('ALTER TABLE messages ADD COLUMN reply TEXT', (replyErr) => {
      if (replyErr && !/duplicate column name/i.test(replyErr.message)) {
        console.error('Reply column setup failed:', replyErr.message);
      }
    });

    db.run('ALTER TABLE messages ADD COLUMN replied_at DATETIME', (repliedAtErr) => {
      if (repliedAtErr && !/duplicate column name/i.test(repliedAtErr.message)) {
        console.error('Replied at column setup failed:', repliedAtErr.message);
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS location (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        lat REAL,
        lng REAL,
        accuracy REAL,
        heading REAL,
        speed REAL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (locErr) => {
      if (locErr) {
        console.error('Location table setup failed:', locErr.message);
      } else {
        db.run('INSERT OR IGNORE INTO location (id, lat, lng, accuracy, updated_at) VALUES (1, NULL, NULL, NULL, CURRENT_TIMESTAMP)', (seedErr) => {
          if (seedErr) {
            console.error('Location seed row failed:', seedErr.message);
          }
        });
        console.log('Local database ready with enhanced schema');
      }
    });
  });
});

function checkAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const expectedHeader = `Basic ${Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64')}`;

  if (!authHeader || authHeader !== expectedHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}

async function supabaseRequest(endpoint, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${endpoint}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Supabase request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function getMessagesFromLocalDb() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        reject(new Error('Failed to fetch messages'));
        return;
      }
      resolve(rows);
    });
  });
}

function saveMessageToLocalDb(name, email, subject, message) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO messages (name, email, subject, message, status, reply, replied_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
    stmt.run(name, email, subject, message, 'new', function (err) {
      stmt.finalize();
      if (err) {
        reject(new Error('Failed to save message'));
        return;
      }
      resolve({ success: true, id: this.lastID });
    });
  });
}

function updateMessageStatusInLocalDb(id, status) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE messages SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id], function (err) {
      if (err) {
        reject(new Error('Failed to update message status'));
        return;
      }

      if (this.changes === 0) {
        resolve({ success: false, notFound: true });
        return;
      }

      resolve({ success: true });
    });
  });
}

function saveReplyToLocalDb(id, reply) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE messages SET reply = ?, replied_at = CURRENT_TIMESTAMP, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [reply, 'replied', id], function (err) {
      if (err) {
        reject(new Error('Failed to save reply'));
        return;
      }

      if (this.changes === 0) {
        resolve({ success: false, notFound: true });
        return;
      }

      resolve({ success: true });
    });
  });
}

function deleteMessageFromLocalDb(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM messages WHERE id = ?', [id], function (err) {
      if (err) {
        reject(new Error('Failed to delete message'));
        return;
      }

      if (this.changes === 0) {
        resolve({ success: false, notFound: true });
        return;
      }

      resolve({ success: true });
    });
  });
}

function getLatestLocationFromLocalDb() {
  return new Promise((resolve, reject) => {
    db.get('SELECT lat, lng, accuracy, heading, speed, updated_at FROM location WHERE id = 1', [], (err, row) => {
      if (err) {
        reject(new Error('Failed to fetch location'));
        return;
      }
      resolve(row || null);
    });
  });
}

function saveLocationToLocalDb(lat, lng, accuracy, heading, speed) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE location SET lat = ?, lng = ?, accuracy = ?, heading = ?, speed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
      [lat, lng, accuracy, heading, speed],
      (err) => {
        if (err) {
          reject(new Error('Failed to save location'));
          return;
        }
        resolve({ success: true });
      }
    );
  });
}

app.get('/api/messages', checkAdminAuth, async (req, res) => {
  try {
    const rows = USE_SUPABASE
      ? await supabaseRequest('/rest/v1/messages?select=id,name,email,message,created_at&order=created_at.desc')
      : await getMessagesFromLocalDb();

    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages/:id/reply', checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  if (!reply || !reply.trim()) {
    res.status(400).json({ error: 'Reply message is required' });
    return;
  }

  try {
    if (USE_SUPABASE) {
      await supabaseRequest(`/rest/v1/messages?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ reply: reply.trim(), replied_at: new Date().toISOString() })
      });
      res.json({ success: true });
      return;
    }

    const result = await saveReplyToLocalDb(id, reply.trim());
    if (result.notFound) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', checkAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    if (USE_SUPABASE) {
      await supabaseRequest(`/rest/v1/messages?id=eq.${id}`, { method: 'DELETE' });
      res.json({ success: true });
      return;
    }

    const result = await deleteMessageFromLocalDb(id);
    if (result.notFound) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update message status (read, replied, archived)
app.patch('/api/messages/:id/status', checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['new', 'read', 'replied', 'archived'];
  
  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    return;
  }

  try {
    if (USE_SUPABASE) {
      await supabaseRequest(`/rest/v1/messages?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, updated_at: new Date().toISOString() })
      });
      res.json({ success: true });
      return;
    }

    const result = await updateMessageStatusInLocalDb(id, status);
    if (result.notFound) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, subject, message, honeypot } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    // Honeypot check: if honeypot field is filled, reject silently
    if (honeypot && honeypot.trim() !== '') {
      res.status(201).json({ success: true, id: null });
      return;
    }

    // Rate limiting
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({ error: 'Too many submissions. Please try again later.' });
      return;
    }

    // Validate all fields present
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'All fields (name, email, subject, message) are required' });
      return;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Validate field lengths
    if (sanitizedName.length === 0 || sanitizedName.length > FIELD_LIMITS.name) {
      res.status(400).json({ error: `Name must be between 1 and ${FIELD_LIMITS.name} characters` });
      return;
    }

    if (sanitizedSubject.length === 0 || sanitizedSubject.length > FIELD_LIMITS.subject) {
      res.status(400).json({ error: `Subject must be between 1 and ${FIELD_LIMITS.subject} characters` });
      return;
    }

    if (sanitizedMessage.length === 0 || sanitizedMessage.length > FIELD_LIMITS.message) {
      res.status(400).json({ error: `Message must be between 1 and ${FIELD_LIMITS.message} characters` });
      return;
    }

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      res.status(400).json({ error: 'Please provide a valid email address' });
      return;
    }

    // Record submission for rate limiting
    recordSubmission(clientIp);

    try {
      if (USE_SUPABASE) {
        const insertedRows = await supabaseRequest('/rest/v1/messages', {
          method: 'POST',
          body: JSON.stringify([{ 
            name: sanitizedName, 
            email: sanitizedEmail, 
            subject: sanitizedSubject,
            message: sanitizedMessage,
            status: 'new',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]),
          headers: { Prefer: 'return=representation' }
        });

        res.status(201).json({ success: true, id: insertedRows?.[0]?.id || null });
        return;
      }

      const result = await saveMessageToLocalDb(sanitizedName, sanitizedEmail, sanitizedSubject, sanitizedMessage);
      res.status(201).json(result);
    } catch (dbErr) {
      console.error('Database error:', dbErr.message);
      res.status(500).json({ error: 'Failed to save your message. Please try again later.' });
    }
  } catch (error) {
    console.error('Submission error:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/api/location/latest', async (req, res) => {
  try {
    let row = null;
    if (USE_SUPABASE) {
      const rows = await supabaseRequest('/rest/v1/location?select=lat,lng,accuracy,heading,speed,updated_at');
      row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } else {
      row = await getLatestLocationFromLocalDb();
    }

    if (!row || row.lat == null || row.lng == null) {
      res.json({ location: null });
      return;
    }

    res.json({ location: row });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/location', async (req, res) => {
  const { lat, lng, accuracy, heading, speed } = req.body;

  if (typeof lat !== 'number' || typeof lng !== 'number' || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    res.status(400).json({ error: 'Valid lat and lng are required' });
    return;
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    res.status(400).json({ error: 'Coordinates are out of range' });
    return;
  }

  try {
    if (USE_SUPABASE) {
      const exists = await supabaseRequest('/rest/v1/location?select=id');

      if (Array.isArray(exists) && exists.length > 0) {
        await supabaseRequest('/rest/v1/location?id=eq.1', {
          method: 'PATCH',
          body: JSON.stringify({
            lat,
            lng,
            accuracy: accuracy || null,
            heading: heading || null,
            speed: speed || null,
            updated_at: new Date().toISOString()
          })
        });
      } else {
        await supabaseRequest('/rest/v1/location', {
          method: 'POST',
          body: JSON.stringify([
            {
              id: 1,
              lat,
              lng,
              accuracy: accuracy || null,
              heading: heading || null,
              speed: speed || null,
              updated_at: new Date().toISOString()
            }
          ])
        });
      }
    } else {
      await saveLocationToLocalDb(lat, lng, accuracy || null, heading || null, speed || null);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  if (USE_SUPABASE) {
    console.log('Supabase storage enabled');
  } else {
    console.log('Using local SQLite storage');
  }
});
