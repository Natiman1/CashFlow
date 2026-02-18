import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const createDb = (databaseUrl: string) => {
  const client = postgres(databaseUrl, {
    ssl: "require",
  });
  return drizzle(client, { schema });
};

export * from "./schema";
