import { Response } from "express";
import { ErrorFields } from "./error";

interface SuccessResponseOptions {
  status: number;
  message: string;
  data?: unknown;
}

interface ErrorResponseOptions {
  message: string;
  status: number;
  code: string;
  details?: ErrorFields | null;
}

export function sendSuccessResponse(res: Response, options: SuccessResponseOptions): void {
  const { status, message, data = null } = options;
  res.status(status).json({ success: true, message, data });
}

export function sendErrorResponse(res: Response, options: ErrorResponseOptions): void {
  const { status, message, code, details = null } = options;
  res.status(status).json({ success: false, message, error: { status, code, details } });
}
