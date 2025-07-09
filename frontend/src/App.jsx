import { useEffect, useState } from "react";
import API from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() { // Main App component
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [filter, setFilter] = useState("all"); // State to hold the current filter

  const fetchTasks = async () => { // Function to fetch tasks from the API
    const res = await API.get("/todos"); // Make GET request to fetch tasks
    setTasks(res.data); // Update tasks state with the fetched data
  };

  useEffect(() => { // useEffect to fetch tasks when the component mounts
    fetchTasks(); 
  }, []);

  const handleAdd = async (data) => { // Function to handle adding a new task
    const res = await API.post("/todos", data); // Make POST request to add a new task
    setTasks((prev) => [...prev, res.data]); // Update tasks state by adding the new task
  };

  const handleUpdate = async (id, updates) => { // Function to handle updating an existing task
    const res = await API.put(`/todos/${id}`, updates); // Make PUT request to update the task
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? res.data : task)) // Update tasks state with the updated task
    );
  };

  const handleDelete = async (id) => { // Function to handle deleting (trashing) a task
    const res = await API.delete(`/todos/${id}`); // Make DELETE request to trash the task
    setTasks((prev) => // Update tasks state by removing the trashed task
      prev.map((task) => (task._id === id ? res.data : task)) // Update the task to mark it as trashed
    );
  };

  const handleRestore = async (id) => { // Function to handle restoring a trashed task
    const res = await API.put(`/todos/restore/${id}`); // Make PUT request to restore the task
    setTasks((prev) => // Update tasks state by restoring the trashed task
      prev.map((task) => (task._id === id ? res.data : task)) // Update the task to mark it as not trashed
    );
  };

  const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3, Lowest: 4 }; // Define priority order for sorting tasks

  const filtered = tasks // Filter tasks based on the selected filter
    .filter((task) => { // Filter tasks based on completion status and trash status
      if (filter === "all") return !task.isTrashed; // Show all tasks except trashed ones
      if (filter === "completed") return task.isCompleted && !task.isTrashed; // Show only completed tasks that are not trashed
      if (filter === "trashed") return task.isTrashed; // Show only trashed tasks
    })
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]); // Sort tasks by priority using the defined order

  return ( // Render the main application UI
    <div className="app-container">
      <h1>📝 To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      <div className="filters">
        <button className="filter-btn" onClick={() => setFilter("all")}>All</button>
        <button className="filter-btn" onClick={() => setFilter("completed")}>Completed</button>
        <button className="filter-btn" onClick={() => setFilter("trashed")}>Trash</button>
      </div>
      <TaskList
        tasks={filtered} // Pass the filtered tasks to TaskList
        onToggle={handleUpdate} // Function to toggle task completion
        onDelete={handleDelete} // Function to delete (trash) task
        onRestore={handleRestore} // Function to restore trashed task
      />
    </div>
  );
}

export default App;
