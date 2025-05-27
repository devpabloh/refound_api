import {Router} from "express"

import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { refoundsRoutes } from "./refounds-routes"
import { uploadsRouter } from "./uploads-routes"

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

const routes = Router()

// Rotas públicas

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

/* Rotas privadas */
routes.use(ensureAuthenticated)
routes.use("/refound", refoundsRoutes)
routes.use("/uploads", uploadsRouter)

export {routes}