import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20 
      min-h-[80vh] 
      bg-gradient-to-b from-blue-50 to-white 
      dark:from-gray-800 dark:to-gray-900 transition-all duration-300">

      {/* Hero Title */}
      <h1 className="text-5xl font-extrabold mb-4 
        bg-gradient-to-r from-blue-600 to-purple-600 
        text-transparent bg-clip-text">
        Welcome! 👋
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-8">
        Ready to stay productive? Start planning your day with your awesome Todo App.
      </p>

      {/* Call to Action Button */}
      <Link
        to="/todos"
        className="px-8 py-3 text-lg font-medium 
        bg-blue-600 text-white rounded-lg shadow-md 
        hover:bg-blue-700 hover:shadow-lg 
        transition-all"
      >
        Go to Todos 🚀
      </Link>
    </div>
  );
}
                                                