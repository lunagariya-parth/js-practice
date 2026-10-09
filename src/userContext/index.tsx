import Profile from "./profile";
import Sidebar from "./sidebar";
import { UserContext } from "./useUserContex";

export default function UserContextPage() {
  const user = {
    name: "User1",
    email: "user1@email.com",
  };
  return (
    <UserContext value={user}>
      <div className="w-full flex gap-2 h-80">
        <Sidebar />
        <Profile />
      </div>
    </UserContext>
  );
}
