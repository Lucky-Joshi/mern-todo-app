function TaskItem({ task, onToggle, onDelete, onRestore }) {
  return ( // TaskItem component to display individual tasks
    <li className="task">
      <div>
        <p className={`task-title ${task.isCompleted ? "line-through" : ""}`}>
          {task.title} // Display task title
        </p>
        {task.description && <p className="task-desc">{task.description}</p>}
        <p className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority} Priority // Display task priority
        </p>
      </div>

      <div className="task-buttons">
        {!task.isTrashed && (
          <button
            onClick={() => onToggle(task._id, { isCompleted: !task.isCompleted })} // Toggle task completion status
            className={task.isCompleted ? "undo" : "done"} // Change button class based on completion status
          >
            {task.isCompleted ? "Undo" : "Done"} // Button to mark task as done or undo
          </button>
        )}
        {!task.isTrashed ? ( // If task is not trashed, show delete button
          <button onClick={() => onDelete(task._id)} className="trash"> // Button to move task to trash
            Trash
          </button>
        ) : (
          <button onClick={() => onRestore(task._id)} className="restore"> // Button to restore trashed task
            Restore
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
