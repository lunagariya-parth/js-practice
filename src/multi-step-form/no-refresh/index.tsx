import { useReducer } from "react";
import AddressStep from "./AddressStep";
import { FormContext } from "../formContext";
import { formReducer, initialState } from "../formReducer";
import PersonalStep from "./PersonalStep";
import PrefsStep from "./PrefsStep";


export default function MultiStepFormPageWithNoRefresh() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext value={{ state, dispatch }}>
      {state.step == 0 && <PersonalStep />}
      {state.step == 1 && <AddressStep />}
      {state.step == 2 && <PrefsStep />}
    </FormContext>
  );
}
