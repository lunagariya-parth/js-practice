import { createContext, useContext, type Dispatch } from "react";
import type { TBoardAction, TBoardState } from "./kanbanReducer";
export type TKanbanContext = {
  state: TBoardState;
  dispatch: Dispatch<TBoardAction>;
};
export const KanBanContext = createContext<TKanbanContext | null>(null);
export default function useKanbanContext() {
  const board = useContext(KanBanContext);
  if (board) return board;
  throw new Error("kanban context not found");
}
