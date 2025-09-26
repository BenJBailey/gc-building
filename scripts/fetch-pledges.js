// scripts/fetch.js
import fs from "fs";
import fetch from "node-fetch"; // node18+ has fetch built-in, but this works too

const API_URL = `https://api.planningcenteronline.com/giving/v2/pledge_campaigns/${process.env.PCO_CAMPAIGN_ID}`;

async function main() {
  const credentials = Buffer.from(
    `${process.env.PCO_CLIENT_ID}:${process.env.PCO_CLIENT_SECRET}`
  ).toString("base64");
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
  if (!res.ok) throw new Error(`API failed: ${res.status}`);
  const data = await res.json();

  // Save to file
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  console.log("✅ Wrote data.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

