import { useContext } from "react";
import StepHeader from "../StepHeader";
import { FormContext } from "../formContext";

const PLANS = ["free", "pro", "team"] as const;
const INTERESTS = ["react", "typescript", "node", "design", "devops"];

export default function PrefsStep() {
  const form = useContext(FormContext);
  function submit(formData: FormData) {
    const plan = String(formData.get("plan") ?? "") as "" | "free" | "pro" | "team";
    const interests = formData.getAll("interests").map(String);
    form?.dispatch({ type: "UPDATE_FIELD", section: "prefs", field: "plan", value: plan });
    form?.dispatch({
      type: "UPDATE_FIELD",
      section: "prefs",
      field: "newsletter",
      value: formData.has("newsLetter"),
    });
    form?.dispatch({
      type: "UPDATE_FIELD",
      section: "prefs",
      field: "interests",
      value: interests as never,
    });
    const errors: Record<string, string> = {};
    if (!plan) errors.plan = "plan is required";
    if (interests.length === 0) errors.interests = "pick at least one interest";
    form?.dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length === 0) form?.dispatch({ type: "NEXT" });
  }
  function goBack() {
    form?.dispatch({ type: "PREV" });
  }
  return (
    <form className="flex flex-col gap-4 p-4 border rounded w-80 mx-auto" action={submit}>
      <StepHeader
        title="Preferences"
        description="Pick a plan and tell us what you're interested in."
      />
      <label className="flex flex-col gap-1" htmlFor="plan">
        Plan
        <select
          className="border rounded p-1"
          defaultValue={form?.state.data.prefs.plan}
          id="plan"
          name="plan"
        >
          <option value="">Select a plan</option>
          {PLANS.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
        {form?.state.errors.plan && (
          <span className="text-red-500 text-sm">{form?.state.errors.plan}</span>
        )}
      </label>

      <label className="flex items-center gap-2" htmlFor="newsLetter">
        <input
          type="checkbox"
          defaultChecked={form?.state.data.prefs.newsletter}
          name="newsLetter"
          id="newsLetter"
        />
        Subscribe to newsletter
      </label>

      <fieldset className="flex flex-col gap-1">
        <legend>Interests</legend>
        {INTERESTS.map((interest) => (
          <label
            key={interest}
            className="flex items-center gap-2"
            htmlFor={`interest-${interest}`}
          >
            <input
              type="checkbox"
              id={`interest-${interest}`}
              name="interests"
              value={interest}
              defaultChecked={form?.state.data.prefs.interests.includes(interest)}
            />
            {interest}
          </label>
        ))}
        {form?.state.errors.interests && (
          <span className="text-red-500 text-sm">{form?.state.errors.interests}</span>
        )}
      </fieldset>
      <div className="flex justify-between gap-2 flex-wrap">
        <button type="button" onClick={goBack}>
          Prev
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
