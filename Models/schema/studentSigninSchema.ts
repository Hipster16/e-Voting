import { z } from "zod";

export const StudentSigninSchema = z.object({
  email: z
    .string({
      required_error: "This field must be filled.",
    })
    .email("This is not a valid email.")
    .refine((email) => email.endsWith("@mbcet.ac.in"), {
      message: "Only emails from mbcet.ac.in are allowed.",
    }),

  name: z.string({
    required_error: "This field must be filled.",
  }),
  passphrase: z.string({
    required_error: "This field must be filled.",
  }),
  college_id: z.string({
    required_error: "This field must be filled.",
  }),
});
