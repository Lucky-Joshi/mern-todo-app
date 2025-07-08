function TaskItem({ task, onToggle, onDelete, onRestore }) {
  return (
    <li className="task">
      <div>
        <p className={`task-title ${task.isCompleted ? "line-through" : ""}`}>
          {task.title}
        </p>
        {task.description && <p className="task-desc">{task.description}</p>}
      </div>

      <div className="task-buttons">
        {!task.isTrashed && (
          <button
            onClick={() => onToggle(task._id, { isCompleted: !task.isCompleted })}
            className={task.isCompleted ? "undo" : "done"}
          >
            {task.isCompleted ? "Undo" : "Done"}
          </button>
        )}

        {!task.isTrashed ? (
          <button onClick={() => onDelete(task._id)} className="trash">
            Trash
          </button>
        ) : (
          <button onClick={() => onRestore(task._id)} className="restore">
            Restore
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
