import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          About This Todo App
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
          A clean, modern, full-stack productivity app built with real-world features.
        </p>

        {/* What is this project */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This Todo App is a complete full-stack project built using 
            <strong> React (Vite)</strong>, <strong>Node.js</strong>, 
            <strong> Express</strong>, and <strong>MongoDB</strong>.  
            It includes a modern frontend, a REST API backend, reminder alarms, 
            routing, dark mode, and a fully deployed infrastructure.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Features
          </h2>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Full CRUD functionality (Create, Read, Update, Delete)
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Powerful backend API using Node.js, Express & MongoDB
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Smart Reminder System with continuous alarm ringing until cleared
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Real-time alarm check that rings exactly at the reminder time  
              (no refresh needed)
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Browser notifications for reminders, even in background tabs
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Responsive, modern UI built with Tailwind CSS
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Light / Dark mode with local storage persistence
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Clean routing using React Router
            </li>

            <li className="flex gap-2 items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              Fully deployed: Backend on Render, Frontend on Vercel
            </li>

          </ul>
        </section>

        {/* Tech stack */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              React (Vite)
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              Node.js + Express
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              MongoDB + Mongoose
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              React Router
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              Vercel + Render Deployment
            </span>
          </div>
        </section>

        {/* Why this project */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Why I Built This
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This project demonstrates my ability as a Full-Stack React Developer  
            to build real, production-ready applications.  
            I integrated frontend, backend, database, alarms, notifications,  
            API communication, deployment pipelines, and responsive design.  
            It reflects my journey switching from medicine into tech, and my  
            commitment to mastering full-stack development.
          </p>
        </section>

        {/* Button */}
        <div className="text-center pt-4">
          <Link
            to="/todos"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium shadow-md transition"
          >
            Go to Todos
          </Link>
        </div>
      </div>

    </div>
  );
}
