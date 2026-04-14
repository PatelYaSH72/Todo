# Todo App - MERN Stack Frontend

A production-ready React frontend for a MERN Stack To-Do Application, built with Vite and React Router.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Backend running on `http://localhost:3000`

### Installation & Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # Login page with authentication
│   │   ├── Register.jsx       # Registration page with validation
│   │   └── Dashboard.jsx      # Main task management dashboard
│   ├── components/
│   │   └── TaskItem.jsx       # Reusable task item component
│   ├── services/
│   │   └── api.js             # Axios instance with interceptors
│   ├── App.jsx                # Main app with routing & protection
│   └── main.jsx               # React entry point
├── index.html
├── vite.config.js
└── package.json
```

## ✨ Features

### Core Features
- **User Authentication**
  - Register with validation (name, email, password)
  - Login with JWT token storage
  - Protected routes (automatic redirect to login if not authenticated)
  - Automatic logout on token expiration

- **Task Management**
  - View all user-specific tasks
  - Add new tasks with validation
  - Mark tasks as complete/incomplete
  - Delete tasks with confirmation
  - Edit task titles inline

- **Bonus Features**
  - Filter tasks (All / Pending / Completed)
  - Real-time task statistics
  - Loading indicators for API calls
  - Success/error feedback messages
  - Responsive design
  - Clean, modern UI

## 🔐 Authentication

- JWT token stored in `localStorage`
- Axios interceptor automatically attaches token to requests
- Invalid/expired tokens trigger automatic logout
- Protected routes prevent unauthorized access

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite 5** - Fast build tool
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Vanilla CSS** - Minimal, clean styling (no heavy frameworks)

## 📝 API Integration

All API calls are centralized in `src/services/api.js`:

```javascript
// Auth APIs
authAPI.register(userData)
authAPI.login(credentials)

// Task APIs
taskAPI.getTasks()
taskAPI.createTask(taskData)
taskAPI.updateTask(taskId, updateData)
taskAPI.deleteTask(taskId)
```

## 🎨 UI/UX Highlights

- Clean, modern design with gradient background
- Responsive layout (works on mobile and desktop)
- Clear visual feedback for user actions
- Inline error messages for form validation
- Loading states during API calls
- Success/error toast notifications
- Intuitive task management interface

## 🔄 API Endpoints

The frontend connects to:

```
POST   /auth/register    - Register new user
POST   /auth/login       - Login user
GET    /tasks            - Fetch user tasks
POST   /tasks            - Create new task
PUT    /tasks/:id        - Update task
DELETE /tasks/:id        - Delete task
```

Base URL: `http://localhost:3000/api`

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 🐛 Error Handling

- Form validation with clear error messages
- API error handling with user-friendly feedback
- Automatic retry logic for failed requests (via interceptors)
- Graceful fallbacks for edge cases

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Code Quality

- Functional components with hooks
- Proper separation of concerns (services, components, pages)
- No prop drilling (used localStorage for auth)
- Async/await pattern (no .then() chains)
- Comprehensive error handling
- Reusable components and utilities

## 🚀 Next Steps

1. Ensure backend is running on port 3000
2. Run `npm install` in frontend directory
3. Run `npm run dev` to start development server
4. Test all features and enjoy!

---

**Built for hiring evaluation** - Junior to Mid-level React developer showcase
