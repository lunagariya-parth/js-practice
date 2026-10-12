import { useState } from "react";
import StepHeader from "../StepHeader";
import useFormContext from "../formContext";

export default function AddressStep() {
  const form = useFormContext();
  const [street, setStreet] = useState(form.state.data.address.street);
  const [city, setCity] = useState(form.state.data.address.city);
  const [postal, setPostal] = useState(form.state.data.address.postal);
  const [country, setCountry] = useState(form.state.data.address.country);
  function submit() {
    const values = {
      street,
      city,
      postal,
      country,
    };
    const errors: Record<string, string> = {};
    for (const [field, value] of Object.entries(values)) {
      if (value.trim() === "") errors[field] = `${field} is required`;
    }

    form.dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length > 0) return;
    for (const [field, value] of Object.entries(values)) {
      form.dispatch({ type: "UPDATE_FIELD", section: "address", field, value });
    }

    form.dispatch({ type: "NEXT" });
  }
  function goBack() {
    form.dispatch({ type: "PREV" });
  }
  function onFieldChange(field: string, value: string) {
    const setters: Record<string, (v: string) => void> = {
      street: setStreet,
      city: setCity,
      postal: setPostal,
      country: setCountry,
    };
    setters[field](value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [field]: _, ...rest } = form.state.errors;
    form.dispatch({
      type: "SET_ERRORS",
      errors: value.trim() == "" ? { ...rest, [field]: `${field} is required` } : rest,
    });
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
          value={street}
          onChange={(e) => onFieldChange("street", e.target.value)}
          name="street"
          id="street"
        />
        {form.state.errors.street && (
          <span className="text-red-500 text-sm">{form.state.errors.street}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="city">
        City
        <input
          className="border rounded p-1"
          value={city}
          id="city"
          name="city"
          onChange={(e) => onFieldChange("city", e.target.value)}
        />
        {form.state.errors.city && (
          <span className="text-red-500 text-sm">{form.state.errors.city}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="postalCode">
        Postal code
        <input
          className="border rounded p-1"
          value={postal}
          id="postalCode"
          name="postalCode"
          onChange={(e) => onFieldChange("postal", e.target.value)}
        />
        {form.state.errors.postal && (
          <span className="text-red-500 text-sm">{form.state.errors.postal}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="country">
        Country
        <input
          className="border rounded p-1"
          value={country}
          id="country"
          name="country"
          onChange={(e) => onFieldChange("country", e.target.value)}
        />
        {form.state.errors.country && (
          <span className="text-red-500 text-sm">{form.state.errors.country}</span>
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
