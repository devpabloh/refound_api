import { Router } from "express";
import multer from "multer";

import uploadConfig from "@/configs/upload"

import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const uploadsRouter = Router()

const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRouter.use(verifyUserAuthorization(["employee"]))

uploadsRouter.post("/", upload.single("file"), uploadsController.create)

export {uploadsRouter}