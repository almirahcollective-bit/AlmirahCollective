import {db} from './src/db/index.ts';
import {products} from './src/db/schema.ts';

async function run() {
  const all = await db.select({name: products.name, stock: products.stock}).from(products);
  const stockCounts = {};
  for (const p of all) {
    stockCounts[p.stock] = (stockCounts[p.stock] || 0) + 1;
  }
  console.log("Stock distribution:", stockCounts);
  process.exit(0);
}

run();
