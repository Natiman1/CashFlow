import "dotenv/config";
import { db } from "../src/lib/db";
import { transactions, categories } from "../src/lib/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const USER_ID = "WWadReLdkwTUuO15IoOepBKQNFMKFY11";

async function seed() {
  console.log(`Fetching categories for user ${USER_ID}...`);
  const userCategories = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, USER_ID));

  if (userCategories.length === 0) {
    console.error(
      "No categories found for this user. Please add categories first.",
    );
    process.exit(1);
  }

  console.log(`Found ${userCategories.length} categories.`);

  const newTransactions: (typeof transactions.$inferInsert)[] = [];
  const today = new Date();

  // Loop back 12 months
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const daysInMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0,
    ).getDate();

    // Generate 15-40 transactions per month
    const numTransactions = Math.floor(Math.random() * 25) + 15;

    for (let j = 0; j < numTransactions; j++) {
      const category =
        userCategories[Math.floor(Math.random() * userCategories.length)];

      // Amount between 10 and 500
      const positiveAmount = (Math.random() * 490 + 10).toFixed(2);
      const amount =
        category.type === "expense"
          ? (-Math.abs(parseFloat(positiveAmount))).toString()
          : positiveAmount;

      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);

      newTransactions.push({
        id: randomUUID(),
        userId: USER_ID,
        categoryId: category.id,
        description: `Sample ${category.name} transaction`,
        amount: amount,
        date: date,
      });
    }
  }

  console.log(`Inserting ${newTransactions.length} transactions...`);

  // Insert in batches of 100 to avoid query size limits
  const batchSize = 100;
  for (let i = 0; i < newTransactions.length; i += batchSize) {
    const batch = newTransactions.slice(i, i + batchSize);
    await db.insert(transactions).values(batch);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
