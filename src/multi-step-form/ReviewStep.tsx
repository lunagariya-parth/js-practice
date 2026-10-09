import { type ReactNode } from "react";
import StepHeader from "./StepHeader";
import useFormContext from "./formContext";

type TSectionProps = { title: string; children: ReactNode; onEdit: () => void };

function Section({ title, children, onEdit }: TSectionProps) {
  return (
    <section className="flex flex-col gap-2 border rounded p-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <button type="button" className="text-sm" onClick={onEdit}>
          Edit
        </button>
      </div>
      <dl className="flex flex-col gap-1 text-sm">{children}</dl>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right">{value || "-"}</dd>
    </div>
  );
}

export default function ReviewStep() {
  const form = useFormContext();
  const data = form.state.data;
  function reset() {
    if (form) {
      form.dispatch({ type: "RESET" });
      form.dispatch({ type: "GO_TO", step: 0 });
    }
    return;
  }
  function submit() {
    console.log("submitting");
    form.dispatch({ type: "SUBMIT_START" });
    if (!(Object.keys(form.state.errors).length == 0 && form.state.completedSteps.length == 3)) {
      form.dispatch({ type: "SUBMIT_FAIL", error: "form has error" });
      return;
    }

    form.dispatch({ type: "SUBMIT_SUCCESS" });
  }
  if (form.state.status == "success") return <p>your form submitted successfully</p>;
  return (
    <div className="flex flex-col gap-4 p-4 border rounded w-80 mx-auto">
      <StepHeader title="Review" description="Check your details before submitting." />

      <Section title="Personal details" onEdit={() => form.dispatch({ type: "GO_TO", step: 0 })}>
        <Row label="Name" value={data?.personal.name ?? ""} />
        <Row label="Email" value={data?.personal.email ?? ""} />
        <Row label="Phone" value={data?.personal.phone ?? ""} />
      </Section>

      <Section title="Address" onEdit={() => form.dispatch({ type: "GO_TO", step: 1 })}>
        <Row label="Street" value={data?.address.street ?? ""} />
        <Row label="City" value={data?.address.city ?? ""} />
        <Row label="Postal code" value={data?.address.postal ?? ""} />
        <Row label="Country" value={data?.address.country ?? ""} />
      </Section>

      <Section title="Preferences" onEdit={() => form.dispatch({ type: "GO_TO", step: 2 })}>
        <Row label="Plan" value={data?.prefs.plan ?? ""} />
        <Row label="Newsletter" value={data?.prefs.newsletter ? "Yes" : "No"} />
        <Row label="Interests" value={data?.prefs.interests.join(", ") ?? ""} />
      </Section>

      <div className="flex justify-between gap-2 flex-wrap">
        <button type="button" onClick={reset}>
          Reset form
        </button>
        <button type="button" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}
