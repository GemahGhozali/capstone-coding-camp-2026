import jwt from "jsonwebtoken";
import { RegisterInput, LoginInput } from "./auth.schema";
import { AuthPayload, AuthTokens } from "./auth.type";
import * as AuthRepository from "./auth.repository";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { ConflictError, JWTTokenInvalidError, JWTTokenExpiredError, InvalidCredentialsError } from "../../utils/error";

export async function registerNewAccount(data: RegisterInput): Promise<{ token: AuthTokens; user: AuthPayload }> {
  const existingUser = await AuthRepository.findUserByEmail(data.email);
  if (existingUser) throw new ConflictError("Email sudah terdaftar, silahkan coba email lain!");

  const hashedPassword = await hashPassword(data.password);
  const user = await AuthRepository.createUser({ ...data, password: hashedPassword });

  const payload = { id: user.id, username: user.username, email: user.email };
  const token = await createAccessAndRefreshToken(payload);

  return { token, user: payload };
}

export async function verifyUserCredentials(data: LoginInput): Promise<{ token: AuthTokens; user: AuthPayload }> {
  const user = await AuthRepository.findUserByEmail(data.email);
  if (!user) throw new InvalidCredentialsError("Email atau password salah!");

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) throw new InvalidCredentialsError("Email atau password salah!");

  const payload = { id: user.id, username: user.username, email: user.email };
  const token = await createAccessAndRefreshToken(payload);

  return { token, user: payload };
}

export async function invalidateRefreshToken(token: string): Promise<void> {
  const existingToken = await AuthRepository.findRefreshToken(token);
  if (!existingToken) throw new JWTTokenInvalidError("Refresh token tidak valid!");
  await AuthRepository.deleteRefreshToken(token);
}

export async function refreshTokens(token: string): Promise<AuthTokens> {
  let payload;

  try {
    payload = verifyRefreshToken(token);
  } catch (error) {
    // Expired Refresh Token
    if (error instanceof jwt.TokenExpiredError) {
      await AuthRepository.deleteRefreshToken(token);
      throw new JWTTokenExpiredError("Refresh token sudah kadaluwarsa!");
    }

    // Invalid Refresh Token
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTTokenInvalidError("Refresh token tidak valid!");
    }

    throw error;
  }

  const existingToken = await AuthRepository.findRefreshToken(token);
  if (!existingToken) throw new JWTTokenInvalidError("Refresh token tidak valid!");

  await AuthRepository.deleteRefreshToken(token);

  const { id, username, email } = payload;
  return createAccessAndRefreshToken({ id, username, email });
}

async function createAccessAndRefreshToken(payload: AuthPayload): Promise<AuthTokens> {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await AuthRepository.createRefreshToken(payload.id, refreshToken);

  return { accessToken, refreshToken };
}
