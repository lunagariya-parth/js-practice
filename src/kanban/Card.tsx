import { useRef, type Dispatch } from "react";
import MoveCardDialog from "./MoveCardDialog";
import type { TBoardAction, TCard } from "./kanbanReducer";

const priorityStyle = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

type TCardProps = { card: TCard; columnId: string; onCardDelete: Dispatch<TBoardAction> };

export default function Card({ card, columnId, onCardDelete }: TCardProps) {
  const moveDialogRef = useRef<HTMLDialogElement>(null);
  return (
    <li className="flex flex-col gap-2 border rounded bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium">{card.title}</h4>
      </div>
      {card.description && <p className="text-sm text-gray-500">{card.description}</p>}
      <div className="flex flex-wrap gap-1 text-xs">
        <span className={`rounded px-2 py-0.5 ${priorityStyle[card.priority]}`}>
          {card.priority}
        </span>
      </div>
      <div className="flex gap-2">
        <button type="button" className="h-8! py-0!" onClick={() => moveDialogRef.current?.showModal()}>
          Move
        </button>
        <button
          type="button"
          className="h-8! py-0! bg-red-500/90!"
          onClick={() => onCardDelete({ type: "DELETE_CARD", cardId: card.id, columnId: columnId })}
        >
          Delete
        </button>
      </div>
      <MoveCardDialog ref={moveDialogRef} card={card} columnId={columnId} />
    </li>
  );
}
