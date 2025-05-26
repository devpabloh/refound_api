import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";

import { AppError } from "@/utils/AppError";

interface tokenPayload{
    role: string;
    sub: string;
}

function ensureAuthenticated (request: Request, response: Response, next: NextFunction){
    try {
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new AppError("JWT token not found", 401);
        }

        // essa é a forma que o token chega -> bearer 65444546dasdaseb6548abadsad16
        const [, token] = authHeader.split(" ")

        const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as tokenPayload

        // Aqui estamos inserindo em todas as requisições os dados do usuário, que são o ID e a role que contém o token e a chave secreta 
        request.user = {
            id: user_id,
            role
        }

        // o return next serve para que se estiver tudo certo, ele siga para a próxima etapa
        return next()
    } catch (error) {
        throw new AppError("Invalid JWT token", 401)
    }
}

export {ensureAuthenticated}