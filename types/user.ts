import type { User as PrismaUser } from "@prisma/client";

export type User = PrismaUser;

export type SessionUser = Pick<User, "id" | "email" | "name">;
