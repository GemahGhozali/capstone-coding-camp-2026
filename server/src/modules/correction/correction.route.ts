import { Router } from "express";
import * as CorrectionController from "./correction.controller";
import { correctionSchema } from "./correction.schema";
import validate from "../../middlewares/validate.middleware";
import authenticate from "../../middlewares/auth.middleware";

const correctionRouter = Router();

correctionRouter.use(authenticate);

const CREATE_CORRECTION_FALLBACK_MESSAGE = "Gagal melakukan koreksi!";
const UPDATE_CORRECTION_FALLBACK_MESSAGE = "Gagal memperbaharui hasil koreksi!";

correctionRouter.get("/", CorrectionController.getAllCorrections);
correctionRouter.get("/:id", CorrectionController.getCorrectionById);
correctionRouter.post("/", validate(correctionSchema, CREATE_CORRECTION_FALLBACK_MESSAGE), CorrectionController.createCorrection);
correctionRouter.put("/:id", validate(correctionSchema, UPDATE_CORRECTION_FALLBACK_MESSAGE), CorrectionController.updateCorrection);
correctionRouter.delete("/:id", CorrectionController.deleteCorrection);

export default correctionRouter;
