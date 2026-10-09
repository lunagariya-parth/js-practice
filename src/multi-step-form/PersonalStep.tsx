import { useContext, type MouseEvent } from "react";
import StepHeader from "./StepHeader";
import { FormContext } from "./formContext";

export default function PersonalStep() {
  const form = useContext(FormContext);
  console.log("rwnder");
  function submit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (form) {
      const errors: Record<string, string> = {};

      if (form.state.data.personal.name.trim() == "") errors.name = "name is required";
      if (form.state.data.personal.email.trim() == "") errors.email = "email is required";
      if (form.state.data.personal.phone.trim() == "") errors.phone = "phone is required";

      form.dispatch({ type: "SET_ERRORS", errors });

      if (Object.keys(errors).length == 0) {
        form.dispatch({ type: "NEXT" });
        form.dispatch({ type: "SET_COMPLETEDSTEPS", steps: [0] });
      }
    }

    return;
  }
  return (
    <form className="flex flex-col gap-3 rounded border w-80 mx-auto p-4" noValidate>
      <StepHeader
        title="Personal details"
        description="Tell us who you are so we can set up your account."
      />
      <label className="flex flex-col gap-1">
        Name
        <input
          className="border rounded p-1"
          name="name"
          value={form?.state.data.personal.name}
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "personal",
              field: "name",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.name && (
          <span className="text-red-500 text-sm">{form.state.errors.name}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          className="border rounded p-1"
          name="email"
          value={form?.state.data.personal.email}
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "personal",
              field: "email",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.email && (
          <span className="text-red-500 text-sm">{form.state.errors.email}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        Phone
        <input
          type="tel"
          className="border rounded p-1"
          name="phone"
          value={form?.state.data.personal.phone}
          onChange={(e) =>
            form?.dispatch({
              type: "UPDATE_FIELD",
              section: "personal",
              field: "phone",
              value: e.target.value,
            })
          }
        />
        {form?.state.errors.phone && (
          <span className="text-red-500 text-sm">{form.state.errors.phone}</span>
        )}
      </label>

      <button type="submit" className="w-fit" onClick={submit}>
        Submit & next
      </button>
    </form>
  );
}
