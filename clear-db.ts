import { db } from "./src/db";
import {
  orders,
  complaints,
  reviews,
  leads,
  cartItems,
  wishlistItems,
  addresses,
  customers,
} from "./src/db/schema";
import { sql } from "drizzle-orm";

async function clearDB() {
  console.log("Starting DB clear...");
  try {
    // Truncate all non-product tables. CASCADE handles foreign keys.
    await db.execute(sql`TRUNCATE TABLE orders CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE complaints CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE reviews CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE leads CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE cart_items CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE wishlist_items CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE addresses CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE customers CASCADE;`);

    console.log("Successfully cleared all customer and order data.");
    process.exit(0);
  } catch (err) {
    console.error("Error clearing DB:", err);
    process.exit(1);
  }
}

clearDB();
