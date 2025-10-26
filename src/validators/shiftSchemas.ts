import { z } from "zod";

export const shiftCreateSchema = z.object({
  title: z.string().min(2),
  date: z.string().datetime(),      // ISO 8601
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  location: z.string().min(2),
  guardId: z.number().int().positive()
});

export const shiftUpdateSchema = shiftCreateSchema.partial();
