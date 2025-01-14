import { z } from "zod"


export const AttestionSchema = z.object({
  email: z
    .string({
      required_error: "This field must be filled."
    })
    .email("This is a not a valid email."),

  name: z
    .string({
      required_error: "This field must be filled."
    }),
  yearOfPassing: z
    .number({
      required_error: "This field must be filled."
    }),
  recipient_wallet_id: z
    .string({
      required_error: "This field must be filled."
    })
})