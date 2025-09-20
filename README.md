📒 **ATTENDANCE MANAGEMENT SYSTEM**

A web application to manage attendance for **Admins, Teachers, and Students**.
Admins can manage students, classes, subjects, notices, and complaints.
Teachers can mark attendance and update results.
Students can view their attendance and related notices.

---

🎯 **GOAL OF THE PROJECT**

* Simplify attendance management and reduce manual work
* Centralize attendance tracking, student records, and communication
* Make administrative tasks faster, organized, and transparent

---

🛠 **PROBLEM SOLVED**

* Manual attendance tracking is slow, error-prone, and hard to manage
* Difficult to keep records accurate for large classes
* Communication between admins, teachers, and students can be inefficient

This system automates attendance, keeps records organized, and improves communication for all roles.

---

💻 **TECH STACK**

* Backend: Node.js, Express.js, MongoDB
* Frontend: React, Redux, Material UI
* API Requests: Axios

---

🚀 **SETTING UP THE PROJECT LOCALLY**

**Backend**

* Navigate to backend folder:

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
MONGO_URL=<your_mongodb_connection_string>
```

* Start the backend server:

```bash
npm start
```

* Backend runs at: `http://localhost:5000`

---

**Frontend**

* Navigate to frontend folder:

```bash
cd frontend
npm install
```

* Create a `.env` file:

```env
REACT_APP_BASE_URL=http://localhost:5000
```

* Start the frontend:

```bash
npm start
```

* Frontend runs at: `http://localhost:3000` and communicates with the backend

---
