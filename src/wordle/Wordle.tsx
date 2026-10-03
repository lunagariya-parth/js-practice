import { useState } from "react";
import HeaderText from "../tenzi/HeaderText";
import AlphabetGrid from "./AlphabetGrid";
import LanguagesBoard from "./Languages";
import GameResult from "./GameResult";
import WordleInput from "./WordleInput";
import ReactConfetti from "react-confetti";
import { generate } from "random-words";

const Languages = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Ruby",
  "Assembly",
];
function generateWord() {
  return String(generate({ minLength: 9, maxLength: 8 }));
}
export default function Wordle() {
  const AttemptInitialState = { used: 0, total: 9 };
  const [answer, setAnswer] = useState(generateWord);
  const [attempt, setAttempt] = useState(AttemptInitialState);
  const [gussedChars, setGuessedChars] = useState<string[]>([]);
  function addChar(c: string) {
    setGuessedChars((prev) => Array.from(new Set([...prev, c])));
    if (!answer.includes(c) && !gussedChars.some((gc) => gc == c))
      setAttempt((prev) => ({ ...prev, used: prev.used + 1 }));
  }
  console.log(gussedChars);
  function reset() {
    setAttempt(AttemptInitialState);
    setGuessedChars([]);
    setAnswer(generateWord);
  }
  const isWon = answer.split("").every((c) => gussedChars.includes(c));
  const isLost = attempt.used >= attempt.total;
  const isOver = isWon || isLost;
  return (
    <div className="flex flex-col gap-4 max-w-120 border rounded mx-auto p-4  ">
      <HeaderText
        title="Wordle"
        subTitle="Guess the word within 8 attempts to keep programming world safe from Assempbly!"
      />
      {isOver && (
        <>
          <GameResult result={isWon ? "won" : "lost"} />
          {isWon && <ReactConfetti />}
        </>
      )}
      <LanguagesBoard arr={Languages} chance={attempt.used} />
      <WordleInput cw={answer} gc={gussedChars} isLost={isLost} />
      {!isOver && <AlphabetGrid cw={answer} addChar={addChar} gc={gussedChars} />}
      <button onClick={reset}>{isOver ? "Reset" : "New game"}</button>
    </div>
  );
}
