import { db } from "./src/db/index.ts";
import { products } from "./src/db/schema.ts";
import { ne } from "drizzle-orm";

async function main() {
  console.log("Updating sizes in database...");
  await db.update(products)
    .set({ sizes: ["S", "M", "L", "XL", "XXL", "3XL"] })
    .where(ne(products.categorySlug, "accessories"));
  console.log("Done.");
  process.exit(0);
}

main().catch(console.error);
