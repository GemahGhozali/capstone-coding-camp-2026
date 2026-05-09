import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";

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

// Global Error Handler
app.use(errorMiddleware);

export default app;
