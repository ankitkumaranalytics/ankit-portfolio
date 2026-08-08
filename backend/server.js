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

fs.mkdirSync(databaseDir, { recursive: true });

if (!fs.existsSync(dbPath) && fs.existsSync(rootDbPath)) {
  fs.copyFileSync(rootDbPath, dbPath);
}

app.use(cors());
app.use(express.json());

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
      message TEXT NOT NULL,
      reply TEXT,
      replied_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (createErr) => {
    if (createErr) {
      console.error('Table setup failed:', createErr.message);
      return;
    }

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
        console.log('Local database ready');
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

function saveMessageToLocalDb(name, email, message) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO messages (name, email, message, reply, replied_at) VALUES (?, ?, ?, NULL, NULL)');
    stmt.run(name, email, message, function (err) {
      stmt.finalize();
      if (err) {
        reject(new Error('Failed to save message'));
        return;
      }
      resolve({ success: true, id: this.lastID });
    });
  });
}

function saveReplyToLocalDb(id, reply) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE messages SET reply = ?, replied_at = CURRENT_TIMESTAMP WHERE id = ?', [reply, id], function (err) {
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

app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    if (USE_SUPABASE) {
      const insertedRows = await supabaseRequest('/rest/v1/messages', {
        method: 'POST',
        body: JSON.stringify([{ name, email, message }]),
        headers: { Prefer: 'return=representation' }
      });

      res.status(201).json({ success: true, id: insertedRows?.[0]?.id || null });
      return;
    }

    const result = await saveMessageToLocalDb(name, email, message);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
