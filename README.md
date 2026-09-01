# Ankit Portfolio

This portfolio includes a secure contact form, admin dashboard, and message storage.

## Local development

1. Copy `.env.example` to `.env` and fill the values.
2. Install dependencies:
   npm install
3. Start the app:
   npm start
4. Open http://localhost:3000

## Deploy to Render

1. Push this repository to GitHub.
2. In Render, create a new Web Service from the GitHub repository.
3. Use the existing `render.yaml` file.
4. Set your real environment values in Render Dashboard under Environment:
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
   - ADMIN_SESSION_SECRET
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASSWORD
   - ADMIN_EMAIL
   - EMAIL_FROM_NAME
5. Deploy the service.

## Admin dashboard

Visit:
- `/admin`

Use the username and password configured in your production environment.

## Notes

- The app uses SQLite locally by default.
- If you configure Supabase, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your environment.
- The contact form stores valid submissions in the database and supports admin actions such as read/reply/archive/delete.
