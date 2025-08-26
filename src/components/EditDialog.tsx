import React, { useEffect, useRef, useState } from 'react';
import type { Todo } from './TodoList';

export default function EditDialog({ open, todo, onClose, onSave }: {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (t: Todo) => Promise<void> | void;
}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Low'|'Medium'|'High'>('Medium');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && todo) {
      setTitle(todo.title);
      setPriority(todo.priority);
      // focus title for keyboard users
      setTimeout(() => titleRef.current?.focus(), 0);
      window.dispatchEvent(new Event('dialog:open'));
    }
  }, [open, todo]);

  function handleClose() {
    onClose();
    window.dispatchEvent(new Event('dialog:close'));
  }

  async function handleSave() {
    if (!todo) return;
    await onSave({ ...todo, title, priority });
    window.dispatchEvent(new Event('todo:saved'));
  }

  return (
    <div className="dialog-backdrop" data-open={open} aria-hidden={!open}>
      <div className="dialog" data-open={open} role="dialog" aria-modal="true" aria-labelledby="dlg-title">
        <h2 id="dlg-title">Edit Task</h2>
        <div>
          <label htmlFor="edit-title">Task</label>
          <input id="edit-title" ref={titleRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="edit-priority">Priority</label>
          <select id="edit-priority" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div style={{ height: 10 }} />
        <div className="actions" role="group" aria-label="Dialog Actions">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
