import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { JWTTokenInvalidError, JWTTokenExpiredError } from "../utils/error";

export default function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) throw new JWTTokenInvalidError("Access token tidak ditemukan");

    const { id, username, email } = verifyAccessToken(accessToken);
    res.locals.user = { id, username, email };
    next();
  } catch (error: unknown) {
    // Invalid Access Token
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new JWTTokenExpiredError("Access token tidak valid!"));
    }

    // Expired Access Token
    if (error instanceof jwt.TokenExpiredError) {
      return next(new JWTTokenExpiredError("Access token sudah kadaluwarsa!"));
    }

    next(error);
  }
}
