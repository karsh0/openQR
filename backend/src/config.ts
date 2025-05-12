import { PrismaClient } from './generated/prisma';

export const prismaClient = new PrismaClient()


declare global {
    namespace Express {
      interface Request {
        username: string
      }
    }
  }