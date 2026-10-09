import useUserContex from "./useUserContex";

export default function Profile() {
  const user = useUserContex();

  return <div className="flex-1 w-full border rounded">{user.email}</div>;
}
