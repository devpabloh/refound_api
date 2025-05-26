import { Request, Response } from "express";

class RefoundsController {

    async create(request: Request, response: Response){
        

        response.json({message: "criada!"})
    }
}

export {RefoundsController}