import { db } from './src/db';
import { products, reviews } from './src/db/schema';

const customReviews = [
  { customerName: 'Rohan Mohammed', rating: 5, title: 'Exactly what I was looking for!', body: 'Ordered the Goofy oversized tee and it came really well packaged. The fabric is soft and the fit is perfect — true to size. Loved that it was an actual branded piece and not some random find. Will definitely be ordering again from Almirah Collective!', isApproved: true },
  { customerName: 'Priya Sharma', rating: 5, title: 'Amazing quality!', body: 'The fabric is so soft and comfortable. Ye sach mein bahut premium lagta hai. Worth every rupee!', isApproved: true },
  { customerName: 'Faiqa Saba', rating: 5, title: 'Stunning dress — great quality', body: 'Received the broderie midi dress and I\'m so happy with it. The embroidery detail is beautiful and the fabric feels premium. Packaging was neat and delivery was quick. Really impressed with the curation on this store — everything feels handpicked.', isApproved: true },
  { customerName: 'Rohan Desai', rating: 4, title: 'Good fit', body: 'Fit is perfect. Delivery thodi late thi but product top class hai.', isApproved: true },
  { customerName: 'Sabah', rating: 5, title: null, body: 'Absolutely loved my experience with Almirah Collective! The collection is stylish, elegant, and has such a beautiful variety of designs. The quality of the fabric, finishing, and attention to detail really stood out. Each piece feels thoughtfully curated and easy to wear.\nThe overall shopping experience was smooth, and the outfits are perfect for anyone who loves classy, comfortable, and trendy fashion. Definitely a place I’ll keep coming back to!', isApproved: true },
  { customerName: 'Sneha Patel', rating: 5, title: 'Beautiful design', body: 'Exactly as shown in the pictures. Maine pehli baar order kiya and I am so happy with the purchase.', isApproved: true },
  { customerName: 'Hifsa', rating: 5, title: null, body: 'I am absolutely thrilled with this gorgeous piece from Almirah Collective.\nThe deep plum hue is stunningly rich, making it an instant standout for any wardrobe. What really steals the show is the central embroidery; the intricate gold and silver threadwork mixed with subtle sequins adds the perfect touch of festive shimmer.\nEven the small details, like the polished decorative buttons and the sweet, handwritten thank-you note, show how much care goes into their items. The fabric looks beautifully textured, premium, and breathable. It strikes the ultimate balance between traditional elegance and modern grace—highly recommended!', isApproved: true },
  { customerName: 'Aditi Singh', rating: 5, title: 'Must buy', body: 'Kapda bahut accha hai, aur stitching bhi proper hai. Will definitely buy more.', isApproved: true },
  { customerName: 'Vikram Reddy', rating: 5, title: 'Value for money', body: 'I gifted this to my sister and she absolutely loved it. Premium packaging too.', isApproved: true },
  { customerName: 'Neha Gupta', rating: 4, title: 'Nice collection', body: 'Very elegant piece. The color didn\'t fade after washing. Ekdum best hai.', isApproved: true },
  { customerName: 'Arjun Nair', rating: 5, title: 'Superb', body: 'Material quality bahut sahi hai. Feels like a proper luxury brand.', isApproved: true },
  { customerName: 'Kritika Verma', rating: 5, title: 'Love it', body: 'Gorgeous! The embroidery is flawless. Sab pooch rahe the kahan se liya.', isApproved: true }
];

async function seed() {
  console.log('Seeding custom Indian reviews...');
  
  const allProducts = await db.select({id: products.id}).from(products).limit(12);
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
