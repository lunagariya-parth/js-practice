import { useReducer } from "react";
import { counterReducer } from "./counterReducer";

export default function CounterReducerPage() {
  const initialCounter = {
    count: 0,
    error: null,
  };
  const [state, dispatch] = useReducer(counterReducer, initialCounter);
  return (
    <div className="flex flex-col gap-4">
      <p>counter is :{state.count}</p>
      <div className="flex gap-2">
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      </div>
      {state.error && <p>{state.error}</p>}
    </div>
  );
}
