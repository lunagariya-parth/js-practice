import { cn } from "cn";

export default function LanguagesBoard({ arr, chance = 0 }: { arr: string[]; chance?: number }) {
  return (
    <div className="flex justify-center flex-wrap gap-3">
      {arr.map((a, index) => (
        <p
          key={index}
          className={cn("p-1.5 rounded text-sm bg-blue-500 text-white", {
            "opacity-50": chance > index,
          })}
        >
          {a}
        </p>
      ))}
    </div>
  );
}
