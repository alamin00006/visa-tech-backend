import { z } from 'zod'

export const createClientSubmissionZodSchema = z.object({
  body: z.object({
    id: z.string(),
    userId: z.string(),
    userName: z.string(),
    userType: z.enum(['client', 'admin']),

    startDate: z.string(),
    endDate: z.string(),

    personCount: z.number().min(1),

    portalUsername: z.string(),
    portalPassword: z.string(),

    securityQ1: z.string(),
    securityA1: z.string(),
    securityQ2: z.string(),
    securityA2: z.string(),
    securityQ3: z.string(),
    securityA3: z.string(),

    priority: z.enum(['regular', 'high']).optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
  }),
})
