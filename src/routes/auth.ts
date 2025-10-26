import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

// ✅ Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const guard = await prisma.guard.create({
      data: { name, email, password: hashed, phone },
    });
    res.json({ message: "User registered", guard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  try {
    const guard = await prisma.guard.findUnique({ where: { email } });
    console.log("Found guard:", guard);

    if (!guard) return res.status(400).json({ message: "User not found" });

    // ✅ المقارنة الصحيحة هنا
    const valid = await bcrypt.compare(password, guard.password);
    console.log("Password valid?", valid);

    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: guard.id, email: guard.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
