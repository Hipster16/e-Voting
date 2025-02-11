import { z } from "zod";

export const StudentSigninSchema = z.object({
  email: z
    .string({
      required_error: "This field must be filled.",
    })
    .email("This is a not a valid email."),

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
