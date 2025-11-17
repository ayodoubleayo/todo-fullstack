import React, { useMemo, useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setValue(todo.title);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setValue(todo.title);
  };

  const saveEdit = async () => {
    if (!value.trim() || value.trim() === todo.title) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onUpdate(todo._id, { title: value.trim() });
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const clearReminder = async () => {
    try {
      await onUpdate(todo._id, { reminderTime: null });
    } catch (err) {
      console.error(err);
    }
  };

  // isDue: reminder time is set, in the past (or now), and todo not completed
  const isDue = useMemo(() => {
    if (!todo.reminderTime || todo.completed) return false;
    try {
      return new Date(todo.reminderTime).getTime() <= Date.now();
    } catch {
      return false;
    }
  }, [todo.reminderTime, todo.completed]);

  return (
    <li className="flex items-start justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border hover:shadow-md transition-all">
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, todo.completed)}
          className="w-5 h-5 accent-blue-600 cursor-pointer mt-1"
        />

        <div className="flex-1">
          {!editing ? (
            <div>
              <span
                className={`text-lg transition-all ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {todo.title}
              </span>

              {todo.reminderTime && (
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-1 flex items-center gap-3">
                  <div>
                    Reminder: {new Date(todo.reminderTime).toLocaleString()}
                    {isDue && (
                      <span className="ml-2 text-xs font-semibold text-red-600">
                        — Due
                      </span>
                    )}
                  </div>

                  <button
                    onClick={clearReminder}
                    className="ml-3 text-xs text-red-500 hover:underline"
                    title="Clear reminder (stop alarm)"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          ) : (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border rounded-md bg-transparent outline-none text-gray-800 dark:text-gray-100"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        {!editing ? (
          <>
            <button
              onClick={startEdit}
              className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(todo._id)}
              className="text-red-500 font-medium hover:text-red-600 transition"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={saveEdit}
              disabled={saving}
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              disabled={saving}
              className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}
