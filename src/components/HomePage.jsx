import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import Create from "./Create";
import TaskDetails from "./TaskDetails";

function HomePage() {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  );
}

function NavBar() {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-title">Tasks</div>
        <div className="header-links">
          <a href="home">home</a>
          <a href="login">login</a>
        </div>
      </nav>
    </header>
  );
}

function Main() {
  const [tasks, setTasks] = useState([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  function handleSelectedTask(task) {
    setSelectedTask(task);
    setTab("details");
  }

  function handleTriggerEdit(task) {
    setEditingTask(task);
    setTab("create");
  }

  async function handleTasks(taskData) {
    try {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error("Failed to save task to server");
      const savedTask = await res.json();
      setTasks((tasks) => [...tasks, savedTask]);
      setTab("all");
    } catch (err) {
      alert(`error saving task: ${err.message}`);
    }
  }

  async function editTask(taskData) {
    try {
      const res = await fetch(`/tasks/${taskData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error("Failed to save task to server");
      const savedTask = await res.json();
      setTasks((tasks) =>
        tasks.map((t) => (t.id === savedTask.id ? savedTask : t)),
      );
      setSelectedTask(savedTask);
      setEditingTask(null);
      setTab("all");
    } catch (err) {
      alert(`error editing task: ${err.message}`);
    }
  }

  async function handleDeleteTask(id) {
    try {
      const res = await fetch(`/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("server rejected delete action.");

      setTasks((tasks) => tasks.filter((t) => t.id !== id));
      setSelectedTask((task) => (task?.id === id ? null : task));
    } catch (err) {
      alert(`Error deleting task item: ${err.message}`);
    }
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`/tasks`);
        if (!res.ok) throw new Error("Could not fetch tasks");
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

  return (
    <main>
      <section className="tasks">
        <div className="tasks-tabs">
          <div className="tab-container">
            <button
              className={`tab-btn ${tab === "all" ? "active" : ""}`}
              onClick={() => {
                setEditingTask(null);
                setTab("all");
              }}
            >
              all
            </button>
            <button
              className={`tab-btn ${tab === "create" && !editingTask ? "active" : ""}`}
              onClick={() => {
                setEditingTask(null);
                setTab("create");
              }}
            >
              create
            </button>
            {selectedTask && (
              <button
                type="button"
                className={`tab-btn ${tab === "details" ? "active" : ""}`}
                onClick={() => setTab("details")}
              >
                Task
              </button>
            )}
          </div>
          <div className="filter-container"></div>
        </div>
        {tab === "all" ? (
          <TaskList
            tasks={tasks}
            onSelectTask={handleSelectedTask}
            onDelete={handleDeleteTask}
          />
        ) : tab === "create" ? (
          <Create
            onAddTask={handleTasks}
            editingTask={editingTask}
            onEditTask={editTask}
          />
        ) : (
          <TaskDetails
            task={selectedTask}
            onBack={() => setTab("all")}
            onTriggerEdit={handleTriggerEdit}
          />
        )}
      </section>
    </main>
  );
}

export default HomePage;
