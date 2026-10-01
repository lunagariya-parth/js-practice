const Field = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">{children}</div>
);
export default function PageForForm() {
  type FormValues = {
    email: string;
    password: string;
    fav_language?: string; // missing if no radio is selected
    vehicle: string[];
    cars: string;
  };
  function handleSubmit(formData: FormData) {
    const data = {
      ...Object.fromEntries(formData),
      vehicle: formData.getAll("vehicle"),
    } as FormValues;
    // const email = formData.get("email"); //if direct use formData
    // const vehicals = formData.getAll("vehicle");
    const email = data.email;
    const password = data["password"];
    const fav_language = data.fav_language;
    const vehicals = data.vehicle;
    const carCompany = data.cars;
    console.log(email, password, fav_language, vehicals.join("-"), carCompany, data);
  }
  return (
    <form action={handleSubmit} className="flex flex-col gap-2 w-100 p-4 border rounded">
      <Field>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </Field>
      <Field>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
      </Field>
      <Field>
        <p>Please select your favorite Web language:</p>
        <div className="flex items-center gap-2">
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label htmlFor="html">HTML</label>
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label htmlFor="css">CSS</label>
          <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
          <label htmlFor="javascript">JavaScript</label>
        </div>
      </Field>
      <Field>
        <p>Please select your vehicales:</p>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="vehicle1" name="vehicle" value="Bike" />
          <label htmlFor="vehicle1"> I have a bike</label>
          <input type="checkbox" id="vehicle2" name="vehicle" value="Car" />
          <label htmlFor="vehicle2"> I have a car</label>
          <input type="checkbox" id="vehicle3" name="vehicle" value="Boat" />
          <label htmlFor="vehicle3"> I have a boat</label>
        </div>
      </Field>
      <Field>
        <label htmlFor="cars">Choose a car:</label>

        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </Field>
      <button type="submit">Submit</button>
    </form>
  );
}
