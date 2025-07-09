# 📝 MERN To-Do App — Complete README

This project is a beautiful, full-featured **To-Do List App** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), styled with **CSS3**, and includes advanced features like **task priority**, **trash/restore**, and **filtering**.

---

## 🚀 Features

* ✅ Create a task with title, description, and priority
* ✅ Priority levels: High, Medium, Low, Lowest
* ✅ Mark tasks as completed or undone
* ✅ Soft delete (move to trash) & restore functionality
* ✅ Filter by: All, Completed, Trashed
* ✅ Auto-sorted by priority (High → Lowest)
* ✅ Modern UI with styled priority pills

---

## 🧱 Tech Stack

### Backend:

* **Node.js**: JavaScript runtime for building fast server-side applications.
* **Express.js**: Minimal and flexible Node.js web application framework.
* **MongoDB + Mongoose**: MongoDB stores data as documents; Mongoose is the ORM to define schemas and interact with the DB.

### Frontend:

* **React.js** (with Vite): Component-based UI framework for building modern apps.
* **Axios**: Promise-based HTTP client for making API requests.
* **CSS3**: For clean and responsive styling.

---

## 🗃️ Backend Folder Structure

```
backend/
├── controllers/
│   └── todoController.js     # Business logic (CRUD operations)
├── models/
│   └── Todo.js               # Mongoose schema for Todo items
├── routes/
│   └── todoRoutes.js         # API endpoint routes
├── server.js                 # Sets up Express server, middlewares and routes
└── .env                      # Contains MONGO_URI and PORT
```

### ✅ API Routes (Defined in `routes/todoRoutes.js`)

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/api/todos`             | Fetch all tasks         |
| POST   | `/api/todos`             | Create new task         |
| PUT    | `/api/todos/:id`         | Update task (done/edit) |
| DELETE | `/api/todos/:id`         | Soft delete (trash)     |
| PUT    | `/api/todos/restore/:id` | Restore from trash      |

These routes are mounted in `server.js` using:

```js
app.use("/api/todos", require("./routes/todoRoutes"));
```

This means all requests to `/api/todos/...` are forwarded to the logic in `todoRoutes.js`, which calls functions from `todoController.js`.

### 🧠 Mongoose Model: `Todo.js`

```js
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low", "Lowest"],
    default: "Medium"
  },
  isCompleted: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false }
}, { timestamps: true });
```

This schema defines the structure of each task (todo) in the database.

---

## 💻 Frontend Folder Structure

```
frontend/src/
├── components/
│   ├── TaskForm.jsx         # Form for adding tasks and choosing priority
│   ├── TaskItem.jsx         # Single task UI with buttons
│   └── TaskList.jsx         # Renders the list of tasks
├── App.jsx                  # Root component - handles state and logic
├── api.js                   # Axios instance with baseURL
├── App.css                  # Custom styling for tasks and buttons
└── main.jsx                 # React app entry point
```

### 📡 Axios Setup (`api.js`)

```js
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
export default API;
```

This allows calls like `API.get("/todos")` to hit `http://localhost:5000/api/todos`.

---

## 🔁 Complete Workflow Explained

### 1. **Creating a Task**

* User enters title, optional description, and selects a priority via pill-buttons.
* On submit, frontend sends a POST request to `/api/todos`.
* Backend receives request via Express route, passes it to `createTodo` controller.
* Controller uses Mongoose `Todo.create(req.body)` to insert into MongoDB.
* Server returns the newly created task object which is added to frontend state and shown on screen.

### 2. **Viewing Tasks**

* On load, `App.jsx` fetches all tasks using `API.get("/todos")`.
* Tasks are filtered based on selection (All, Completed, Trashed).
* Tasks are **sorted by priority** using a priority rank object:

  ```js
  const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3, Lowest: 4 };
  ```

### 3. **Completing, Deleting or Restoring Tasks**

* Done/Undone: `PUT /todos/:id` to toggle `isCompleted`
* Trash: `DELETE /todos/:id` sets `isTrashed: true`
* Restore: `PUT /todos/restore/:id` sets `isTrashed: false`

---

## 📊 System Architecture Diagram

```text
┌──────────────────────────┐
│        Client (React)    │
│  TaskForm.jsx / App.jsx  │
└────────────┬─────────────┘
             │ Axios Request (CRUD)
             ▼
┌──────────────────────────┐
│      Express Server      │
│       (server.js)        │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│     API Route Layer      │
│    (todoRoutes.js)       │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   Controller Layer       │
│  (todoController.js)     │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ Mongoose Model / MongoDB │
│     (Todo.js schema)     │
└──────────────────────────┘
```

---

## 🔄 Sequence Diagram

```text
User -> TaskForm.jsx: Enters task & clicks Add
TaskForm.jsx -> App.jsx: Calls handleAdd()
App.jsx -> api.js: Sends POST /todos
api.js -> Express server: POST request
server -> Routes (todoRoutes.js): Match /todos
Routes -> Controller (createTodo): Create logic
Controller -> MongoDB: Save task via Mongoose
MongoDB --> Controller: Returns saved task
Controller --> Routes --> Express --> api.js --> App.jsx: Task added to state
```

---

## 🧩 Component-Level Breakdown

### 🔹 `App.jsx`

* Holds the main state of tasks
* Handles data fetching, adding, updating, deleting, restoring
* Passes data down to child components

### 🔹 `TaskForm.jsx`

* Controlled input form
* Handles new task input and priority selection
* Sends data to parent `App.jsx` for submission

### 🔹 `TaskList.jsx`

* Accepts tasks as props
* Maps through each task and renders a `TaskItem`

### 🔹 `TaskItem.jsx`

* Individual task view with title, priority badge, buttons for Done, Delete, Restore
* Calls relevant functions passed down as props from `App.jsx`

### 🔹 `api.js`

* Centralized Axios client with baseURL set to backend API path
* Used in all API interactions

---

## 📦 Installation Guide

### 🔹 Backend Setup

```bash
cd backend
npm install
# Create .env file:
# MONGO_URI=mongodb://localhost:27017/todoapp
# PORT=5000
npm run dev
```

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `localhost:5173` and talks to backend on `localhost:5000`.

---

## 📚 Future Improvements

* 🔐 JWT Auth for user-based task segregation
* 🔍 Search and sorting (by date or priority)
* 📱 PWA support with offline sync
* 📅 Due dates and reminders
* 📄 Export to CSV or PDF

---

## 👨‍💻 Built by Lucky Joshi
