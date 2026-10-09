import { type MouseEvent } from "react";
import StepHeader from "./StepHeader";
import useFormContext from "./formContext";

const PLANS = ["free", "pro", "team"] as const;
const INTERESTS = ["react", "typescript", "node", "design", "devops"];

export default function PrefsStep() {
  const form = useFormContext();
  function submit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const errors: Record<string, string> = {};

    if (form.state.data.prefs.plan == "") errors.plan = "select your plan ";

    if (form.state.data.prefs.interests.length == 0) errors.interests = "select atleast 1 interest";

    form.dispatch({ type: "SET_ERRORS", errors });

    if (Object.keys(errors).length == 0) {
      form.dispatch({ type: "NEXT" });
      form.dispatch({ type: "SET_COMPLETEDSTEPS", steps: [0, 1, 2] });
    }
  }
  function goBack() {
    form.dispatch({ type: "PREV" });
  }
  return (
    <form className="flex flex-col gap-4 p-4 border rounded w-80 mx-auto">
      <StepHeader
        title="Preferences"
        description="Pick a plan and tell us what you're interested in."
      />
      <label className="flex flex-col gap-1" htmlFor="plan">
        Plan
        <select
          className="border rounded p-1"
          value={form.state.data.prefs.plan}
          onChange={(e) =>
            form.dispatch({
              type: "UPDATE_FIELD",
              section: "prefs",
              field: "plan",
              value: e.target.value,
            })
          }
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
        {form.state.errors.plan && (
          <span className="text-red-500 text-sm">{form.state.errors.plan}</span>
        )}
      </label>

      <label className="flex items-center gap-2" htmlFor="newsLetter">
        <input
          type="checkbox"
          checked={form.state.data.prefs.newsletter}
          onChange={(e) =>
            form.dispatch({
              type: "UPDATE_FIELD",
              section: "prefs",
              field: "newsletter",
              value: e.target.value,
            })
          }
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
              checked={form.state.data.prefs.interests.includes(interest)}
              onChange={() => form.dispatch({ type: "TOGGLE_INTEREST", interest })}
            />
            {interest}
          </label>
        ))}
        {form.state.errors.interests && (
          <span className="text-red-500 text-sm">{form.state.errors.interests}</span>
        )}
      </fieldset>
      <div className="flex justify-between gap-2 flex-wrap">
        <button type="button" onClick={goBack}>
          Prev
        </button>
        <button type="submit" onClick={submit}>
          Submit & Review
        </button>
      </div>
    </form>
  );
}
