import useUserContex from "./useUserContex";

export default function Sidebar() {
  const user = useUserContex();
  return <div className="shrink-0 w-80 border rounded ">Hello {user.name}</div>;
}
