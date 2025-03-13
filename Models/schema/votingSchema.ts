import { z } from "zod";

export const votingSchema = z.object({
  clgid: z.string({
    required_error: "This field must be filled.",
  }).min(9, {
    message: "Value is not acceptable",
  }).max(9, {
    message: "Value is not acceptable",
  }),
  passphrase: z.string({
    required_error: "This field must be filled.",
  }).min(2, {
    message: "Value is not acceptable",
  }),
});
