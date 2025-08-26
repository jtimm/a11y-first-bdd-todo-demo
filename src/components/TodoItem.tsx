import React from 'react';
import type { Todo } from './TodoList';

export default function TodoItem({
  todo,
  onEdit,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onEdit: (t: Todo) => void;
  onToggle: (id: number, done: boolean) => void;
  onRemove: (id: number) => void;
}) {
  const checkboxId = `todo-${todo.id}`;
  return (
    <li role="listitem">
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <label htmlFor={checkboxId} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.title}
      </label>
      <div className="actions">
        {/* Make the button's accessible name include the item title to allow precise targeting by name without extra ARIA */}
        <button type="button" onClick={() => onEdit(todo)}>Edit {todo.title}</button>
        <button type="button" onClick={() => onRemove(todo.id)}>Delete {todo.title}</button>
        <span className="badge" aria-label={`Priority ${todo.priority}`}>{todo.priority}</span>
      </div>
    </li>
  );
}
