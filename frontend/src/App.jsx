import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import { API } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const ringingRef = useRef(new Map());

  const fetchTodos = async () => {
    try {
      const res = await fetch(API.TODOS);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const startRinging = (todo) => {
    const id = todo._id;
    if (ringingRef.current.has(id)) return;

    const audio = new Audio("/service-bell_daniel_simion.mp3");
    audio.volume = 1.0;

    audio.play().catch(() => {});

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Todo Reminder", {
        body: todo.title,
        icon: "/favicon.ico",
      });
    }

    const intervalId = setInterval(() => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }, 3000);

    ringingRef.current.set(id, { intervalId, audio });
  };

  const stopRinging = (id) => {
    const entry = ringingRef.current.get(id);
    if (!entry) return;
    clearInterval(entry.intervalId);
    entry.audio.pause();
    entry.audio.currentTime = 0;
    ringingRef.current.delete(id);
  };

  useEffect(() => {
    return () => {
      ringingRef.current.forEach((v) => {
        clearInterval(v.intervalId);
        v.audio.pause();
      });
      ringingRef.current.clear();
    };
  }, []);

  // Tick every second for alarms
  useEffect(() => {
    const tick = setInterval(() => {
      const now = Date.now();

      todos.forEach((todo) => {
        if (!todo.reminderTime || todo.completed) return;

        const reminderTs = new Date(todo.reminderTime).getTime();
        if (reminderTs <= now && !ringingRef.current.has(todo._id)) {
          startRinging(todo);
        }
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [todos]);

  useEffect(() => {
    const now = Date.now();

    todos.forEach((todo) => {
      const id = todo._id;

      if (!todo.reminderTime || todo.completed) {
        stopRinging(id);
        return;
      }

      const reminderTs = new Date(todo.reminderTime).getTime();
      if (reminderTs <= now && !ringingRef.current.has(id)) {
        startRinging(todo);
      }
    });

    ringingRef.current.forEach((_, id) => {
      if (!todos.some((t) => t._id === id)) stopRinging(id);
    });
  }, [todos]);

  const addTodo = async (payload) => {
    try {
      const res = await fetch(API.TODOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Add todo failed", err);
    }
  };

  const updateTodo = async (id, fields) => {
    try {
      const res = await fetch(`${API.TODOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));

      if (
        (fields.reminderTime === null) ||
        (fields.completed === true)
      ) {
        stopRinging(id);
      }
    } catch (err) {
      console.error("Update todo failed", err);
    }
  };

  const toggleTodo = (id, completed) =>
    updateTodo(id, { completed: !completed });

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API.TODOS}/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t._id !== id));
      stopRinging(id);
    } catch (err) {
      console.error("Delete todo failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/todos"
            element={
              <div className="container">
                <h1 className="text-3xl font-bold mb-4">Todo App</h1>
                <TodoForm onAdd={addTodo} />
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                  />
                )}
              </div>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
