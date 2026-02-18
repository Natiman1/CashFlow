import { createDb } from "@repo/db";

export const db = createDb(process.env.DATABASE_URL!);

export * from "@repo/db";
