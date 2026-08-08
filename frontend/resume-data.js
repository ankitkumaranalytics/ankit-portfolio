/* ==========================================
   DIGITAL RESUME — CENTRAL DATA
   ==========================================
   All resume content lives here so it can be
   updated without touching the UI components.
   Only verified information from the project/
   resume is used. Missing items = configurable.
========================================== */
(function () {
  window.ResumeData = {
    personal: {
      name: "Ankit Kumar",
      title: "Data Analyst | AI & Data Science",
      tagline: "Turning raw data into clear, decision-ready insights.",
      summary:
        "Data Analyst with a strong foundation in SQL, Python, Excel, and Power BI. Skilled in cleaning, analyzing, and visualizing data to generate insights and support data-driven decision-making. Interested in collaborating on meaningful analytical work in fast-paced environments.",
      location: "India",
      objective: "Data Analyst",
      photo: "images/pp3.jpeg",
      email: "ANKITKUMAR.DATA39@GMAIL.COM",
      phone: "+91 92290 47285",
      resumePdf: "Ankit_Kumar_Resume.pdf"
    },

    education: [
      {
        degree: "B.Tech in Artificial Intelligence & Data Science",
        school: "Sengunthar Engineering College",
        location: "Tamil Nadu, India",
        period: "Sep 2023 – Jun 2027",
        detail: "CGPA: 7.77 / 10",
        note: "Building a strong foundation in AI, data science, analytics, statistics, and programming."
      },
      {
        degree: "Higher Secondary Education (Class XII)",
        school: "Vaishali Higher Secondary School",
        location: "",
        period: "2023",
        detail: "",
        note: "Completed with a strong focus on mathematics, science, and problem-solving."
      },
      {
        degree: "Secondary Education (Class X)",
        school: "Vaishali Vidyalaya",
        location: "",
        period: "2021",
        detail: "",
        note: "Completed with solid academic performance and a growing interest in technology and analytics."
      }
    ],

    skills: {
      programming: ["Python", "SQL", "R"],
      analytics: ["Excel", "Power BI", "Data Visualization", "Statistics", "Data Cleaning", "Exploratory Data Analysis"],
      databases: ["MySQL", "PostgreSQL", "SQL Server"],
      tools: ["Git", "Jupyter Notebook", "Google Colab", "Tableau", "DAX", "GitHub", "VS Code", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"]
    },

    experience: [
      {
        role: "Data Analyst Intern",
        company: "Cognifyz Technologies",
        location: "Remote",
        period: "Jun 2025 – Jul 2025",
        tools: "Excel, SQL, Power BI",
        points: [
          "Processed and standardized a dataset of over 1,00,000 rows from multiple regions to support weekly analytics—enabling business teams to track KPIs across geography and time.",
          "Designed smart Excel templates embedded with lookup functions and pivot logic, saving 40% reporting time across 4 departments.",
          "Developed and maintained Power BI dashboards to visualize revenue trends, customer mix, and monthly performance—regularly used by managers and analysts across business units.",
          "Collaborated with 4 analysts and 2 senior managers to define and validate 6 KPIs, improving report reliability and strategic alignment."
        ]
      },
      {
        role: "Deloitte Australia Data Analytics Job Simulation",
        company: "Forage",
        location: "Remote",
        period: "Jun 2025",
        tools: "Excel, Power BI",
        points: [
          "Completed a virtual analytics simulation focused on data exploration, dashboard creation, and business insight communication.",
          "Analyzed business case data and created concise business recommendations.",
          "Used data visualization for clarity."
        ]
      },
      {
        role: "Tata GenAI Powered Data Analytics Job Simulation",
        company: "Forage",
        location: "Remote",
        period: "Jun 2025",
        tools: "AI-assisted analytics",
        points: [
          "Gained experience applying AI-assisted analytics to solve business problems and create clear visual insights.",
          "Explored AI-assisted analytical workflows and practical presentation of insights.",
          "Expanded exposure to modern analytics tooling."
        ]
      }
    ],

    projects: [
      {
        title: "Sales Data Analysis Dashboard",
        description:
          "Interactive dashboard built using Python, Streamlit, Plotly, and Pandas to analyze business performance and communicate insights clearly.",
        technologies: ["Python", "Streamlit", "Plotly", "Pandas"],
        features: ["KPI cards", "Interactive charts", "Filters"],
        github: "https://github.com/ankitkumaranalytics",
        demo: "https://sales-dashboard-emfckt7ewgwn29aglzhjum.streamlit.app/"
      },
      {
        title: "HR Analytics Dashboard",
        description:
          "Developed a Power BI dashboard to analyze employee attrition and workforce metrics.",
        technologies: ["Power BI", "SQL", "DAX"],
        features: ["Attrition analysis", "Workforce metrics", "Interactive reports"],
        github: "https://github.com/ankitkumaranalytics",
        demo: ""
      },
      {
        title: "Customer Churn Analysis",
        description:
          "Performed EDA to identify key factors affecting customer churn and provided data-driven retention recommendations.",
        technologies: ["Python", "Pandas"],
        features: ["EDA", "Visualizations", "Retention recommendations"],
        github: "https://github.com/ankitkumaranalytics",
        demo: ""
      }
    ],

    certifications: [
      {
        name: "Google Data Analytics Professional Certificate",
        issuer: "Google · Coursera",
        year: "2026",
        link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/LPG2URIA4DR4",
        image: "images/google-data-analytics-certificate.jpeg"
      },
      {
        name: "Introduction to Data Analysis Using Python",
        issuer: "Coursera",
        year: "2026",
        link: "https://coursera.org/share/75acacd6b8ed87c8dd8afa402cfff7b9",
        image: "images/python-data-analysis-certificate.jpeg"
      },
      {
        name: "Machine Learning Certificate",
        issuer: "UniAthena",
        year: "2025",
        link: "",
        image: ""
      },
      {
        name: "Data Analytics Certificate",
        issuer: "Unstop",
        year: "2026",
        link: "",
        image: ""
      },
      {
        name: "Deloitte Australia Data Analytics Job Simulation",
        issuer: "Forage",
        year: "2026",
        link: "",
        image: ""
      },
      {
        name: "Tata GenAI Powered Data Analytics Job Simulation",
        issuer: "Forage",
        year: "2025",
        link: "",
        image: ""
      }
    ],

    achievements: [
      {
        title: "Certified analyst",
        detail: "Completed the Google Data Analytics Professional Certificate."
      },
      {
        title: "Dashboard projects",
        detail: "Created interactive dashboards and analytical reports for real business use cases."
      },
      {
        title: "Problem solving",
        detail: "Practiced DSA and SQL regularly on LeetCode and other coding platforms."
      },
      {
        title: "Analytics case studies",
        detail: "Completed Deloitte and Tata Forage job simulations focused on data analytics."
      }
    ],

    tools: {
      Analytics: ["Excel", "Power BI", "Tableau", "Pandas", "NumPy"],
      Programming: ["Python", "SQL", "R"],
      Databases: ["MySQL", "PostgreSQL", "SQL Server"],
      Visualization: ["Power BI", "Tableau", "Plotly", "Streamlit"],
      "Machine Learning": ["Scikit-learn", "TensorFlow"],
      "Development Tools": ["Git", "GitHub", "Jupyter Notebook", "Google Colab", "VS Code", "DAX"]
    },

    social: {
      email: "ANKITKUMAR.DATA39@GMAIL.COM",
      linkedin: "https://www.linkedin.com/in/ankit-kumar-b66067406",
      github: "https://github.com/ankitkumaranalytics",
      leetcode: "https://leetcode.com/u/NdOY6P9yIc/",
      youtube: "https://www.youtube.com/@ANKITAIMUSIC2M",
      instagram: "https://www.instagram.com/ankit_kumarofficial08?igsh=OHFqbnN6d2dwY3Bw",
      whatsapp: "https://wa.me/919229047285?text=Hello%20Ankit%2C%20I%20would%20like%20to%20connect%20with%20you%20regarding%20job%2C%20internship%2C%20or%20any%20other%20opportunity.",
      portfolio: "https://ankitkumaranalytics.github.io/portfolio/"
    }
  };
})();
