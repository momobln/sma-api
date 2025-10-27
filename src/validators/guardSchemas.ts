import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
/*منع إدخال بيانات ناقصة أو غير صحيحة.
حماية السيرفر من إدخالات غير آمن
ضمان أن كل طلب يحتوي على الحقول الصحيحة قبل إنشاء المستخدم أو تسجيل دخوله*/