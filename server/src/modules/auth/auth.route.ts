import { Router } from "express";
import { registerSchema, loginSchema } from "./auth.schema";
import * as AuthController from "./auth.controller";
import validate from "../../middlewares/validate.middleware";
import authenticate from "../../middlewares/auth.middleware";

const authRouter = Router();

const REGISTER_FALLBACK_MESSAGE = "Gagal mendaftarkan akun pengguna baru!";
const LOGIN_FALLBACK_MESSAGE = "Pengguna gagal terautentikasi!";

authRouter.post("/register", validate(registerSchema, REGISTER_FALLBACK_MESSAGE), AuthController.register);
authRouter.post("/login", validate(loginSchema, LOGIN_FALLBACK_MESSAGE), AuthController.login);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/verify", authenticate, AuthController.verify);

export default authRouter;
