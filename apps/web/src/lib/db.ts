import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "@/db/schema";

const client = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export const db = drizzle(client, { schema });
