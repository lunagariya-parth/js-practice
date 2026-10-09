export type TPriority = "low" | "medium" | "high";
type TFilters = { search: string; priority: TPriority | "all"; label: string | "all" };
export type TCard = {
  id: string;
  title: string;
  description: string;
  priority: TPriority;
  dueDate: string | null;
  createdAt: number;
};

export type TColumn = {
  id: string;
  title: string;
  cardIds: string[];
};

export type TBoardState = {
  cards: TCard[];
  columns: TColumn[];
  columnOrder: string[];
  filters: TFilters;
  editingCardId: string | null;
};

export const initialBoard: TBoardState = {
  cards: [
    {
      id: "c1",
      title: "Set up repo",
      description: "",
      priority: "high",

      dueDate: null,
      createdAt: 1,
    },
    {
      id: "c2",
      title: "Design login page",
      description: "",
      priority: "medium",
      dueDate: null,
      createdAt: 2,
    },
    {
      id: "c3",
      title: "Write API docs",
      description: "",
      priority: "low",
      dueDate: null,
      createdAt: 3,
    },
  ],
  columns: [
    { id: "todo", title: "To Do", cardIds: ["c2", "c3"] },
    { id: "doing", title: "In Progress", cardIds: ["c1"] },
    { id: "done", title: "Done", cardIds: [] },
  ],
  columnOrder: ["todo", "doing", "done"],
  filters: { search: "", priority: "all", label: "all" },
  editingCardId: null,
};
export type TBoardAction =
  | { type: "ADD_COLUMN"; title: string }
  | { type: "RENAME_COLUMN"; columnId: string; title: string }
  | { type: "DELETE_COLUMN"; columnId: string }
  | { type: "ADD_CARD"; columnId: string; card: TCard }
  | { type: "UPDATE_CARD"; cardId: string; changes: Partial<Omit<TCard, "id" | "createdAt">> }
  | { type: "DELETE_CARD"; cardId: string; columnId: string }
  | { type: "MOVE_CARD"; cardId: string; fromColumnId: string; toColumnId: string }
  | { type: "SET_FILTER"; filters: Partial<TFilters> }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_EDITING_CARD"; cardId: string }
  | {
      type: "RESET";
    };
function generateId() {
  return Math.random().toString(36).substring(2, 11);
}
export function kanbanReducer(state: TBoardState, action: TBoardAction): TBoardState {
  switch (action.type) {
    case "ADD_COLUMN": {
      const updatedColumns = state.columns.concat({
        id: generateId(),
        title: action.title,
        cardIds: [],
      });
      return { ...state, columns: updatedColumns };
    }
    case "RENAME_COLUMN": {
      const updatedColumns = state.columns.map((c) => {
        if (c.id === action.columnId) return { ...c, title: action.title };
        return c;
      });
      return { ...state, columns: updatedColumns };
    }
    case "DELETE_COLUMN": {
      const updatedColumns = state.columns.filter((c) => c.id !== action.columnId);
      return { ...state, columns: updatedColumns };
    }
    case "ADD_CARD": {
      const updatedCards = state.cards.concat(action.card);
      const updatedColumns = state.columns.map((c) => {
        if (c.id === action.columnId) return { ...c, cardIds: c.cardIds.concat(action.card.id) };
        return c;
      });

      return { ...state, cards: updatedCards, columns: updatedColumns };
    }
    case "UPDATE_CARD": {
      const updatedCards = state.cards.map((c) => {
        if (c.id == action.cardId) return { ...c, ...action.changes };
        return c;
      });
      return { ...state, cards: updatedCards };
    }
    case "DELETE_CARD": {
      const updatedCards = state.cards.filter((c) => c.id !== action.cardId);
      const updatedColumns = state.columns.map((c) => {
        if (c.id === action.columnId)
          return { ...c, cardIds: c.cardIds.filter((cid) => cid !== action.cardId) };
        return c;
      });
      return { ...state, cards: updatedCards, columns: updatedColumns };
    }
    case "MOVE_CARD": {
      if (action.fromColumnId == action.toColumnId) return state;
      //delete from old column add to new column

      const updatedColumns = state.columns.map((c) => {
        if (c.id === action.fromColumnId)
          return { ...c, cardIds: c.cardIds.filter((cid) => cid !== action.cardId) };
        if (c.id === action.toColumnId) return { ...c, cardIds: c.cardIds.concat(action.cardId) };
        return c;
      });
      return { ...state, columns: updatedColumns };
    }
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.filters } };
    case "CLEAR_FILTERS":
      return { ...state, filters: { search: "", priority: "all", label: "all" } };
    case "RESET":
      return initialBoard;
    default:
      return state;
  }
}
