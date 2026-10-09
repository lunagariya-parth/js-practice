type TStepHeaderProps = { title: string; description: string };

export default function StepHeader({ title, description }: TStepHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
