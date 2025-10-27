import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth";
import guardsRouter from "./routes/guards";
import shiftsRouter from "./routes/shifts";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));//فقط لتفادي تحذير TypeScript أو ESLint من “unused variable”.

app.use("/api/auth", authRouter);
app.use("/api/guards", guardsRouter);
app.use("/api/shifts", shiftsRouter);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
