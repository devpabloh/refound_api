import { Router } from "express";

import { RefoundsController } from "@/controllers/refound-controller";

import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refoundsRoutes = Router()

const refoundsController = new RefoundsController()

refoundsRoutes.post("/", verifyUserAuthorization(["employee"]), refoundsController.create)

export { refoundsRoutes }