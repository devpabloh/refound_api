import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import {ZodError} from "zod"


export const errorHandling: ErrorRequestHandler = (error, req, res, next)=>{

    // aqui nós estamos vendo se o erro é uma instância de AppError, ou seja, se o erro é um erro de aplicação um erro que nós criamos
    if(error instanceof AppError){
        res.status(error.statusCode).json({message: error.message})
        return
    }

    // Aqui nós estamos vendo se o erro é uma instância de zod, ou seja, se o erro é um erro de validação 
    if(error instanceof ZodError){
        res.status(400).json({message: "validation error", issues: error.format()})
        return
    }

    res.status(500).json({message: error.message})
    return
}