import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();
const prisma = new PrismaClient();

// ✅ إنشاء نوبة جديدة (محمية)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { guardName, date, startTime, endTime, location, phone } = req.body;
    const user = (req as any).user; // من التوكن

    if (!guardName || !date || !startTime || !endTime || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const shift = await prisma.shift.create({
      data: {
        guardName,
        date,
        startTime,
        endTime,
        location,
        phone,
        guardId: user.id, // ⬅️ يربط النوبة بصاحب الحساب
      },
    });

    res.json({ message: "Shift created successfully", shift });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create shift",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// ✅ عرض كل النوبات (بدون حماية)
router.get("/", async (_req, res) => {
  try {
    const shifts = await prisma.shift.findMany({
      include: { guard: { select: { id: true, name: true, email: true } } },
      orderBy: { id: "desc" },
    });
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shifts" });
  }
});

// ✅ تعديل نوبة (محمية – فقط مالك النوبة)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const existing = await prisma.shift.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Shift not found" });
    if (existing.guardId !== user.id)
      return res.status(403).json({ message: "You can only edit your own shifts" });

    const updated = await prisma.shift.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json({ message: "Shift updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update shift" });
  }
});

// ✅ حذف نوبة (محمية – فقط مالك النوبة)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const existing = await prisma.shift.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Shift not found" });
    if (existing.guardId !== user.id)
      return res.status(403).json({ message: "You can only delete your own shifts" });

    await prisma.shift.delete({ where: { id: Number(id) } });
    res.json({ message: "Shift deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete shift" });
  }
});

export default router;
