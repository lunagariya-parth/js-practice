import { useRef } from "react";

import Column from "./Column";
import AddCardDialog from "./AddCardDialog";
import useKanbanContext from "./kanbanContext";

export default function Board() {
  const board = useKanbanContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  function addColumn(formData: FormData) {
    const title = String(formData.get("column") ?? "").trim();
    if (title !== "") board.dispatch({ type: "ADD_COLUMN", title });
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <form action={addColumn} className="flex gap-2">
        <input placeholder="New column" name="column" />
        <button type="submit">Add column</button>
        <button type="button" onClick={() => board.dispatch({ type: "RESET" })}>
          Reset
        </button>
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          Add card
        </button>
      </form>
      <div className="flex items-start gap-4 overflow-x-auto">
        {board.state.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
      <AddCardDialog ref={dialogRef} />
    </div>
  );
}
