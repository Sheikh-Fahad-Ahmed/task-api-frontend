import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onSelectTask, onDelete }) {
  return (
    <div className="tasks-container">
      <div className="tasks-list">
        {tasks.map((task) => (
          <TaskItem
            task={task}
            key={task.title}
            onSelectTask={onSelectTask}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
