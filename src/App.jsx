import { useState } from "react";

function App() {
  const [tasks, setTask] = useState([]);

  function handleTasks(task) {
    setTask([...tasks], task);
  }
  return (
    <div>
      <Main />
    </div>
  );
}

function Main() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;

    const newTask = { title, description, status };
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input type="text" name="title" id="" placeholder="title" />
      <input type="text" name="description" id="" placeholder="description" />
      <select name="status" id="">
        <option value="pending">pending</option>
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>
      <button>Send</button>
    </form>
  );
}
export default App;
