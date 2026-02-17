import "dotenv/config";
import postgres from "postgres";

async function main() {
  const connectionString = process.env.DATABASE_URL!;
  const sql = postgres(connectionString, { max: 1 });

  try {
    console.log("Adding settings column if not exists...");
    await sql`
      ALTER TABLE "user" 
      ADD COLUMN IF NOT EXISTS "settings" jsonb DEFAULT '{"currency":"USD","language":"en","notifications":{"budgetAlerts":true,"monthlyReports":false}}'::jsonb;
    `;
    console.log("Column added or already exists.");
  } catch (error) {
    console.error("Error adding column:", error);
  } finally {
    await sql.end();
  }
}

main();
