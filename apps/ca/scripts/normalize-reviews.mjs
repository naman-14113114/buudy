import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceFile = path.join(
  process.cwd(),
  ".private",
  "reviews",
  "archive-list_reviews_10650730_2026_May_29_14_17_11_196046471.csv",
);

const outputFile = path.join(
  process.cwd(),
  "src",
  "data",
  "reviews",
  "buudy-led-mask-reviews.json",
);

const imageColumns = [
  "link_of_img_1",
  "link_of_img_2",
  "link_of_img_3",
  "link_of_img_4",
  "link_of_img_5",
];

function parseCsv(text) {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const nextChar = normalized[index + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      if (row.some((value) => value.trim())) {
        rows.push(row);
      }
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim())) {
    rows.push(row);
  }

  const [headers, ...records] = rows;

  return records.map((record) =>
    Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""])),
  );
}

function cleanValue(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function getDateParts(rawDate) {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/.exec(rawDate);

  if (!match) {
    return {
      date: "",
      displayDate: "",
      sortTimestamp: 0,
    };
  }

  const [, year, month, day, hour = "00", minute = "00", second = "00"] = match;
  const date = `${year}-${month}-${day}`;
  const sortTimestamp = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  );
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  });

  return {
    date,
    displayDate: formatter.format(new Date(`${date}T00:00:00.000Z`)),
    sortTimestamp,
  };
}

function normalizeReview(row, sourceIndex) {
  const rating = Math.min(5, Math.max(1, Number.parseInt(row.rating, 10) || 5));
  const { date, displayDate, sortTimestamp } = getDateParts(
    cleanValue(row.date_of_review),
  );
  const images = imageColumns
    .map((column) => cleanValue(row[column]))
    .filter((url) => /^https?:\/\//.test(url));

  return {
    id: `buudy-led-mask-review-${String(sourceIndex).padStart(4, "0")}`,
    sourceIndex,
    productHandle: cleanValue(row.product_handle),
    customerName: cleanValue(row.name_of_customer) || "Buudy customer",
    rating,
    title: cleanValue(row.title),
    body: cleanValue(row.review),
    date,
    displayDate,
    images,
    sortTimestamp,
  };
}

const csvText = await readFile(sourceFile, "utf8");
const rows = parseCsv(csvText);
const reviews = rows
  .map((row, index) => normalizeReview(row, index + 1))
  .filter((review) => review.productHandle === "buudy-led-mask" && review.body)
  .sort((a, b) => {
    const dateOrder = b.sortTimestamp - a.sortTimestamp;
    return dateOrder || a.sourceIndex - b.sourceIndex;
  })
  .map((review) => {
    const publicReview = { ...review };
    delete publicReview.sortTimestamp;
    return publicReview;
  });

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify(reviews, null, 2)}\n`);

console.log(`Imported ${reviews.length} Buudy LED Mask reviews.`);
console.log(`First review: ${reviews[0]?.customerName ?? "none"}`);
console.log(`Last review: ${reviews.at(-1)?.customerName ?? "none"}`);
