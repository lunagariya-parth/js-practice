import { createContext, useContext, type Dispatch } from "react";
import type { TAction, TState } from "./formReducer";

type TFormContext = { state: TState; dispatch: Dispatch<TAction> };

export const FormContext = createContext<TFormContext | null>(null);

export default function useFormContext() {
  const formContext = useContext(FormContext);
  if (!formContext) throw new Error("useFormContext must be used inside <FormContext>");
  return formContext;
}
