import { useContext } from "react";
import StepHeader from "../StepHeader";
import { FormContext } from "../formContext";

export default function AddressStep() {
  const form = useContext(FormContext);
  function submit(formData: FormData) {
    const values = {
      street: String(formData.get("street") ?? ""),
      city: String(formData.get("city") ?? ""),
      postal: String(formData.get("postalCode") ?? ""),
      country: String(formData.get("country") ?? ""),
    };

    for (const [field, value] of Object.entries(values)) {
      form?.dispatch({ type: "UPDATE_FIELD", section: "address", field, value });
    }
    const errors: Record<string, string> = {};
    for (const [field, value] of Object.entries(values)) {
      if (value.trim() == "") errors[field] = `${field} is required`;
    }
    form?.dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length === 0) form?.dispatch({ type: "NEXT" });
  }
  function goBack() {
    form?.dispatch({ type: "PREV" });
  }
  return (
    <form className="flex flex-col gap-3 p-4 border rounded w-80 mx-auto" action={submit}>
      <StepHeader
        title="Address"
        description="Where should we send things? Enter your mailing address."
      />
      <label className="flex flex-col gap-1" htmlFor="street">
        Street
        <input
          className="border rounded p-1"
          defaultValue={form?.state.data.address.street}
          name="street"
          id="street"
        />
        {form?.state.errors.street && (
          <span className="text-red-500 text-sm">{form?.state.errors.street}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="city">
        City
        <input
          className="border rounded p-1"
          defaultValue={form?.state.data.address.city}
          id="city"
          name="city"
        />
        {form?.state.errors.city && (
          <span className="text-red-500 text-sm">{form?.state.errors.city}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="postalCode">
        Postal code
        <input
          className="border rounded p-1"
          defaultValue={form?.state.data.address.postal}
          id="postalCode"
          name="postalCode"
        />
        {form?.state.errors.postal && (
          <span className="text-red-500 text-sm">{form?.state.errors.postal}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="country">
        Country
        <input
          className="border rounded p-1"
          defaultValue={form?.state.data.address.country}
          id="country"
          name="country"
        />
        {form?.state.errors.country && (
          <span className="text-red-500 text-sm">{form?.state.errors.country}</span>
        )}
      </label>
      <div className="flex justify-between gap-2 flex-wrap">
        <button type="button" onClick={goBack}>
          Prev
        </button>
        <button type="submit">Save & Next</button>
      </div>
    </form>
  );
}
