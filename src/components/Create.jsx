import { useState } from "react";
import StatusSelection from "./StatusSelection";

export default function Create({ onAddTask, editingTask, onEditTask }) {
  const [status, setStatus] = useState(editingTask?.status || "pending");
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || "",
  );

  function handleStatus(newStatus) {
    setStatus(newStatus);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = { title, description, status, id: editingTask?.id || null };
    if (editingTask) {
      onEditTask(newTask);
    } else {
      onAddTask(newTask);
    }

    setTitle("");
    setDescription("");
    setStatus("pending");
  }

  return (
    <section className="tasks-container">
      <div className="create-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <h3>Create A Task</h3>
          <div className="form-group">
            <label>
              <strong>Title</strong>
            </label>
            <input
              type="text"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <StatusSelection status={status} handleStatus={handleStatus} />
          </div>
          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
