import { Request, Response, NextFunction } from "express";
import { ClientError } from "../utils/error";
import { sendErrorResponse } from "../utils/response";

export default function errorMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
  console.log(error);

  // Client Error
  if (error instanceof ClientError) return sendErrorResponse(res, error);

  // Server Error
  sendErrorResponse(res, {
    status: 500,
    message: "Terjadi kesalahan pada server. Silahkan coba lagi nanti!",
    code: "INTERNAL_SERVER_ERROR",
  });
}
