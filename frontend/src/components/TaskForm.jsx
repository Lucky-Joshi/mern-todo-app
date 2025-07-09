import { useState } from "react";

function TaskForm({ onAdd }) { 
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");

  const priorityLevels = ["High", "Medium", "Low", "Lowest"]; 
  const priorityColors = { 
    High: "high",
    Medium: "medium",
    Low: "low",
    Lowest: "lowest",
  };

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!title.trim()) return; 
    onAdd({ title, description: desc, priority }); 
    setTitle(""); 
    setDesc(""); 
    setPriority("Medium"); 
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

      <div className="priority-buttons">
        {priorityLevels.map((level) => (
          <button
            key={level}
            type="button"
            className={`priority-pill ${priority === level ? "active" : ""} ${priorityColors[level]}`}
            onClick={() => setPriority(level)} 
          >
            {level} 
          </button>
        ))}
      </div>

      <button type="submit" className="add">Add Task</button>
    </form>
  );
}

export default TaskForm;
