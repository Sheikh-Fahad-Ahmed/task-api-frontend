export default function StatusSelection({ status, handleStatus }) {
  return (
    <div className="status-selection-container">
      <button
        type="button"
        className={`status-selection ${status === "pending" ? "active" : ""} `}
        onClick={() => handleStatus("pending")}
      >
        Pending
      </button>
      <button
        type="button"
        className={`status-selection ${status === "in-progress" ? "active" : ""} `}
        onClick={() => handleStatus("in-progress")}
      >
        In-Progress
      </button>
      <button
        type="button"
        className={`status-selection ${status === "done" ? "active" : ""} `}
        onClick={() => handleStatus("done")}
      >
        Done
      </button>
    </div>
  );
}
