import { useRef, useState } from "react";

export default function PageForUseState() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  function handleIncrement() {
    setCount((count) => count + 1);
    countRef.current += 1;
    console.log("state count", count);
    console.log("ref count", countRef.current);
  }
  return (
    <div className="flex flex-col gap-2 w-40 p-4">
      count is {count}
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
