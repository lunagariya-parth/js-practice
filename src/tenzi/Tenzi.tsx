import { useState } from "react";
import HeaderText from "./HeaderText";
import TenziDicies, { type TDice } from "./TenziDicies";
import ReactConfetti from "react-confetti";

function randomNumberGenerator() {
  return Math.ceil(Math.random() * 6);
}
function createDiceArray(size: number) {
  const arr = new Array(size).fill({ id: 0, value: 0, isLocked: false });
  return arr.map((a, i) => {
    return { ...a, id: i, value: randomNumberGenerator() };
  });
}
export default function Tenzi() {
  const [dice, setDice] = useState<TDice[]>(() => createDiceArray(10));
  const [value, setValue] = useState(0);
  const [gameStatus, setGameStatus] = useState<"not-started" | "in-progress" | "finished">(
    "not-started",
  );

  function rollDice() {
    if (gameStatus === "not-started") setGameStatus("in-progress");
    if (dice.every((d) => d.isLocked === true)) setGameStatus("finished");
    setDice((dice) =>
      dice.map((d) => (d.isLocked === true ? d : { ...d, value: randomNumberGenerator() })),
    );
  }

  function LockDice(id: number) {
    if (value === 0) {
      const lockedDie = dice.find((d) => d.id === id);
      if (lockedDie) setValue(lockedDie.value);
    }

    if (
      dice
        .filter((d) => d.isLocked == true)
        .every((d) => d.value == dice.find((d) => d.id === id)?.value)
    ) {
      setDice((dice) => dice.map((d) => (d.id === id ? { ...d, isLocked: true } : d)));
    }
  }
  function resetGame() {
    setDice(createDiceArray(10));
    setGameStatus("in-progress");
    setValue(0);
  }
  return (
    <div className="flex flex-col gap-4 max-w-100 border rounded mx-auto p-4 lg:p-6">
      {gameStatus === "finished" && <ReactConfetti />}
      <HeaderText />
      <TenziDicies dice={dice} lockDice={LockDice} gameStatus={gameStatus} />
      {gameStatus === "finished" ? (
        <>
          <p className="text-center p-6 rounded bg-green-400  text-white">You Won!!</p>
          <button className="flex-none" onClick={resetGame}>
            Start New Game
          </button>
        </>
      ) : (
        <button className="flex-none" onClick={rollDice}>
          {gameStatus === "not-started" ? (
            <>Start Game</>
          ) : gameStatus === "in-progress" ? (
            <>Roll </>
          ) : (
            <>You Won</>
          )}
        </button>
      )}
    </div>
  );
}
