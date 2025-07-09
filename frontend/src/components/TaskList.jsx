import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onRestore }) {
  if (tasks.length === 0) return <p className="text-center">No tasks yet.</p>; // Display message when there are no tasks

  return (
    <ul className="task-list">
      {tasks.map((task) => ( // Map through tasks and render TaskItem for each
        <TaskItem
          key={task._id} // Use task ID as key for each TaskItem
          task={task} // Pass task data to TaskItem
          onToggle={onToggle} // Function to toggle task completion
          onDelete={onDelete} // Function to delete (trash) task
          onRestore={onRestore} // Function to restore trashed task
        />
      ))}
    </ul>
  );
}

export default TaskList;
