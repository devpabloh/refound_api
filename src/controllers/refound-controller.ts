import { Request, Response } from "express";
import { prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { z} from "zod";

const categoriesEnum = z.enum([
    "food",
    "others",
    "services",
    "transport",
    "accommodation",
])

class RefoundsController {

    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2, {message:"Informe o nome da solicitação"}),
            category: categoriesEnum,
            amount: z.number().positive({message: "O valor precisa ser positivo"}),
            fileName: z.string().min(20)
        })

        const {name, category, amount, fileName} = bodySchema.parse(request.body)

        if(!request.user?.id){
            throw new AppError("Usuário não autenticado", 401)
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                fileName,
                userId: request.user.id
            }
        })

        response.status(201).json(refund)
    }

    async index(request: Request, response: Response){

        response.status(200).json({message: "vendo todos"})
    }
}

export {RefoundsController}