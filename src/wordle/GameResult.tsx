import { cn } from "cn";

export default function GameResult({ result }: { result: "won" | "lost" }) {
  return (
    <div
      className={cn("p-3 rounded bg-green-500 text-white text-center", {
        "bg-red-500!": result == "lost",
      })}
    >
      <h1 className="text-2xl font-bold">{result == "won" ? "You win!" : "You Lost"}</h1>
      <p className="text-base">{result == "won" ? "Well Done!" : "You better learn Assembly"}</p>
    </div>
  );
}
