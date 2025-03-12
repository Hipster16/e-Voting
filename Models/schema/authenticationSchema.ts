import { z } from "zod";

export const authSchema = z.object({
  pin: z.string({
    required_error: "This field must be filled.",
  }).min(6, {
    message: "Value is not acceptable",
  }).max(6, {
    message: "Value is not acceptable"
  })
});
