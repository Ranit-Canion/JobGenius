# JobGenius — AI Powered Job Portal

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express.js-^4-000000?logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](#)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-^3-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![React Query](https://img.shields.io/badge/React%20Query-@tanstack%2Freact--query-FF4154?logo=reactquery&logoColor=white)](#)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-010101?logo=socket.io&logoColor=white)](#)
[![Recharts](https://img.shields.io/badge/Recharts-charts-22D3EE)](#)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](#)
[![Gemini](https://img.shields.io/badge/AI-Gemini%20API-6750A4)](#)

**JobGenius** is a full-stack job marketplace that blends solid recruitment workflows with **AI assistance**. It parses resumes (PDF), structures them with the **Gemini API**, and recommends jobs to seekers. Recruiters get AI help to draft job descriptions and summarize applicant insights. Real-time chat, notifications, charts, advanced search & filters, and a clean UI complete the experience.

---

## ✨ Features

### 🔐 Authentication (JWT)
- Sign up, Login, Logout
- Forgot password → email token → Reset password
- Update password, Delete profile
- Secured REST APIs with role-based access (`job-seeker`, `recruiter`, `admin`)
- Session refresh + protected routes (frontend)

### 🤖 AI Integration (Gemini API)
- **Resume → Structured profile** (skills, experience, education, awards)
- **AI job recommendations** based on parsed resume + seeker profile + live job data
- **AI “About Me” generator** for seekers (based on their profile)
- **AI Job Description generator** for recruiters
- **AI Assistants**:
  - Seeker bot: recommendations, application status, latest jobs
  - Recruiter bot: “who applied recently?”, “show top candidates for X skill”, quick insights

### 👩‍💼 Job Seeker
- Powerful search: title, keywords, location, **salary range**
- Sort: newest | oldest, Pagination, Bookmarks
- **Resume-based recommendations**
- Dashboard:
  - Recent applications
  - Job alerts & notifications (shortlisted/rejected)
  - Profile management: name, photo, skills, education, awards, experience, age
  - **About section with AI**
  - Real-time chat with recruiters (Socket.IO)
  - **Status pie chart** (applied / shortlisted / rejected) via **Recharts**

### 🧑‍💼 Recruiter
- Dashboard:
  - Posted jobs with **applications count** and **shortlists** (simple bar chart via Recharts)
- Jobs CRUD: create, update, archive/delete
- **Rich editor** for job description (React TipTap)
- **AI job description** generator (Gemini)
- Applications management: view applicant profiles, shortlist, reject, delete
- Real-time chat with seekers
- Notifications: new applications, status changes
- Password update & profile settings
- **Recruiter AI assistant** for quick insights on applicants & postings

---

## 🏗️ Tech Stack

- **Frontend:** React, Vite/CRA, Tailwind CSS, @tanstack/react-query, React Router, Recharts, TipTap, Socket.IO client
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.IO server, Nodemailer, JWT, Multer (if file upload), PDF parsing
- **AI:** Gemini API
- **Infra (optional):** MongoDB Atlas, Vercel/Netlify (client), Render/Railway (server)

---

## 🖼️ Screenshots / Demo

> Add your assets here:
- `/docs/screenshots/landing.png`
- `/docs/screenshots/seeker-dashboard.png`
- `/docs/screenshots/recruiter-dashboard.png`
- `/docs/screenshots/chat.png`
- `/docs/screenshots/ai-assistant.png`

```txt
docs/
 └── screenshots/
     ├── landing.png
     ├── seeker-dashboard.png
     ├── recruiter-dashboard.png
     ├── chat.png
     └── ai-assistant.png
