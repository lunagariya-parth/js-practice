import { cn } from "cn";

type TTenziDicies = {
  dice: TDice[];
  lockDice: (id: number) => void;
  gameStatus: "not-started" | "in-progress" | "finished";
};
export type TDice = { id: number; value: number; isLocked: boolean };

export default function TenziDicies({ dice, lockDice, gameStatus }: TTenziDicies) {
  return (
    <div className="flex gap-6 flex-wrap justify-center my-6">
      {dice.map((dice) => (
        <button
          key={dice.id}
          className={cn("size-10", { "bg-green-400! text-green-900!": dice.isLocked })}
          onClick={() => lockDice(dice.id)}
          disabled={gameStatus !== "in-progress"}
        >
          {dice.value}
        </button>
      ))}
    </div>
  );
}
