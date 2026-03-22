import { z } from 'zod';

export const JoinWaitlistDto = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { error: 'Email is required' })
      .pipe(z.email({ error: 'Please provide a valid email address' })),
    userName: z.string().optional(),
    middleName: z.string().optional(),
  })
  .refine(
    (data) => {
      return [data.middleName, data.userName].every(
        (field) => !field || field.trim() === '',
      );
    },
    {
      message: 'invalid request',
    },
  );

export type JoinWaitlistDto = z.infer<typeof JoinWaitlistDto>;
