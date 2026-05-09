import { COOKIE_OPTIONS } from "../../configs/cookies";
import { Request, Response, NextFunction } from "express";
import { RegisterInput, LoginInput } from "./auth.schema";
import * as AuthService from "./auth.service";
import { sendSuccessResponse } from "../../utils/response";
import { JWTTokenInvalidError } from "../../utils/error";

const REFRESH_TOKEN_COOKIE = "refreshToken";

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const {
      token: { accessToken, refreshToken },
      user,
    } = await AuthService.registerNewAccount(req.body as RegisterInput);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);

    sendSuccessResponse(res, { status: 201, message: "Registrasi berhasil!", data: { accessToken, user } });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const {
      token: { accessToken, refreshToken },
      user,
    } = await AuthService.verifyUserCredentials(req.body as LoginInput);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);

    sendSuccessResponse(res, { status: 200, message: "Login berhasil!", data: { accessToken, user } });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies[REFRESH_TOKEN_COOKIE];
    if (!token) throw new JWTTokenInvalidError("Refresh token tidak valid!");

    await AuthService.invalidateRefreshToken(token);

    res.clearCookie(REFRESH_TOKEN_COOKIE);

    sendSuccessResponse(res, { status: 200, message: "Logout berhasil!" });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies[REFRESH_TOKEN_COOKIE];
    if (!token) throw new JWTTokenInvalidError("Refresh token tidak valid!");

    const { accessToken, refreshToken } = await AuthService.refreshTokens(token);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);

    sendSuccessResponse(res, { status: 200, message: "Token berhasil diperbaharui", data: { accessToken } });
  } catch (error) {
    next(error);
  }
}

export async function verify(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = res.locals.user;
    sendSuccessResponse(res, { status: 200, message: "Anda telah terautentikasi!", data: user });
  } catch (error) {
    next(error);
  }
}
