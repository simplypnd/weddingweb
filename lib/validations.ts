import { z } from "zod";

export const rsvpSchema = z.object({
  full_name: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  email: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : val),
    z.string().email("Please enter a valid email").optional(),
  ),
  attending: z.boolean(),
  guest_count: z.coerce.number().int().min(0).max(10),
  dietary_notes: z.string().max(500).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
