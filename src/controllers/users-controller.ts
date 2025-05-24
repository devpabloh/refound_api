import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import {z} from "zod"

class UsersController {
    async create (request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(3, {message: "Nome é obrigatório"}),
            email: z.string().trim().email({message: "E-mail inválido"}).toLowerCase(),
            password: z.string().min(6, {message: "A senha deve ter ao menos 6 caracteres"}),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        })

        const {name, email, password, role} = bodySchema.parse(request.body)

        return response.json({name, email, password, role})
    }
}

export {UsersController}