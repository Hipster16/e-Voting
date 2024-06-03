import { z } from 'zod'

export const formSchema = z.object({
    ElectionName: z.string().min(4, {
      message: "The election tittle is too small.",
    }),
    ElectionDescription: z.string(),
    EndDate: z.date({
      required_error: "An End Date is required.",
    }),
    Acknowledgement: z.boolean({
      required_error: "It is a mandatory field"
    })
  }).refine(data => data.Acknowledgement == true, {
    message: 'Confirm Acknolegdement',
    path: ['Acknowledgement']
  })