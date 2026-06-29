export default function TaskDetails({ task, onBack, onTriggerEdit }) {
  return (
    <section className="tasks-container">
      <div className="container">
        <div className="details-container">
          <h1 className="details-title">{task.title}</h1>
          <div className="task-content">
            <p>
              <strong>ID:</strong> {task.id}
            </p>
            <p>
              <strong>Description: </strong> {task.description}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Created At</strong> {task.created_at}
            </p>
          </div>
          <div className="task-btn">
            <button onClick={onBack}>←</button>
            <button onClick={() => onTriggerEdit(task)}>Edit</button>
          </div>
        </div>
      </div>
    </section>
  );
}
