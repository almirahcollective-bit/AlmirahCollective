import { db } from "@/db";
import { products } from "@/db/schema";
import { BRAND } from "@/lib/catalog";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const allProducts = await db.select().from(products);

  const baseUrl = "https://almirahcollective.in";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${BRAND.name}</title>
    <link>${baseUrl}</link>
    <description>${BRAND.tagline}</description>
`;

  allProducts.forEach((product) => {
    // Escape special characters for XML
    const escapeXml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    };

    const link = `${baseUrl}/product/${product.slug}`;
    const imageLink = product.images?.[0] || "";
    const condition = "new";
    const availability = product.isOutOfStock ? "out of stock" : "in stock";
    const price = `${product.price} INR`;

    xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description || product.name)}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:condition>${condition}</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:brand>${escapeXml(BRAND.name)}</g:brand>
      <g:product_type>${escapeXml(product.categorySlug || "Apparel")}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
    </item>\n`;
  });

  xml += `  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
