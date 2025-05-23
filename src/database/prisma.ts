import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({
    log: ["query"], // isso faz com que os logs sejam mostrados no console
});

// Esta instância (prisma) será usada em toda a sua aplicação para fazer operações no banco de dados