import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
        
        <h1 className="text-xl font-bold text-blue-600">
          Todo-App
        </h1>

        <ul className="flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/todos">Todos</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* 🌙 Light/Dark Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

      </div>
    </nav>
  );
}
