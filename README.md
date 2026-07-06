# Ankit Portfolio

A modern portfolio website with a contact form connected to a local database.

## Project Structure

- Frontend
  - index.html: main portfolio page
  - style.css: styling for the website
  - script.js: interactive behavior for the portfolio
  - admin.html: admin page to view and reply to messages

- Backend
  - server.js: Express server that serves the frontend and handles API requests
  - package.json: Node.js dependencies and scripts

- Database
  - messages.db: SQLite database storing contact form submissions

## Run Locally

1. Install dependencies
   - npm install
2. Start the server
   - npm start
3. Open the site
   - http://localhost:3000
4. Open the admin panel
   - http://localhost:3000/admin.html

## Admin Login

- Username: admin
- Password: admin123

## Features

- Portfolio sections for about, experience, education, skills, projects, certificates, gallery, FAQ, and contact
- Contact form that saves messages to the database
- Admin page to view, reply to, and delete messages
- Optional Supabase support via environment variables
