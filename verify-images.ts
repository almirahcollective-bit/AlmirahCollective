import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Testing connection...");
  const { data: products, error: dbError } = await supabase.from("products").select("images");
  if (dbError) {
    console.error("Database connection error:", dbError);
    return;
  }
  console.log(`Successfully connected to DB. Found ${products.length} products.`);
  
  const dbImages = new Set<string>();
  products.forEach(p => {
    const imgs = typeof p.images === "string" ? JSON.parse(p.images) : p.images;
    if (Array.isArray(imgs)) imgs.forEach((url: string) => dbImages.add(url));
  });
  console.log(`Found ${dbImages.size} unique image URLs in the database.`);
  
  const { data: bucketFiles, error: bucketError } = await supabase.storage.from("product-images").list();
  if (bucketError) {
    console.error("Storage connection error:", bucketError);
    return;
  }
  console.log(`Successfully connected to Storage. Found ${bucketFiles.length} files in product-images bucket.`);
  
  let missingCount = 0;
  for (const url of dbImages) {
    const filename = url.split("/").pop();
    const exists = bucketFiles.some(f => f.name === filename);
    if (!exists) {
      console.log(`Missing in bucket: ${filename}`);
      missingCount++;
    }
  }
  console.log(`Check complete. ${missingCount} missing images.`);
}

main();