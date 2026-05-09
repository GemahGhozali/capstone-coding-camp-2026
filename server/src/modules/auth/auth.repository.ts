import prisma from "../../libs/prisma";
import { RegisterInput } from "./auth.schema";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data: RegisterInput) {
  return prisma.user.create({ data });
}

export async function createRefreshToken(userId: string, token: string) {
  return prisma.refreshToken.create({ data: { userId, token } });
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({ where: { token } });
}

export async function deleteRefreshToken(token: string) {
  return prisma.refreshToken.delete({ where: { token } });
}
