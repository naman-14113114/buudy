import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const outputDir = path.join(
  process.cwd(),
  "public",
  "images",
  "products",
  "buudy-led-mask",
);

const assets = [
  [
    "01-buudy-led-mask-front.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/01-buudy-led-mask-front.webp",
  ],
  [
    "02-buudy-led-mask-side-profile.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/02-buudy-led-mask-side-profile.webp",
  ],
  [
    "03-buudy-led-mask-anti-ageing-mode.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/03-buudy-led-mask-anti-ageing-mode.webp",
  ],
  [
    "04-buudy-led-mask-blue-light-acne.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/04-buudy-led-mask-blue-light-acne.webp",
  ],
  [
    "05-buudy-led-mask-packaging.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/05-buudy-led-mask-packaging.webp",
  ],
  [
    "06-buudy-led-mask-results.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/06-buudy-led-mask-results.webp",
  ],
  [
    "07-buudy-led-mask-controller.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/07-buudy-led-mask-controller.webp",
  ],
  [
    "08-buudy-led-mask-lifestyle-use.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/08-buudy-led-mask-lifestyle-use.webp",
  ],
  [
    "09-buudy-led-mask-home-spa.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/09-buudy-led-mask-home-spa.webp",
  ],
  [
    "10-buudy-led-mask-dermatologist-recommended.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/10-buudy-led-mask-dermatologist-recommended.webp",
  ],
  [
    "11-buudy-led-mask-flexible-silicone.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/11-buudy-led-mask-flexible-silicone.webp",
  ],
  [
    "13-buudy-led-mask-starter-kit.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/13-buudy-led-mask-starter-kit.webp",
  ],
  [
    "14-buudy-led-mask-award-2026.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/14-buudy-led-mask-award-2026.webp",
  ],
  [
    "15-buudy-led-mask-warranty.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-led-mask/full/15-buudy-led-mask-warranty.webp",
  ],
  [
    "premium-travel-box.png",
    "https://img.thesitebase.net/10650/10650730/themes/17682450181b5f55beb5.png?width=640&height=0&min_height=0",
  ],
  [
    "buudy-led-torch.png",
    "https://img.thesitebase.net/10650/10650730/products/ver_1/176738038817f3610740.png?width=640&height=0&min_height=0",
  ],
  [
    "skincare-ebook.png",
    "https://img.thesitebase.net/10650/10650730/themes/17682431737d583cc2df.png?width=640&height=0&min_height=0",
  ],
  [
    "01-sagging-cheeks.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/01-sagging-cheeks.webp",
  ],
  [
    "02-fine-lines.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/02-fine-lines.webp",
  ],
  [
    "03-neck-firming.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/03-neck-firming.webp",
  ],
  [
    "04-forehead-lines.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/04-forehead-lines.webp",
  ],
  [
    "05-jawline-sculpting.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/05-jawline-sculpting.webp",
  ],
  [
    "06-skin-radiance.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/06-skin-radiance.webp",
  ],
  [
    "07-under-eye-bags.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/07-under-eye-bags.webp",
  ],
  [
    "08-skin-texture.webp",
    "https://www.trustpilotreview.shop/gallery/buudy-before-after/full/08-skin-texture.webp",
  ],
  [
    "dermatologist-video-poster.png",
    "https://img.thesitebase.net/10650/10650730/themes/177101743964891dc1d2.png?width=1080&height=0&min_height=0",
  ],
];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

await mkdir(outputDir, { recursive: true });

for (const [fileName, url] of assets) {
  const target = path.join(outputDir, fileName);

  if (await exists(target)) {
    console.log(`skip ${fileName}`);
    continue;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(target, bytes);
  console.log(`wrote ${fileName}`);
}
