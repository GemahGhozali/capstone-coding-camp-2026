import { Request, Response, NextFunction } from "express";
import { CorrectionInput } from "./correction.schema";
import * as CorrectionService from "./correction.service";
import { sendSuccessResponse } from "../../utils/response";

export async function getAllCorrections(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = res.locals.user.id;
    const corrections = await CorrectionService.getAllCorrections(userId);
    sendSuccessResponse(res, { status: 200, message: "Berhasil mendapatkan semua data koreksi", data: corrections });
  } catch (error) {
    next(error);
  }
}

export async function getCorrectionById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = res.locals.user.id;
    const correction = await CorrectionService.getCorrectionById(id, userId);
    sendSuccessResponse(res, { status: 200, message: "Berhasil mendapatkan detail data koreksi", data: correction });
  } catch (error) {
    next(error);
  }
}

export async function createCorrection(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = res.locals.user.id;
    const correction = await CorrectionService.createCorrection(userId, req.body as CorrectionInput);
    sendSuccessResponse(res, { status: 201, message: "Berhasil membuat koreksi baru", data: correction });
  } catch (error) {
    next(error);
  }
}

export async function updateCorrection(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = res.locals.user.id;
    const correction = await CorrectionService.updateCorrection(id, userId, req.body as CorrectionInput);
    sendSuccessResponse(res, { status: 200, message: "Berhasil memperbarui koreksi", data: correction });
  } catch (error) {
    next(error);
  }
}

export async function deleteCorrection(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = res.locals.user.id;
    await CorrectionService.deleteCorrection(id, userId);
    sendSuccessResponse(res, { status: 200, message: "Berhasil menghapus koreksi" });
  } catch (error) {
    next(error);
  }
}
