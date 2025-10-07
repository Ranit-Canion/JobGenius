# 🚀 JobGenius – AI Powered Job Portal

> **Empowering recruitment with Artificial Intelligence**  
> A full-stack AI-driven job portal that connects **job seekers** and **recruiters** through smart recommendations, real-time communication, and intelligent automation.

---

## 🧠 Overview

**JobGenius** is a modern **AI-powered job portal** built with the latest web technologies.  
It enhances traditional hiring by integrating **Gemini AI** for resume parsing, smart job recommendations, and automated job description generation.  

Both **job seekers** and **recruiters** enjoy personalized dashboards, real-time chat, notifications, and insightful analytics — all wrapped in a fast and elegant UI.

---

## ⚙️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js, Tailwind CSS, React Query, Recharts, Tiptap (Rich Text Editor) |
| **Backend** | Node.js, Express.js, REST APIs |
| **Database** | MongoDB |
| **AI Integration** | Gemini API |
| **Authentication** | JWT (JSON Web Token), Password Reset via Email |
| **Real-Time Communication** | WebSockets (Socket.IO) |

---

## 🔐 Authentication Features

- ✨ User Registration & Login  
- 🔄 Forgot & Reset Password via Email Token  
- 🔑 Update Password / Delete Profile  
- 🛡️ Secure JWT-based Authentication  

---

## 🤖 AI Integration (Gemini API)

JobGenius leverages **Gemini AI** to automate and personalize the recruitment process:

- 🧾 **Resume Parsing:** Extracts key details (skills, experience, education) from uploaded resumes (PDF).  
- 💼 **AI Job Recommendations:** Suggests relevant jobs based on parsed resume data and profile info.  
- 🧠 **AI-Generated "About Me":** Automatically creates a professional bio from skills and experience.  
- 📝 **AI Job Description Generator:** Assists recruiters in generating detailed job descriptions.  
- 💬 **AI Assistant Chatbot:** Provides job insights, recommendations, and applicant data.

---

## 👨‍💼 For Job Seekers

### 🔍 Job Search & Filtering
- Filter jobs by **title**, **keyword**, **location**, **salary range**, **job type**, etc.  
- Unique feature: **Resume-based job recommendations** using Gemini AI.  
- Sort jobs by **newest** or **oldest**, with **pagination** support.  
- Bookmark favorite jobs for later.  

### 📊 Dashboard Features
- View **recently applied jobs**.  
- Receive **notifications** (e.g., shortlisted, rejected, interview alerts).  
- Update profile details: **name, picture, skills, education, experience, awards, age**, etc.  
- Generate an **AI-based About section** using profile data.  
- Real-time **chat with recruiters** (Socket.IO).  
- **Pie Chart** showing job status (applied, shortlisted, rejected) using Recharts.  
- Access to an **AI Assistant** for:
  - Personalized job recommendations  
  - Checking application status  
  - Getting info on latest openings  

---

## 🏢 For Job Recruiters

### 📈 Dashboard & Analytics
- Visualize **job posting statistics** (applications count, shortlisted count) with Recharts bar charts.

### 💼 Job Management
- Full **CRUD operations** on job postings.  
- Manage **applications**: view applicant profiles, **shortlist**, **reject**, or **delete**.  
- Create new job posts with **skills, title, location, and rich text descriptions** using **Tiptap editor**.  
- **Generate job descriptions using AI** (Gemini API).  
- Receive **notifications** when new candidates apply.  
- Real-time **chat** with job seekers.  
- Update password & manage profile.  
- Built-in **AI Assistant Chatbot** to:
  - Summarize applicant data  
  - Provide insights on recent applications  
  - Assist with recruitment decisions  

---

## 📊 Charts & Analytics

- **Job Seeker:** Pie chart for application status.  
- **Recruiter:** Bar chart showing job performance metrics.  
- Implemented with **Recharts** for clean data visualization.

---

## 🧩 Key Highlights

- ⚡ Real-time chat using **Socket.IO**  
- 🧠 Deep AI integration with **Gemini API**  
- 💌 Secure email-based password recovery  
- 🔄 Responsive UI with **Tailwind CSS**  
- 🌐 REST API architecture with **Express.js**  
- 🧺 State management with **React Query**  
- 📈 Insightful analytics via **Recharts**

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/JobGenius.git
   cd JobGenius
