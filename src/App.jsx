import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`/tasks`);
        const data = await res.json();

        if (data.Response === false) throw new Error("error fetching data");

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  function handleTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  return (
    <div>
      <Main onAddTask={handleTasks} />
      {loading && <ResultViw tasks={tasks} />}
      {!loading && !error && <ResultViw tasks={tasks} />}
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
      <h3>Task - {task.id}</h3>
      <p>title: {task.title}</p>
      <p>description: {task.description}</p>
      <p>status: {task.status}</p>
      <p>created at: {task.created_at}</p>
    </div>
  );
}
export default App;
