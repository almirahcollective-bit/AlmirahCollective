import {db} from './src/db/index.ts';
import {products} from './src/db/schema.ts';
import {lte} from 'drizzle-orm';

async function run() {
  const p = await db.select({name: products.name, stock: products.stock, stockBySize: products.stockBySize}).from(products).where(lte(products.stock, 0));
  console.log(p);
  process.exit(0);
}

run();
