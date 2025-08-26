import React from 'react';
import TodoApp from './components/TodoApp';

function CurrentTime() {
  const time = new Date();

  return (
    <p className="status" role="timer" aria-live="polite">
      Current time: <time dateTime={time.toISOString()}>{time.toLocaleTimeString()}</time>
    </p>
  );
}

export default function App() {
  return (
    <main role="region" aria-label="Main Content">
      <div className="card" role="region" aria-label="Header">
        <h1>Todo List (A11y‑First BDD Demo)</h1>
        <p className="status">This UI uses HTML‑native semantics so tests can target <em>role + name</em>.</p>
        <CurrentTime />
      </div>
      <div style={{ height: 12 }} />
      <TodoApp />
    </main>
  );
}
