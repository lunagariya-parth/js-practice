import { cn } from "cn";

export default function AlphabetGrid({
  cw,
  addChar,
  gc,
}: {
  cw: string;
  addChar: (a: string) => void;
  gc: string[];
}) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  return (
    <div className="flex gap-2 items-center flex-wrap justify-center w-full">
      {alphabets.split("").map((a, index) => (
        <button
          key={index}
          onClick={() => addChar(a)}
          className={cn("size-10 rounded bg-amber-300! text-black! text-sm border-none!", {
            "bg-green-400!": cw.includes(a) && gc.some((i) => i == a),
            "bg-red-400!": !cw.includes(a) && gc.some((i) => i == a),
          })}
        >
          {a.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
