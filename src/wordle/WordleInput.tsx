export default function WordleInput({
  cw,
  gc,
  isLost = false,
}: {
  cw: string;
  gc: string[];
  isLost: boolean;
}) {
  return (
    <div className="w-full gap-2 flex flex-wrap items-center justify-center uppercase">
      {cw.split("").map((item, index) => (
        <div
          key={index}
          className="size-10 relative rounded text-white text-md flex items-center justify-center bg-black p-1  "
        >
          {gc.includes(item) || isLost ? item : ""}
          <div className="absolute bottom-0.5  w-10/12 h-px bg-white"></div>
        </div>
      ))}
    </div>
  );
}
