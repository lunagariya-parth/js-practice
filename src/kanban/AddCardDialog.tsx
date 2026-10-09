import { useState, type Ref, type SubmitEvent } from "react";
import useKanbanContext from "./kanbanContext";
import type { TPriority } from "./kanbanReducer";

export default function AddCardDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const { state, dispatch } = useKanbanContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TPriority>("medium");
  const [columnId, setColumnId] = useState("");

  // fall back to the first column if none picked or the picked one was deleted
  const targetId = state.columns.some((c) => c.id === columnId) ? columnId : state.columns[0]?.id;

  function reset() {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setColumnId("");
  }

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || !targetId) return;
    dispatch({
      type: "ADD_CARD",
      columnId: targetId,
      card: {
        id: crypto.randomUUID(),
        title: trimmed,
        description: description.trim(),
        priority,
        dueDate: null,
        createdAt: Date.now(),
      },
    });
    console.log("heool;")
    e.currentTarget.closest("dialog")?.close();
  }

  return (
    <dialog ref={ref} onClose={reset} className="m-auto w-96 rounded p-4 backdrop:bg-black/40">
      <form onSubmit={submit} className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Add card</h2>
        <label className="flex flex-col gap-1 text-sm">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Description
          <textarea
            className="rounded border p-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value as TPriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Column
          <select value={targetId ?? ""} onChange={(e) => setColumnId(e.target.value)}>
            {state.columns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={(e) => e.currentTarget.closest("dialog")?.close()}>
            Cancel
          </button>
          <button type="submit" disabled={!targetId}>
            Add card
          </button>
        </div>
      </form>
    </dialog>
  );
}
