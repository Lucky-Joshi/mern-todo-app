import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onRestore }) {
  if (tasks.length === 0) return <p className="text-center">No tasks yet.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      ))}
    </ul>
  );
}

export default TaskList;
