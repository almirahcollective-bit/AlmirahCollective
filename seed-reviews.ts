import { db } from "./src/db/index";
import { reviews, products } from "./src/db/schema";

async function run() {
  try {
    const allProducts = await db.select().from(products).limit(5);
    
    if (allProducts.length === 0) {
      console.log("No products found to add reviews to.");
      process.exit(0);
    }
    
    const p1 = allProducts[0];
    const p2 = allProducts[1];
    
    await db.insert(reviews).values([
      {
        productId: p1.id,
        customerName: "Riya K.",
        rating: 5,
        title: "Exactly as curated",
        body: "Beautiful piece, true to photos, and packed so thoughtfully from Bengaluru.",
        isVerified: true,
        isApproved: true
      },
      {
        productId: p1.id,
        customerName: "Neha S.",
        rating: 5,
        title: "Worth the find",
        body: "Love that Almirah handpicks brands — quality feels genuine and styling is easy.",
        photoUrl: p1.images[1] ?? p1.images[0],
        isVerified: true,
        isApproved: true
      },
      {
        productId: p2.id,
        customerName: "Priya M.",
        rating: 4,
        title: "Great quality",
        body: "The material is very comfortable and fits nicely.",
        isVerified: true,
        isApproved: true
      }
    ]);
    
    console.log("Reviews seeded successfully!");
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}

run();
