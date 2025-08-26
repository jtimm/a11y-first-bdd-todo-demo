import React, { useMemo, useRef, useState } from 'react';
import TodoList, { Todo } from './TodoList';
import EditDialog from './EditDialog';

let nextId = 1;

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Low'|'Medium'|'High'>('Medium');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const remaining = useMemo(() => todos.filter(t => !t.done).length, [todos]);

  async function fakeDelay(ms = 400) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function addTodo() {
    if (!title.trim()) return;
    setLoading(true);
    setStatusMsg('');
    await fakeDelay(500); // simulate async save
    const todo: Todo = { id: nextId++, title: title.trim(), priority, done: false };
    setTodos(prev => [...prev, todo]);
    setTitle('');
    setPriority('Medium');
    setLoading(false);
    setStatusMsg('Task created');
    window.dispatchEvent(new Event('todo:created'));
    // focus back to title input for good a11y
    titleInputRef.current?.focus();
  }

  async function updateTodo(updated: Todo) {
    setLoading(true);
    setStatusMsg('');
    await fakeDelay(300);
    setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    setLoading(false);
    setStatusMsg('Task updated');
    window.dispatchEvent(new Event('todo:updated'));
  }

  async function removeTodo(id: number) {
    setLoading(true);
    setStatusMsg('');
    await fakeDelay(250);
    setTodos(prev => prev.filter(t => t.id !== id));
    setLoading(false);
    setStatusMsg('Task removed');
    window.dispatchEvent(new Event('todo:deleted'));
  }

  async function toggleDone(id: number, done: boolean) {
    setLoading(true);
    setStatusMsg('');
    // Adding this type of delay will fail the setChecked function of Playwright
    // await fakeDelay(250);
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done } : t)));
    setLoading(false);
    setStatusMsg(done ? 'Task completed' : 'Task reopened');
    window.dispatchEvent(new Event(`todo:${done ? 'completed' : 'reopened'}`));
  }

  return (
    <section className="card" role="region" aria-label="Todo App">
      <div className="card" role="region" aria-label="Create Task">
        <h2>Create Task</h2>
        <div className="row">
          <div>
            <label htmlFor="title">Task</label>
            <input
              id="title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="priority">Priority</label>
            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <button type="button" onClick={addTodo}>Add Task</button>
          </div>
        </div>
        <div className="status" role="region" aria-label="Status">
          <span id="spinner" className="spinner" role="status" aria-live="polite" aria-label="Loading" hidden={!loading}>
            <span aria-hidden="true">⏳</span>
            <span>Loading…</span>
          </span>
          {!loading && statusMsg}
        </div>
      </div>

      <div style={{ height: 12 }} />

      <TodoList
        todos={todos}
        onEdit={(t) => setEditing(t)}
        onToggle={toggleDone}
        onRemove={removeTodo}
      />

      <div className="status" role="region" aria-label="Summary">
        Remaining: <span role="status" aria-label="Remaining tasks count" className="badge" aria-live="polite">{remaining}</span>
      </div>

      <EditDialog
        open={!!editing}
        todo={editing}
        onClose={() => setEditing(null)}
        onSave={(t) => { setEditing(null); return updateTodo(t); }}
      />
    </section>
  );
}
