# Quick Start Guide - Contact Management System

## ⚡ Quick Setup (5 minutes)

### 1. Install & Start
```bash
cd C:\Users\ankit\OneDrive\Desktop\portfolio
npm install
npm start
```

### 2. Access
- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Login**: Username: `ankit kumar` | Password: `Ankit@8757`

---

## 📝 Form Fields

| Field | Required | Validation | Limit |
|-------|----------|-----------|-------|
| Name | ✅ Yes | Not empty | 100 chars |
| Email | ✅ Yes | Valid format | 255 chars |
| Subject | ✅ Yes | Not empty | 200 chars |
| Message | ✅ Yes | Not empty | 5000 chars |

---

## 🔒 Security Features at a Glance

- ✅ Email validation
- ✅ Input sanitization (removes `<>`)
- ✅ Rate limiting (5 per minute)
- ✅ Honeypot spam detection
- ✅ Admin authentication
- ✅ SQL injection prevention
- ✅ Error message sanitization

---

## 📊 Database Locations

| Environment | Path |
|-------------|------|
| Development | `database/messages.db` |
| Production | Environment variable set to Supabase |

---

## 🔑 Environment Variables

```env
PORT=3000
ADMIN_USERNAME=ankit kumar
ADMIN_PASSWORD=Ankit@8757
SUPABASE_URL=           # Optional for production
SUPABASE_SERVICE_ROLE_KEY=  # Optional for production
```

---

## 🧪 API Quick Test

### Submit Message
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Hello",
    "honeypot": ""
  }'
```

### Get Messages (Admin)
```bash
curl -X GET http://localhost:3000/api/messages \
  -H "Authorization: Basic YW5raXQga3VtYXI6QW5raXRAODc1Nw=="
```

### Update Status
```bash
curl -X PATCH http://localhost:3000/api/messages/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YW5raXQga3VtYXI6QW5raXRAODc1Nw==" \
  -d '{"status": "read"}'
```

---

## 📋 Admin Dashboard Features

### Tabs/Filters
- All, New, Read, Replied, Archived

### Search
- Search by name or email

### Actions per Message
- View full message
- Send reply
- Mark as read/new
- Archive/restore
- Delete with confirmation

### Statistics
- Total messages count
- New messages count
- Read messages count
- Replied messages count

---

## ✨ Form Behavior

### On Success
- ✅ Success message in green
- ✅ Form clears automatically
- ✅ Button re-enables after 3 seconds
- ✅ Message persisted in database

### On Error
- ❌ Error message in red
- ❌ Form stays filled (user can fix)
- ❌ Button stays enabled for retry
- ❌ Message not saved

### Button States
- Normal: "Send Message"
- Loading: Disabled + 60% opacity
- After Success: Disabled for 3 seconds then re-enables

---

## 🚀 Deploy to Production

### Render.com (Free Tier Available)

1. Push to GitHub
2. Connect repo to Render
3. Set env variables in dashboard
4. Auto-deploys on git push

### Heroku Alternative

```bash
heroku create your-app-name
git push heroku main
heroku config:set ADMIN_USERNAME=secure_user
heroku config:set ADMIN_PASSWORD=secure_pass
```

---

## 🔧 Common Tasks

### Change Admin Credentials
1. Edit `.env` file
2. Restart server
3. No code changes needed

### Change Button Text
- Edit `frontend/index.html`
- Find submit button
- Change text content

### Change Form Colors
- Edit `frontend/css/components.css`
- Search `.contact-form`
- Modify colors

### Delete Old Messages
1. Login to admin
2. View message
3. Click Delete button
4. Confirm deletion

### Export Messages
1. Access messages via API
2. Save JSON response
3. Parse in Excel/spreadsheet

---

## 📞 Troubleshooting

### Server won't start
```bash
# Check port usage
netstat -ano | findstr :3000

# Kill process on that port or change PORT in .env
```

### Can't login to admin
- Verify `.env` credentials
- Restart server after changing `.env`
- Check credentials are exactly matching

### Rate limit too strict?
- Edit `backend/server.js`
- Find `RATE_LIMIT_WINDOW = 60000`
- Change to `120000` (2 minutes)
- Change `MAX_SUBMISSIONS_PER_WINDOW = 5` to higher number

### Database errors
```bash
# Reset database
rm database/messages.db
npm start
```

---

## 📚 File Structure

```
portfolio/
├── backend/
│   └── server.js (UPDATED - enhanced API)
├── frontend/
│   ├── index.html (UPDATED - added subject field)
│   ├── script.js (UPDATED - enhanced form handling)
│   ├── admin.html (NEW - admin dashboard)
│   └── css/
│       └── components.css (UPDATED - form styling)
├── database/
│   └── messages.db (SQLite database)
├── .env.example (NEW - environment template)
├── CONTACT_SYSTEM_DOCUMENTATION.md (NEW - full docs)
└── QUICK_REFERENCE.md (NEW - this file)
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Server starts without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] Contact form has Name, Email, Subject, Message fields
- [ ] Submit button works
- [ ] Admin dashboard loads at http://localhost:3000/admin
- [ ] Admin login works with credentials
- [ ] Can view submitted messages in admin
- [ ] Can reply to messages
- [ ] Can change message status
- [ ] Database file created at database/messages.db

---

## 📞 Support

For issues, check:
1. CONTACT_SYSTEM_DOCUMENTATION.md (full guide)
2. Troubleshooting section above
3. Server console output
4. Browser console (F12)

---

**🎉 Your contact system is ready to use!**

