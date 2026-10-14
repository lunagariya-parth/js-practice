import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ticketSchema, type IFormFields } from "./schema";
export type { IFormFields };
export default function TicketForm() {
  const plan = [
    { label: "Free", value: "free" },
    { label: "Pro", value: "pro" },
    { label: "Team", value: "team" },
  ];
  const workshops = ["React", "TypeScript", "Node.js", "Design Systems"];
  const tshirts = ["S", "M", "L", "XL"];
  const countries = [
    { value: "in", label: "India" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "au", label: "Australia" },
  ];
  const { control, handleSubmit, register, watch, getValues, trigger, } = useForm<IFormFields>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      startDate: "",
      endDate: "",
      members: [],
      workshops: [],
      country: null,

      bio: "",
      hasDiet: false,
      dietNotes: "",
      coupon: "",
      terms: false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "members",
    control,
  });
  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedPlan = watch("plan");
  const selectedWorkshop = watch("workshops");
  const teamSize = watch("teamSize");
  const appliedCoupon = watch("coupon");
  const hasDiet = watch("hasDiet");
  function formSubmit() {

  }
  function calculatePlan(plan: IFormFields["plan"], teamSize: number = 1) {
    if (plan === "pro") return 99;
    if (plan === "team") return 79 * teamSize;
    return 0;
  }
  function calculateWorkshop(
    workshops: IFormFields["workshops"],
    price: number = 25,
    teamSize: number = 1,
  ) {
    return workshops.length > 0 ? workshops.length * price * teamSize : 0;
  }
  function calculateDiscountedTotal(totalPrice: number, percentOff: number) {
    return totalPrice + Math.ceil(totalPrice * (1 - percentOff / 100)) / 10;
  }
  return (
    <div className="w-full max-w-180 flex gap-2 mx-auto">
      <div className="flex-1 w-full border rounded p-4">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-1">
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter phone"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="dob"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
                  <DatePicker
                    id="dob"
                    invalid={fieldState.invalid}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(d) => field.onChange(d ? d.toISOString() : "")}
                    placeholder="Pick date of birth"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="plan"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="plan">Plan</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {plan.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          {selectedPlan === "team" && (
            <>
              <FieldGroup>
                <Controller
                  name="teamSize"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="teamSize">Team size</FieldLabel>
                      <Input
                        id="teamSize"
                        type="number"
                        min={1}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                        }
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter team size"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Members</FieldLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Controller
                      name={`members.${index}.name`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Member Name"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`members.${index}.email`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            type="email"
                            aria-invalid={fieldState.invalid}
                            placeholder="Member Email"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Button variant="outline" onClick={() => remove(index)}>
                      delete
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  disabled={!teamSize || fields.length >= teamSize}
                  onClick={() => append({ name: "", email: "" })}
                >
                  Add member
                </Button>
              </FieldGroup>
            </>
          )}
          <FieldGroup>
            <Controller
              name="workshops"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Workshops</FieldLabel>
                  {workshops.map((w) => (
                    <label key={w} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={field.value.includes(w)}
                        onCheckedChange={(checked) =>
                          field.onChange(
                            checked ? [...field.value, w] : field.value.filter((v) => v !== w),
                          )
                        }
                      />
                      {w}
                    </label>
                  ))}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="tshirt"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tshirt">T-shirt size</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="tshirt">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {tshirts.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="country"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="country">Country</FieldLabel>
                  <Combobox items={countries} value={field.value} onValueChange={field.onChange}>
                    <ComboboxInput id="country" placeholder="Select country" />
                    <ComboboxContent>
                      <ComboboxEmpty>No country found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="bio"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>
                  <Textarea
                    {...field}
                    id="bio"
                    aria-invalid={fieldState.invalid}
                    placeholder="Tell us about yourself"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="hasDiet"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />I have dietary
                  requirements
                </label>
              )}
            />
          </FieldGroup>
          {hasDiet && (
            <FieldGroup>
              <Controller
                name="dietNotes"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="dietNotes">Diet notes</FieldLabel>
                    <Textarea {...field} id="dietNotes" placeholder="Allergies, preferences..." />
                  </Field>
                )}
              />
            </FieldGroup>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="photo">Photo</FieldLabel>
              <Input id="photo" type="file" accept="image/*" {...register("photo")} />
            </Field>
          </FieldGroup>
          <div className="flex gap-2">
            <FieldGroup>
              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="startDate">Start date</FieldLabel>
                    <DatePicker
                      id="startDate"
                      invalid={fieldState.invalid}
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(d) => {
                        field.onChange(d ? d.toISOString() : "");
                        if (getValues("endDate")) trigger("endDate");
                      }}
                      placeholder="Pick start date"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="endDate"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="endDate">End date</FieldLabel>
                    <DatePicker
                      id="endDate"
                      invalid={fieldState.invalid}
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(d) => field.onChange(d ? d.toISOString() : "")}
                      placeholder="Pick end date"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <FieldGroup>
            <Controller
              name="coupon"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="coupon">Coupon</FieldLabel>
                  <Input {...field} id="coupon" placeholder="Enter coupon code" />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="terms"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />I accept the
                    terms and conditions
                  </label>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="w-60 border rounded p-4 shrink-0 sticky top-4 h-fit">
        <h2 className="mb-4">Summary</h2>
        <div className="flex flex-col gap-2">
          {selectedPlan && (
            <div className="flex items-center gap-2 justify-between">
              <p>Plan</p>
              <p>{calculatePlan(selectedPlan, teamSize)}</p>
            </div>
          )}
          {selectedWorkshop && (
            <div className="flex items-center gap-2 justify-between">
              <p>Workshop</p>
              <p>{calculateWorkshop(selectedWorkshop, 25, teamSize)}</p>
            </div>
          )}
          {appliedCoupon === "REACT10" && (
            <div className="flex items-center gap-2 justify-between">
              <p>Discount</p>
              <p>{appliedCoupon === "REACT10" && "-10%"}</p>
            </div>
          )}
          <div className="h-px w-full bg-black"></div>
          <p className="text-right">
            {appliedCoupon === "REACT10"
              ? calculateDiscountedTotal(
                  calculateWorkshop(selectedWorkshop, 25, teamSize) +
                    calculatePlan(selectedPlan, teamSize),
                  10,
                )
              : calculateWorkshop(selectedWorkshop, 25, teamSize) +
                calculatePlan(selectedPlan, teamSize)}
          </p>
        </div>
      </div>
    </div>
  );
}
