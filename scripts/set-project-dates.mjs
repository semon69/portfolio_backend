/**
 * Backfills createdAt/updatedAt on projects so the public site orders them
 * deliberately rather than by when the rows happened to be inserted.
 *
 * `timestamps: true` only stamps documents created after it was deployed,
 * so everything except Quest is missing the field. Sorting falls back to
 * decoding the ObjectId, but that reflects insertion order — this sets
 * real dates in the order you actually want.
 *
 * Writes through the raw collection so Mongoose's timestamp handling
 * doesn't overwrite updatedAt on the way past.
 *
 * Dry run by default:
 *   node scripts/set-project-dates.mjs
 *   node scripts/set-project-dates.mjs --apply
 */

import "dotenv/config";
import mongoose from "mongoose";

const APPLY = process.argv.includes("--apply");

/**
 * Newest first — index 0 shows first on the site. Quest and Standard
 * Insights keep their genuine times; the rest are spaced plausibly to
 * hold this order.
 */
const ORDER = [
  ["Quest", "2026-09-30T11:10:35Z"],
  ["Standard Insights", "2026-09-30T06:20:39Z"],
  ["RedLove", "2025-11-14T09:42:00Z"],
  ["Let's Go", "2025-05-22T15:18:00Z"],
  ["Elite Export", "2024-12-09T12:05:00Z"],
  ["Flower Management", "2024-06-29T16:34:04Z"],
];

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("DATABASE_URL is not set. Check portfolio_backend/.env");
  process.exit(1);
}

await mongoose.connect(uri);
const projects = mongoose.connection.collection("projects");

const all = await projects.find({}).toArray();
console.log(`Found ${all.length} projects.\n`);

const plan = [];
const unmatched = [];

ORDER.forEach(([needle, iso], index) => {
  const match = all.find((p) =>
    String(p.title ?? "").toLowerCase().includes(needle.toLowerCase())
  );

  if (!match) {
    unmatched.push(needle);
    return;
  }
  plan.push({ position: index + 1, doc: match, date: new Date(iso) });
});

plan.forEach(({ position, doc, date }) => {
  const before = doc.createdAt
    ? new Date(doc.createdAt).toISOString().slice(0, 19)
    : "(missing)";
  console.log(
    `${String(position).padStart(2)}. ${String(doc.title)
      .slice(0, 42)
      .padEnd(44)} ${before.padEnd(21)} -> ${date
      .toISOString()
      .slice(0, 19)}`
  );
});

if (unmatched.length) {
  console.log(`\nNo project matched: ${unmatched.join(", ")}`);
}

const untouched = all.filter((p) => !plan.some((x) => x.doc._id.equals(p._id)));
if (untouched.length) {
  console.log(`\nNot in the list, left alone:`);
  untouched.forEach((p) => console.log(`  ${p.title}`));
}

if (!APPLY) {
  console.log("\nDry run. Re-run with --apply to write these dates.");
  await mongoose.disconnect();
  process.exit(0);
}

let ok = 0;
for (const { doc, date } of plan) {
  const res = await projects.updateOne(
    { _id: doc._id },
    { $set: { createdAt: date, updatedAt: date } }
  );
  if (res.matchedCount) ok++;
}

console.log(`\nUpdated ${ok} of ${plan.length}.`);
await mongoose.disconnect();
