import { Request, Response } from "express";
import {z} from "zod";

import uploadConfig from "@/configs/upload"

class UploadsController{

    async create(request: Request, response:Response){
        try {
            const fileSchema = z.object({
                filename: z.string().min(1, {message: "O nome do arquivo é obrigatório"}),
                mimetype: z.string().refine((type)=>uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type), "Formato de arquivo inválido. Formatos permitidos: " + uploadConfig.ACCEPTED_IMAGE_TYPES),
                size: z.number().positive().refine((size) => size <= uploadConfig.MAX_FILE_SIZE, "O arquivo excede o tamanho máximo permitido de " + uploadConfig.MAX_SIZE)
            }).passthrough() // utilizado para que seja dado ênfase apenas para os campos que foram validados e deixe os outros passar

            const {file} = fileSchema.parse(request.file)

            response.json({message: "Ok"})
        } catch (error) {
            throw error
        }
    }
}

export {UploadsController}