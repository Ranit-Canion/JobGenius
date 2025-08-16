# 📌 JobGenius – AI-Powered Job Recommendation Platform  

> **JobGenius** is a full-stack MERN application that connects job seekers and recruiters with intelligent recommendations. It uses **AI (OpenAI API)** for personalized job suggestions, resume analysis, and smart chat interactions.  

![JobGenius Banner](https://via.placeholder.com/1200x400.png?text=JobGenius+-+AI+Job+Recommendation+Platform)  

---

## 🌟 Features  

### 👨‍💻 For Job Seekers  
- Upload resume (PDF) → extract skills automatically.  
- Get **AI-powered job recommendations** based on skills.  
- Apply to jobs with one click.  
- Real-time chat with recruiters (WebSocket/Socket.IO).  
- Personalized dashboard with applied jobs & status.  

### 🏢 For Recruiters  
- Post new jobs with descriptions.  
- Use AI to **auto-generate job descriptions**.  
- Shortlist candidates → invite to chat.  
- Manage all posted jobs from admin panel.  

### ⚡ AI Features  
- Resume → Skill extraction.  
- AI Job description generator.  
- Smart Job matching with skill-weight scoring.  

---

## 🖼️ Screenshots / Demo  

| Job Seeker Dashboard | Recruiter Dashboard | AI Resume Match |
|----------------------|---------------------|-----------------|
| ![](https://via.placeholder.com/300x200.png) | ![](https://via.placeholder.com/300x200.png) | ![](https://via.placeholder.com/300x200.png) |

👉 **Demo Video**: [YouTube Link](https://youtube.com) *(replace with real video link)*  

---

## 🛠️ Tech Stack  

- **Frontend**: React.js, Tailwind CSS, React Query  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JWT + bcrypt  
- **File Upload**: Multer (for resumes)  
- **AI Integration**: OpenAI API (ChatGPT for JD + resume matching)  
- **Chat**: Socket.IO (real-time messaging)  
- **Deployment**: Vercel (frontend) + Render/Heroku (backend) + MongoDB Atlas  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone Repo  
```bash
git clone https://github.com/your-username/jobgenius.git
cd jobgenius
