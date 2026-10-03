type THeaderText = {
  title: string;
  subTitle: string;
};
export default function HeaderText({ title, subTitle }: THeaderText) {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-xl lg:text-4xl text-bold ">{title}</h1>
      <p className="text-base lg:text-lg">{subTitle}</p>
    </div>
  );
}
