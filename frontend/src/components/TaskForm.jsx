import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description: desc });
    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input
        className="input"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Optional Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit" className="add">Add Task</button>
    </form>
  );
}

export default TaskForm;
