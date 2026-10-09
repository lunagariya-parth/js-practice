import { createContext, useContext } from "react";

type TUser = {
  name: string;
  email: string;
};
export const UserContext = createContext<TUser | null>(null);

export default function useUserContex() {
  const user = useContext(UserContext);
  if (user) return user;
  throw new Error("User context not available");
}
