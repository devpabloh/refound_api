import { Request, Response } from "express";
import { prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { z} from "zod";

const categoriesEnum = z.enum([
    "food",
    "others",
    "services",
    "transport",
    "accomodation",
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

        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10)
        })

        const {name,page,  perPage} = querySchema.parse(request.query)

        /* Calculando o valor do skip */

        const skip = (page - 1) * perPage

        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
            where: {
                user: {
                    name: {
                        contains: name.trim()
                    }
                }
            },
            orderBy:{createdAt: "desc"},
            include: {
                user: true
            }
        })

        // Obter o total de registros para calcular o número de páginas.
        const totalRecords = await prisma.refunds.count({
            where: {
                user:{
                    name:{
                        contains: name.trim()
                    }
                }
            }
        })

        const totalPages = Math.ceil(totalRecords / perPage)

        response.status(200).json({refunds, pagination: {page, perPage, totalRecords, totalPages: totalPages > 0 ? totalPages: 1}})
    }
}

export {RefoundsController}