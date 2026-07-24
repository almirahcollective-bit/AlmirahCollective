const fs = require('fs');
let content = fs.readFileSync('src/lib/catalog.ts', 'utf8');
let products = content.split('slug:');
let updatedCount = 0;
for (let i = 1; i < products.length; i++) {
  if (products[i].includes('categorySlug: "accessories"')) continue;
  if (!products[i].includes('sizes: [')) continue;
  const original = products[i];
  products[i] = products[i].replace(/sizes:\s*\[.*?\]/, 'sizes: ["S", "M", "L", "XL", "XXL", "3XL"]');
  if (original !== products[i]) updatedCount++;
}
fs.writeFileSync('src/lib/catalog.ts', products.join('slug:'));
console.log('Updated ' + updatedCount + ' products');
