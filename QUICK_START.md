# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:5173
```

---

## ✨ What You Can Do

1. **Register** - Create a new account
2. **Login** - Login with your credentials
3. **Add Tasks** - Click "Add Task" and type
4. **Manage Tasks** - Check, edit, or delete tasks
5. **Filter Tasks** - View All / Pending / Completed
6. **Logout** - Clear session and return to login

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx           ← Login page
│   │   ├── Register.jsx        ← Registration page
│   │   └── Dashboard.jsx       ← Main dashboard
│   ├── components/
│   │   └── TaskItem.jsx        ← Task item component
│   ├── services/
│   │   └── api.js              ← API calls
│   ├── App.jsx                 ← Routes & auth
│   └── main.jsx                ← Entry point
```

---

## 🔐 Authentication

- Registers new users
- Logins with JWT token
- Stores token in localStorage
- Auto-attaches token to API requests
- Auto-logouts on invalid token

---

## ✅ Features

### Core
- ✅ User authentication (register & login)
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks complete/incomplete
- ✅ Protected dashboard route

### Bonus
- ✅ Filter tasks (all/pending/completed)
- ✅ Edit task titles
- ✅ Task statistics
- ✅ Loading indicators
- ✅ Success/error notifications
- ✅ Form validation
- ✅ Responsive design

---

## 🛠️ Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- Axios
- Vanilla CSS (no frameworks)

---

## 📝 API Endpoints

```
POST   /auth/register
POST   /auth/login
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

Base: `http://localhost:3000/api`

---

## 💡 Tips

- Check browser console for errors
- Ensure backend is running on port 3000
- localStorage stores JWT token
- Logout clears all stored data
- All fields are validated before submit

---

## 📖 More Info

See `SETUP_GUIDE.md` for complete documentation

---

**Ready to impress! 🎉**
