import React from 'react';
import TodoItem from './TodoItem';

export type Todo = {
  id: number;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  done: boolean;
};

export default function TodoList({
  todos,
  onEdit,
  onToggle,
  onRemove,
}: {
  todos: Todo[];
  onEdit: (t: Todo) => void;
  onToggle: (id: number, done: boolean) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="card" role="region" aria-label="Todos">
      <h2>Todos</h2>
      {todos.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {todos.map((t) => (
            <TodoItem key={t.id} todo={t} onEdit={onEdit} onToggle={onToggle} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}
