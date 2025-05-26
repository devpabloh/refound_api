import { Request, Response } from "express";
import {string, z} from "zod";

const categoriesEnum = z.enum([
    "food",
    "others",
    "services",
    "transport",
    "accommodation"
])

class RefoundsController {

    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2, {message:"Informe o nome da solicitação"}),
            category: categoriesEnum,
            amount: z.number().positive({message: "O valor precisa ser positivo"}),
            fileName: z.string()
        })

        const {name, category, amount, fileName} = bodySchema.parse(request.body)

        response.json({message: "criada!"})
    }
}

export {RefoundsController}