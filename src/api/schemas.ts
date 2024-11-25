import { z } from 'zod';

export const jobDataSchema = z.object({
  Code: z.string(),
  Title: z.string(),
  Definitions: z.string().optional(),
  Industry: z.string().optional(),
  AltTitles: z.string().optional(),
  SVPNum: z.number().optional(),
  Strength: z.string().optional(),
  GOE: z.string().optional(),
  // Add other fields as needed
});