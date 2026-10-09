import { useContext, type MouseEvent } from "react";
import StepHeader from "./StepHeader";
import { FormContext } from "./formContext";

export default function AddressStep() {
  const form = useContext(FormContext);
  function submit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (form) {
      const errors: Record<string, string> = {};

      if (form.state.data.address.street.trim() == "") errors.street = "street is required";
      if (form.state.data.address.city.trim() == "") errors.city = "city is required";
      if (form.state.data.address.postal.trim() == "") errors.postal = "postal code is required";
      if (form.state.data.address.country.trim() == "") errors.country = "country code is required";

      form.dispatch({ type: "SET_ERRORS", errors });

      if (Object.keys(errors).length == 0) {
        form.dispatch({ type: "NEXT" });
        form.dispatch({ type: "SET_COMPLETEDSTEPS", steps: [0, 1] });
      }
    }

    return;
  }
  function goBack() {
    form?.dispatch({ type: "PREV" });
  }
  return (
    <form className="flex flex-col gap-3 p-4 border rounded w-80 mx-auto">
      <StepHeader
        title="Address"
        description="Where should we send things? Enter your mailing address."
      />
      <label className="flex flex-col gap-1" htmlFor="street">
        Street
        <input
          className="border rounded p-1"
          value={form?.state.data.address.street}
          name="street"
          id="street"
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "address",
              field: "street",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.street && (
          <span className="text-red-500 text-sm">{form?.state.errors.street}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="city">
        City
        <input
          className="border rounded p-1"
          value={form?.state.data.address.city}
          id="city"
          name="city"
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "address",
              field: "city",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.city && (
          <span className="text-red-500 text-sm">{form?.state.errors.city}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="postalCode">
        Postal code
        <input
          className="border rounded p-1"
          value={form?.state.data.address.postal}
          id="postalCode"
          name="postalCode"
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "address",
              field: "postal",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.postal && (
          <span className="text-red-500 text-sm">{form?.state.errors.postal}</span>
        )}
      </label>

      <label className="flex flex-col gap-1" htmlFor="country">
        Country
        <input
          className="border rounded p-1"
          value={form?.state.data.address.country}
          id="country"
          name="country"
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "address",
              field: "country",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.country && (
          <span className="text-red-500 text-sm">{form?.state.errors.country}</span>
        )}
      </label>
      <div className="flex justify-between gap-2 flex-wrap">
        <button type="button" onClick={goBack}>
          Prev
        </button>
        <button type="submit" onClick={submit}>
          Save & Next
        </button>
      </div>
    </form>
  );
}
