import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [reminder, setReminder] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      reminderTime: reminder ? new Date(reminder).toISOString() : null
    };

    onAdd(payload);
    setTitle('');
    setReminder('');
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 mb-4">

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 w-full"
          placeholder="Add new todo..."
        />

        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded">
          Add
        </button>
      </div>

      {/* Reminder Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-sm text-gray-600 dark:text-gray-300">
          Reminder:
        </label>

        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="p-2 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white w-full sm:w-auto"
        />

        <button
          type="button"
          onClick={() => setReminder('')}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
