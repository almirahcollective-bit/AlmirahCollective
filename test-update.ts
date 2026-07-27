import { db } from "./src/db";
import { products } from "./src/db/schema";
import { eq } from "drizzle-orm";

async function run() {
  try {
    const res = await db.update(products).set({ categorySlug: "accessories" }).where(eq(products.id, 1)).returning();
    console.log("Success:", res);
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit();
}

run();
