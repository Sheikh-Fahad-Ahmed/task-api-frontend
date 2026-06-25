import { useState } from "react";

function App() {
  const [tasks, setTask] = useState([]);

  function handleTasks(task) {
    setTask((tasks) => [...tasks, task]);
  }

  return (
    <div>
      <Main onAddTask={handleTasks} />
      <ResultViw tasks={tasks} />
    </div>
  );
}

function Main({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;

    const newTask = { title, description, status };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        id=""
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="description"
        id=""
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select name="status" onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">pending</option>
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>
      <button>Send</button>
    </form>
  );
}

function ResultViw({ tasks }) {
  return (
    <div>
      <h2>Result</h2>
      {tasks.map((task) => (
        <Task task={task} key={task.title} />
      ))}
    </div>
  );
}

function Task({ task }) {
  return (
    <div>
      <p>title: {task.title}</p>
      <p>description: {task.description}</p>
      <p>status: {task.status}</p>
    </div>
  );
}
export default App;
