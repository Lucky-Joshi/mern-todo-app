import { useState } from "react";

function TaskForm({ onAdd }) { // Form component to add new tasks
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");

  const priorityLevels = ["High", "Medium", "Low", "Lowest"]; // Array of priority levels for tasks
  const priorityColors = { // Object mapping priority levels to CSS classes
    High: "high",
    Medium: "medium",
    Low: "low",
    Lowest: "lowest",
  };

  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault(); // Prevent default form submission behavior
    if (!title.trim()) return; // If title is empty, do not submit
    onAdd({ title, description: desc, priority }); // Call the onAdd function passed as a prop with the new task data
    setTitle(""); // Reset title input
    setDesc(""); // Reset description input
    setPriority("Medium"); // Reset priority to default
  };

  return ( // Render the form with inputs for title, description, and priority
    <form onSubmit={handleSubmit} className="form-group">
      <input
        className="input"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state on input change
      />
      <input
        className="input"
        type="text"
        placeholder="Optional Description"
        value={desc} // Controlled input for description
        onChange={(e) => setDesc(e.target.value)} // Update description state on input change
      />

      <div className="priority-buttons">
        {priorityLevels.map((level) => (
          <button
            key={level}
            type="button"
            className={`priority-pill ${priority === level ? "active" : ""} ${priorityColors[level]}`}
            onClick={() => setPriority(level)} // Set priority state when a button is clicked
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
