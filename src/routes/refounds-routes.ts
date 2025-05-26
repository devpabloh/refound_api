import { Router } from "express";

import { RefoundsController } from "@/controllers/refound-controller";

const refoundsRoutes = Router()

const refoundsController = new RefoundsController()

refoundsRoutes.post("/", refoundsController.create)

export { refoundsRoutes }