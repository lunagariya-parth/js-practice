import Card from "./Card";
import type { TColumn } from "./kanbanReducer";
import useKanbanContext from "./kanbanContext";

export default function Column({ column }: { column: TColumn }) {
  const board = useKanbanContext();
  if (!board) return null;
  const columnCards = board.state.cards.filter((c) => column.cardIds.includes(c.id));
  return (
    <section className="flex w-72 shrink-0 flex-col gap-3 rounded bg-gray-100 p-3">
      <header className="flex items-center justify-between">
        <h3 className="font-semibold">{column.title}</h3>
        <button
          type="button"
          className="size-6! bg-transparent! border-none! p-0!"
          onClick={() => board?.dispatch({ type: "DELETE_COLUMN", columnId: column.id })}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth="0" />
            <g strokeLinecap="round" strokeLinejoin="round" />

            <g fill="none">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
              <path
                d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"
                fill="red"
              />
            </g>
          </svg>
        </button>
      </header>
      <ul className="flex flex-col gap-2">
        {columnCards.length > 0 ? (
          columnCards.map((card) => (
            <Card key={card.id} card={card} columnId={column.id} onCardDelete={board.dispatch} />
          ))
        ) : (
          <p>No cards!</p>
        )}
      </ul>
    </section>
  );
}
