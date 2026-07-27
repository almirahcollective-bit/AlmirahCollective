async function run() {
  const res = await fetch("http://localhost:3000/api/admin/inventory/bulk", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "admin_token=authorized"
    },
    body: JSON.stringify({ updates: [{ id: 1, categorySlug: "accessories" }] })
  });
  console.log(res.status, await res.text());
}
run();
