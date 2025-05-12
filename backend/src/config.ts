import { PrismaClient } from "@prisma/client"; 

export const prismaClient = new PrismaClient()


declare global {
    namespace Express {
      interface Request {
        username: string
      }
    }
  }