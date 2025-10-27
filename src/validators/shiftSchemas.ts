import { z } from "zod";
//الهدف: منع إنشاء نوبة ناقصة أو بقيم غير صحيحة.
export const shiftCreateSchema = z.object({
  title: z.string().min(2),
  date: z.string().datetime(),      // ISO 8601:يجعل التاريخ واضحًا، قابلًا للتحليل عالميًا، ولا يعتمد على لغة أو دولة
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  location: z.string().min(2),
  guardId: z.number().int().positive()
});

export const shiftUpdateSchema = shiftCreateSchema.partial();
/*.partial() تجعل كل الحقول اختيارية.
هذا مفيد في التعديل (PUT أو PATCH)، لأنك قد ترغب بتحديث حقل واحد فقط دون إرسال جميع الحقول.*/
