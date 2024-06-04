import { z } from "zod"


export const loginSchema = z.object({
    email: z
    .string({ 
      required_error: "This field must be filled."
    })
    .email("This is a not a valid email."),

    password: z
    .string({
      required_error: "This is a required field"
    })
    .min(6,
      {
        message: 'The password must be of atleast 6 characters'
      }
    )
})