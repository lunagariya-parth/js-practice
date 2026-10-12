import { useState } from "react";
import StepHeader from "../StepHeader";
import useFormContext from "../formContext";

export default function PersonalStep() {
  const form = useFormContext();
  const [name, setName] = useState<string>(form.state.data.personal.name);
  const [email, setEmail] = useState<string>(form.state.data.personal.email);
  const [phone, setPhone] = useState<string>(form.state.data.personal.phone);

  function submit() {
    const values = {
      name: name,
      email: email,
      phone: phone,
    };

    const errors: Record<string, string> = {};
    for (const [field, value] of Object.entries(values)) {
      if (value.trim() === "") errors[field] = `${field} is required`;
    }

    form.dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length > 0) return;

    for (const [field, value] of Object.entries(values)) {
      form.dispatch({ type: "UPDATE_FIELD", section: "personal", field, value });
    }
    form.dispatch({ type: "NEXT" });
  }
  function onFieldChange(field: string, value: string) {
    const setters: Record<string, (v: string) => void> = {
      name: setName,
      email: setEmail,
      phone: setPhone,
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
          value={name}
          onChange={(e) => onFieldChange("name", e.target.value)}
        />
        {form.state.errors.name && (
          <span className="text-red-500 text-sm">{form.state.errors.name}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          className="border rounded p-1"
          name="email"
          value={email}
          onChange={(e) => onFieldChange("email", e.target.value)}
        />
        {form.state.errors.email && (
          <span className="text-red-500 text-sm">{form.state.errors.email}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        Phone
        <input
          type="tel"
          className="border rounded p-1"
          name="phone"
          value={phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
        />
        {form.state.errors.phone && (
          <span className="text-red-500 text-sm">{form.state.errors.phone}</span>
        )}
      </label>

      <button type="submit" className="w-fit">
        Submit & next
      </button>
    </form>
  );
}
