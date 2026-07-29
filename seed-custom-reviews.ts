import { db } from './src/db';
import { products, reviews } from './src/db/schema';

const customReviews = [
  { customerName: 'Priya Sharma', rating: 5, title: 'Amazing quality!', body: 'The fabric is so soft and comfortable. Ye sach mein bahut premium lagta hai. Worth every rupee!', isApproved: true },
  { customerName: 'Rohan Desai', rating: 4, title: 'Good fit', body: 'Fit is perfect. Delivery thodi late thi but product top class hai.', isApproved: true },
  { customerName: 'Sneha Patel', rating: 5, title: 'Beautiful design', body: 'Exactly as shown in the pictures. Maine pehli baar order kiya and I am so happy with the purchase.', isApproved: true },
  { customerName: 'Aditi Singh', rating: 5, title: 'Must buy', body: 'Kapda bahut accha hai, aur stitching bhi proper hai. Will definitely buy more.', isApproved: true },
  { customerName: 'Vikram Reddy', rating: 5, title: 'Value for money', body: 'I gifted this to my sister and she absolutely loved it. Premium packaging too.', isApproved: true },
  { customerName: 'Neha Gupta', rating: 4, title: 'Nice collection', body: 'Very elegant piece. The color didn\'t fade after washing. Ekdum best hai.', isApproved: true },
  { customerName: 'Arjun Nair', rating: 5, title: 'Superb', body: 'Material quality bahut sahi hai. Feels like a proper luxury brand.', isApproved: true },
  { customerName: 'Kritika Verma', rating: 5, title: 'Love it', body: 'Gorgeous! The embroidery is flawless. Sab pooch rahe the kahan se liya.', isApproved: true }
];

async function seed() {
  console.log('Seeding custom Indian reviews...');
  
  const allProducts = await db.select({id: products.id}).from(products).limit(8);
  if (allProducts.length === 0) {
    console.log('No products found to attach reviews to.');
    process.exit(1);
  }
  
  const reviewsToInsert = customReviews.map((r, i) => ({
    ...r,
    productId: allProducts[i % allProducts.length].id
  }));
  
  await db.insert(reviews).values(reviewsToInsert);
  console.log('Done!');
  process.exit(0);
}
seed();
