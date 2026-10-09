export type TState = {
  step: number; // 0–3
  data: {
    personal: { name: string; email: string; phone: string };
    address: { street: string; city: string; postal: string; country: string };
    prefs: { plan: "" | "free" | "pro" | "team"; newsletter: boolean; interests: string[] };
  };
  errors: Record<string, string>;
  completedSteps: number[];
  status: "idle" | "submitting" | "success" | "error";
};
type Section = "personal" | "address" | "prefs";

export type TAction =
  | { type: "UPDATE_FIELD"; section: Section; field: string; value: string | boolean }
  | { type: "TOGGLE_INTEREST"; interest: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SET_COMPLETEDSTEPS"; steps: number[] }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GO_TO"; step: number }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_FAIL"; error: string }
  | { type: "RESET" };

export const initialState: TState = {
  step: 0,
  data: {
    personal: { name: "", email: "", phone: "" },
    address: { street: "", city: "", postal: "", country: "" },
    prefs: { plan: "", newsletter: false, interests: [] },
  },
  errors: {},
  completedSteps: [],
  status: "idle",
};
export function formReducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.section]: { ...state.data[action.section], [action.field]: action.value },
        },
      };
    case "TOGGLE_INTEREST": {
      const interests = state.data.prefs.interests;
      const updated = interests.includes(action.interest)
        ? interests.filter((i) => i !== action.interest)
        : [...interests, action.interest];
      return {
        ...state,
        data: { ...state.data, prefs: { ...state.data.prefs, interests: updated } },
      };
    }
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_COMPLETEDSTEPS":
      return {
        ...state,
        completedSteps: Array.from(new Set([...state.completedSteps, ...action.steps])),
      };
    case "NEXT":
      return {
        ...state,
        step: state.step + 1,
        completedSteps: [...state.completedSteps, state.step],
      };
    case "PREV":
      return {
        ...state,
        step: state.step - 1,
      };
    case "GO_TO":
      return {
        ...state,
        step: action.step,
      };
    case "SUBMIT_START":
      return {
        ...state,
        status: "submitting",
        errors: {},
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        status: "success",
      };
    case "SUBMIT_FAIL":
      return {
        ...state,
        status: "error",
        errors: { ...state.errors, submit: action.error },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
