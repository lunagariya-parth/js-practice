type TCounterState = {
  count: number;
  error: string | null;
};
type TCounterAction = { type: "INCREMENT" | "DECREMENT" };

export function counterReducer(state: TCounterState, action: TCounterAction): TCounterState {
  switch (action.type) {
    case "INCREMENT":
      return state.count < 5
        ? { ...state, count: state.count + 1, error: null }
        : { ...state, error: "counter is already 5 can not be >5" };

    case "DECREMENT":
      return state.count > 0
        ? { ...state, count: state.count - 1, error: null }
        : { ...state, error: "counter is already 0" };

    default:
      return state;
  }
}
