import { z } from "zod";

export const ticketSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Invalid email").min(1, "Email is required"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
    dob: z
      .string()
      .min(1, "DOB is required")
      .refine((v) => new Date(v) <= new Date(), "DOB cannot be in the future"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    plan: z.enum(["free", "pro", "team"], { message: "Plan is required" }),
    teamSize: z.number().int().min(1, "Team size must be at least 1").optional(),
    members: z.array(
      z.object({
        name: z.string().trim().min(1, "Name is required"),
        email: z.string().min(1, "Email is required").email("Invalid email"),
      }),
    ),
    workshops: z.array(z.string()),
    tshirt: z.enum(["S", "M", "L", "XL"], { message: "T-shirt size is required" }),
    country: z.object({ value: z.string(), label: z.string() }).nullable(),
    bio: z.string().max(500, "Bio must be at most 500 characters"),
    hasDiet: z.boolean(),
    dietNotes: z.string().optional(),
    photo: z.instanceof(FileList).optional(),
    coupon: z.string().optional(),
    terms: z.boolean().refine((v) => v, "You must accept the terms"),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Start date cannot be after end date",
      });
    }
    if (data.plan === "team") {
      if (!data.teamSize) {
        ctx.addIssue({ code: "custom", path: ["teamSize"], message: "Team size is required" });
      } else if (data.members.length > data.teamSize) {
        ctx.addIssue({
          code: "custom",
          path: ["members"],
          message: "Members exceed team size",
        });
      }
    }
    if (!data.country) {
      ctx.addIssue({ code: "custom", path: ["country"], message: "Country is required" });
    }
  });

export type IFormFields = z.infer<typeof ticketSchema>;
