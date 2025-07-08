import { useEffect, useState } from "react";
import API from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await API.get("/todos");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (data) => {
    const res = await API.post("/todos", data);
    setTasks((prev) => [...prev, res.data]);
  };

  const handleUpdate = async (id, updates) => {
    const res = await API.put(`/todos/${id}`, updates);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? res.data : task))
    );
  };

  const handleDelete = async (id) => {
    const res = await API.delete(`/todos/${id}`);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? res.data : task))
    );
  };

  const handleRestore = async (id) => {
    const res = await API.put(`/todos/restore/${id}`);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? res.data : task))
    );
  };

  const filtered = tasks.filter((task) => {
    if (filter === "all") return !task.isTrashed;
    if (filter === "completed") return task.isCompleted && !task.isTrashed;
    if (filter === "trashed") return task.isTrashed;
  });

  return (
    <div className="app-container">
      <h1>📝 To-Do List</h1>
      <TaskForm onAdd={handleAdd} />

      <div className="filters">
        <button className="filter-btn" onClick={() => setFilter("all")}>All</button>
        <button className="filter-btn" onClick={() => setFilter("completed")}>Completed</button>
        <button className="filter-btn" onClick={() => setFilter("trashed")}>Trash</button>
      </div>

      <TaskList
        tasks={filtered}
        onToggle={handleUpdate}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />
    </div>
  );
}

export default App;
