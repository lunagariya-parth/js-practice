import { useContext } from "react";
import StepHeader from "../StepHeader";
import { FormContext } from "../formContext";

export default function PersonalStep() {
  const form = useContext(FormContext);

  function submit(formData: FormData) {
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    };

    for (const [field, value] of Object.entries(values)) {
      form?.dispatch({ type: "UPDATE_FIELD", section: "personal", field, value });
    }

    const errors: Record<string, string> = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.trim() === "") errors[key] = `${key} is required`;
    }
    form?.dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length === 0) form?.dispatch({ type: "NEXT" });
  }

  return (
    <form
      className="flex flex-col gap-3 rounded border w-80 mx-auto p-4"
      action={submit}
      noValidate
    >
      <StepHeader
        title="Personal details"
        description="Tell us who you are so we can set up your account."
      />
      <label className="flex flex-col gap-1">
        Name
        <input
          className="border rounded p-1"
          name="name"
          defaultValue={form?.state.data.personal.name}
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
          defaultValue={form?.state.data.personal.email}
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
          defaultValue={form?.state.data.personal.phone}
        />
        {form?.state.errors.phone && (
          <span className="text-red-500 text-sm">{form.state.errors.phone}</span>
        )}
      </label>

      <button type="submit" className="w-fit">
        Submit & next
      </button>
    </form>
  );
}
