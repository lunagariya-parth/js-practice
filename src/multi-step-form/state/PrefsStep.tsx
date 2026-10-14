import { useState } from "react";
import StepHeader from "../StepHeader";
import useFormContext from "../formContext";

const PLANS = ["free", "pro", "team"] as const;
const INTERESTS = ["react", "typescript", "node", "design", "devops"];

export default function PrefsStep() {
  const form = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [plan, setPlan] = useState<(typeof PLANS)[number] | "">(form.state.data.prefs.plan);
  const [interests, setInterests] = useState<string[]>(form.state.data.prefs.interests);
  const [newsletter, setNewsletter] = useState<boolean>(form.state.data.prefs.newsletter);
  function submit() {
    form.dispatch({ type: "UPDATE_FIELD", section: "prefs", field: "plan", value: plan });
    form.dispatch({
      type: "UPDATE_FIELD",
      section: "prefs",
      field: "newsletter",
      value: newsletter,
    });
    form.dispatch({
      type: "UPDATE_FIELD",
      section: "prefs",
      field: "interests",
      value: interests as never,
    });

    const newErrors: Record<string, string> = {};
    if (!plan) newErrors.plan = "plan is required";
    if (interests.length === 0) newErrors.interests = "pick at least one interest";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) form.dispatch({ type: "NEXT" });
  }
  function onFieldChange(
    field: string,
    value: string | string[] | boolean | (typeof PLANS)[number] | "",
  ) {
    const setters = {
      plan: setPlan,
      interests: setInterests,
      newsletter: setNewsletter,
    } as Record<string, (v: typeof value) => void>;
    setters[field](value);
    if (
      errors[field] &&
      (typeof value === "string" ? value.trim() !== "" : Array.isArray(value) && value.length > 0)
    ) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }
  function goBack() {
    form.dispatch({ type: "PREV" });
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
          value={plan}
          onChange={(e) => onFieldChange("plan", e.target.value)}
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
        {errors.plan && <span className="text-red-500 text-sm">{errors.plan}</span>}
      </label>

      <label className="flex items-center gap-2" htmlFor="newsLetter">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => onFieldChange("newsletter", e.target.checked)}
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
              checked={interests.includes(interest)}
              onChange={(e) =>
                onFieldChange(
                  "interests",
                  e.target.checked
                    ? [...interests, interest]
                    : interests.filter((i) => i !== interest),
                )
              }
            />
            {interest}
          </label>
        ))}
        {errors.interests && <span className="text-red-500 text-sm">{errors.interests}</span>}
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
