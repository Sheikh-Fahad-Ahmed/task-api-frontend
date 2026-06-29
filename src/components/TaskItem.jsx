export default function TaskItem({ task, onSelectTask, onDelete }) {
  function handleDeleteClick(e) {
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  const borderStyle = {
    borderBottom:
      task.status === "pending"
        ? "5px solid #e94f37"
        : task.status === "in-progress"
          ? "5px solid #2563eb"
          : task.status === "done"
            ? "5px solid #10b981"
            : "5px solid #e0e0e0",
  };

  return (
    <article
      className="tasks-card"
      style={borderStyle}
      onClick={() => onSelectTask(task)}
    >
      <div className="tasks-content">
        <button
          type="button"
          className="card-delete-btn"
          onClick={handleDeleteClick}
          title="Delete Task"
        >
          &times;
        </button>
        <h2 className="tasks-title">{task.title}</h2>
      </div>
    </article>
  );
}
