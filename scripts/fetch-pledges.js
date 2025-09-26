// scripts/fetch.js
import fs from "fs";
import fetch from "node-fetch"; // node18+ has fetch built-in, but this works too
import dotenv from "dotenv"; // if using ESM
dotenv.config();

const API_URL =
  "https://api.planningcenteronline.com/giving/v2/pledge_campaigns/" +
  process.env.CAMPAIGN_ID;

async function main() {
  const credentials = Buffer.from(
    `${process.env.PLANNING_CENTER_CLIENT_ID}:${process.env.PLANNING_CENTER_CLIENT_SECRET}`
  ).toString("base64");
  console.log("creds", credentials, process.env.PLANNING_CENTER_CLIENT_ID);
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

