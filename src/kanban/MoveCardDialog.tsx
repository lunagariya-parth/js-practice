import { useState, type Ref, type SubmitEvent } from "react";
import useKanbanContext from "./kanbanContext";
import type { TCard } from "./kanbanReducer";

type TMoveCardDialogProps = {
  ref: Ref<HTMLDialogElement>;
  card: TCard;
  columnId: string;
};

export default function MoveCardDialog({ ref, card, columnId }: TMoveCardDialogProps) {
  const { state, dispatch } = useKanbanContext();
  const [toColumnId, setToColumnId] = useState("");

  const targets = state.columns.filter((c) => c.id !== columnId);
  // fall back to the first other column if none picked or the picked one was deleted
  const targetId = targets.some((c) => c.id === toColumnId) ? toColumnId : targets[0]?.id;

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!targetId) return;
    dispatch({ type: "MOVE_CARD", cardId: card.id, fromColumnId: columnId, toColumnId: targetId });
    e.currentTarget.closest("dialog")?.close();
  }

  return (
    <dialog
      ref={ref}
      onClose={() => setToColumnId("")}
      className="m-auto w-80 rounded p-4 backdrop:bg-black/40"
    >
      <form onSubmit={submit} className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Move card</h2>
        <p className="text-sm text-gray-500">{card.title}</p>
        <label className="flex flex-col gap-1 text-sm">
          Move to
          <select value={targetId ?? ""} onChange={(e) => setToColumnId(e.target.value)}>
            {targets.map((c) => (
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
            Move
          </button>
        </div>
      </form>
    </dialog>
  );
}
