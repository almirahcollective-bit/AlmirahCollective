import { db } from './src/db';
import { products } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function run() {
  await db.update(products).set({ categorySlug: 'accessories', sizes: ['Free Size'] }).where(eq(products.slug, 'cherry-red-roadster-sling-bag'));
  console.log('Updated db for bag!');
  process.exit(0);
}
run();
