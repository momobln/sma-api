import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/requireAuth";

const prisma = new PrismaClient();
const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  const guards = await prisma.guard.findMany({ select: { id: true, name: true, email: true, createdAt: true } });
  res.json(guards);
});   //هذا يحمي البيانات الحساسة مثل password

export default router;
