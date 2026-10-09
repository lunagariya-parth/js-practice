import { useReducer } from "react";
import Board from "./Board";
import { KanBanContext } from "./kanbanContext";
import { initialBoard, kanbanReducer } from "./kanbanReducer";

export default function KanbanPage() {
  const [state, dispatch] = useReducer(kanbanReducer, initialBoard);
  return (
    <KanBanContext value={{ state, dispatch }}>
      <Board />
    </KanBanContext>
  );
}
