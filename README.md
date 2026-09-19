# 🌐 Ankit Kumar — Data Analyst Portfolio

<p align="center">
  <b>Data Analyst | BI Analyst | Power BI Developer | AI & Data Science</b>
</p>

<p align="center">
  A modern, responsive and production-ready personal portfolio built to showcase my analytics projects, technical skills, certifications and career journey.
</p>

<p align="center">

<a href="https://ankitkumaranalytics.github.io/ankit-portfolio/frontend/index.html">
<img src="https://img.shields.io/badge/🌐%20Live%20Portfolio-Visit%20Website-00C7B7?style=for-the-badge"/>
</a>

<a href="https://github.com/ankitkumaranalytics">
<img src="https://img.shields.io/badge/GitHub-Ankit%20Kumar-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://linkedin.com/in/ankit-kumar-b66067406">
<img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</p>

---

## 🚀 Live Portfolio

🌐 **Portfolio:**
https://ankitkumaranalytics.github.io/ankit-portfolio/frontend/index.html

The portfolio is designed as a central place for recruiters and hiring managers to explore my:

* 📊 Data Analytics projects
* 📈 Business Intelligence dashboards
* 🐍 Python projects
* 🗄️ SQL/data projects
* 🤖 AI & Machine Learning projects
* 📜 Certifications
* 🏆 Achievements
* 📄 Resume
* 📬 Contact information

---

# 👨‍💻 About

I'm a B.Tech Artificial Intelligence & Data Science student focused on building practical solutions using data, analytics and AI.

My primary career interests include:

**Data Analyst • Business Analyst • BI Analyst • Power BI Developer • Data Analytics**

I enjoy transforming raw data into meaningful insights through:

```text
Python
   ↓
Data Cleaning
   ↓
Exploratory Data Analysis
   ↓
SQL Analysis
   ↓
Data Visualization
   ↓
Dashboard Development
   ↓
Business Insights
```

---

# ✨ Portfolio Features

### 🏠 Professional Home Page

A recruiter-friendly landing page introducing my profile, skills and career focus.

### 👨‍💻 About Section

Information about my academic background, interests and career direction.

### 🛠️ Skills

Highlights my experience with:

* Python
* SQL
* Excel
* Power BI
* Tableau
* Pandas
* NumPy
* Scikit-learn
* Streamlit
* Data Visualization
* Git & GitHub

### 📊 Projects

Showcases practical projects involving:

* Data Analytics
* Business Intelligence
* Dashboard Development
* Machine Learning
* AI
* Recommendation Systems

### 📜 Certifications

Dedicated section for professional certifications, job simulations and learning achievements.

### 📄 Resume

Provides recruiters with access to my latest resume.

### 📬 Contact Form

The portfolio includes a secure contact form that allows visitors to send messages directly.

### 🔐 Admin Dashboard

Authorized administrators can manage submitted contact messages through the admin dashboard.

---

# 🔒 Contact & Admin System

The portfolio includes a backend-powered contact management system.

### Contact workflow

```text
Visitor
   ↓
Contact Form
   ↓
Validation
   ↓
Database
   ↓
Admin Dashboard
   ↓
Read / Reply / Archive / Delete
```

The system supports:

* Contact form submissions
* Input validation
* Database storage
* Admin authentication
* Message management
* Read/unread status
* Reply workflow
* Archive functionality
* Delete functionality
* Email configuration

---

# 🧰 Technology Stack

### Frontend

* HTML
* CSS
* JavaScript
* Responsive UI

### Backend

* Node.js
* Express.js

### Database

* SQLite for local development
* Supabase support for production/cloud database configuration

### Deployment

* Render
* GitHub

### Other

* Environment variables
* SMTP email integration
* Session-based authentication

---

# 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │     Visitor      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Portfolio Frontend│
                    └────────┬─────────┘
                             │
                    Contact Form
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
       ┌─────────────┐              ┌─────────────┐
       │  Database   │              │ SMTP / Email│
       └─────────────┘              └─────────────┘
              │
              ▼
       ┌─────────────┐
       │Admin Panel  │
       └─────────────┘
```

---

# 📂 Project Structure

```text
ankit-portfolio/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   └── server.js
│
├── .env.example
├── package.json
├── render.yaml
└── README.md
```

> Adjust the structure above if your actual repository folders differ.

---

# 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/ankitkumaranalytics/ankit-portfolio.git
```

### 2. Open the project

```bash
cd ankit-portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Copy:

```text
.env.example
```

to:

```text
.env
```

Then configure the required environment variables.

### 5. Start the application

```bash
npm start
```

### 6. Open the application

```text
http://localhost:3000
```

---

# ☁️ Deployment on Render

The application can be deployed using Render.

### Steps

1. Push the repository to GitHub.
2. Create a new Web Service on Render.
3. Connect the GitHub repository.
4. Use the existing `render.yaml` configuration.
5. Configure production environment variables.
6. Deploy the application.

### Environment Variables

```text
ADMIN_USERNAME
ADMIN_PASSWORD
ADMIN_SESSION_SECRET

SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD

ADMIN_EMAIL
EMAIL_FROM_NAME
```

For Supabase configuration:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

> Never commit `.env` or production credentials to GitHub.

---

# 🔐 Security Considerations

The project uses environment variables for sensitive configuration.

Production deployments should keep the following private:

* Admin credentials
* Session secrets
* SMTP credentials
* Database service keys
* API keys

`.env` should remain excluded from Git using `.gitignore`.

---

# 📊 Featured Projects

Some of the projects showcased through the portfolio include:

### 📈 Sales Performance Dashboard

Python + Streamlit + Pandas + Plotly

Interactive sales, revenue, profit, customer and product analytics.

### 💰 Personal Finance Dashboard

Python + Streamlit + Pandas + Plotly

Financial KPI and spending analysis dashboard.

### 🤖 JobPulse AI

Python + Streamlit + AI + Data Analytics

Job-market intelligence and career analytics platform.

### 🛒 AI E-Commerce Recommendation System

Machine Learning + Recommendation Systems

Personalized product recommendation platform.

### 👥 HR Analytics

Python + SQL + Data Visualization

Employee attrition and workforce analytics.

---

# 🎯 Project Goals

This portfolio was built to:

* Create a professional online presence
* Showcase practical technical projects
* Demonstrate analytics capabilities
* Provide recruiters with easy access to my work
* Centralize my resume and certifications
* Provide a direct communication channel
* Demonstrate full-stack development and deployment skills

---

# 🔮 Future Improvements

Planned improvements include:

* [ ] Recruiter-specific project filtering
* [ ] Advanced project search
* [ ] Analytics dashboard for portfolio visitors
* [ ] Improved admin analytics
* [ ] Automated email notifications
* [ ] Enhanced project case studies
* [ ] AI-powered portfolio assistant
* [ ] Dark/light theme improvements
* [ ] Additional interactive data visualizations

---

# 👨‍💻 Author

## Ankit Kumar

**Data Analyst | BI Analyst | Power BI Developer | AI & Data Science**

📍 India

### Connect

* 💼 LinkedIn: https://linkedin.com/in/ankit-kumar-b66067406
* 🐙 GitHub: https://github.com/ankitkumaranalytics
* 🌐 Portfolio: https://ankitkumaranalytics.github.io/ankit-portfolio/frontend/index.html
* 📧 Email: [ankitkumar.data39@gmail.com](mailto:ankitkumar.data39@gmail.com)

---

<p align="center">
  ⭐ If you find this project useful, consider giving the repository a star.
</p>

<p align="center">
  <i>Building practical technology with data, analytics and AI.</i>
</p>
