import { PrismaClient } from "@prisma/client";

declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

export const db = globalThis.prismaGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
