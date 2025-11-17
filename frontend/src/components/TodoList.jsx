import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (!todos.length)
    return (
      <p className="text-center text-gray-500 italic mt-6">
        No todos yet — add one above!
      </p>
    );

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
