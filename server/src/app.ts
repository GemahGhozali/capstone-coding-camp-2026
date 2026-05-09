import { NotFoundError } from "./utils/error";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./modules/auth/auth.route";
import correctionRouter from "./modules/correction/correction.route";

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Entry Point
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "EssayGrader RESTful API 🚀" });
});

// Routers
app.use("/auth", authRouter);
app.use("/corrections", correctionRouter);

// 404 Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError(`Endpoint ${req.method} ${req.path} tidak ditemukan!`));
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
