import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // log: ["query"],  <-- remover essa linha retorna no console querys ocorrendo em real time
});
