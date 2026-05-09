import { z } from "zod";

export const registerSchema = z.object({
  username: z.string("Username wajib diisi!").min(3, "Username minimal 3 karakter"),
  email: z.string("Email wajib diisi!").email("Format email tidak valid"),
  password: z.string("Password wajib diisi").min(8, "Password minimal 8 karakter"),
});

export const loginSchema = z.object({
  email: z.string("Email wajib diisi!").email("Format email tidak valid"),
  password: z.string("Password wajib diisi!"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
