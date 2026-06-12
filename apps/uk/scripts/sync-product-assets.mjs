import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const imageRoot = path.join(process.cwd(), "public", "images");

const assets = [
  {
    dir: "products/buudy-led-mask",
    files: [
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
    ],
  },
  {
    dir: "products/buudy-red-torch",
    files: [
      [
        "01-buudy-red-torch-main.png",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/176738038817f3610740.png?width=1200&height=0&min_height=0",
      ],
      [
        "02-buudy-red-torch-animation.gif",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/1766916767110f34f490.gif",
      ],
      [
        "03-buudy-red-torch-handheld.jpeg",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/176691671788a473605c.jpeg?width=640&height=0&min_height=0",
      ],
      [
        "04-buudy-red-torch-wavelengths.jpeg",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/1766916717fdb07a394e.jpeg?width=1200&height=0&min_height=0",
      ],
      [
        "05-buudy-red-torch-kit.jpeg",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/176691671835f1ac3273.jpeg?width=640&height=0&min_height=0",
      ],
      [
        "06-buudy-red-torch-body-relief.jpeg",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/1766916717b9d19d6230.jpeg?width=640&height=0&min_height=0",
      ],
      [
        "07-buudy-red-torch-closeup.jpeg",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/1766916717954e3ab294.jpeg?width=1200&height=0&min_height=0",
      ],
      [
        "08-buudy-red-torch-travel.jpeg",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/1766916716d62e0e9bd6.jpeg?width=640&height=0&min_height=0",
      ],
      [
        "09-buudy-red-torch-detail-wide.jpeg",
        "https://img.thesitebase.net/10650/10650730/themes/1766920053fb68c245be.jpeg?width=1200&height=0&min_height=0",
      ],
      [
        "10-buudy-red-torch-wellness.jpeg",
        "https://img.thesitebase.net/10650/10650730/themes/17669188303460b9d9e8.jpeg?width=1080&height=0&min_height=0",
      ],
      [
        "11-buudy-red-torch-treatment.jpeg",
        "https://img.thesitebase.net/10650/10650730/themes/1766918724e068b3a972.jpeg?width=1080&height=0&min_height=0",
      ],
    ],
  },
  {
    dir: "home",
    files: [
      [
        "01-home-led-mask-hero.png",
        "https://img.thesitebase.net/10650/10650730/themes/1755427915af4a138a8f.png?width=750&height=0&min_height=0",
      ],
      [
        "02-home-led-mask-lifestyle.png",
        "https://img.thesitebase.net/10650/10650730/themes/1755427904d9820bb8d8.png?width=750&height=0&min_height=0",
      ],
      [
        "03-home-led-mask-light.png",
        "https://img.thesitebase.net/10650/10650730/themes/1755427939e8ff36fefa.png?width=750&height=0&min_height=0",
      ],
      [
        "04-home-mask-spotlight.png",
        "https://img.thesitebase.net/10650/10650730/themes/1755427324cffcacdc62.png?width=1200&height=0&min_height=0",
      ],
      [
        "05-home-led-density.png",
        "https://img.thesitebase.net/10650/10650730/themes/17554271795ee9ff9ae9.png?width=1200&height=0&min_height=0",
      ],
      [
        "06-home-skin-types.png",
        "https://img.thesitebase.net/10650/10650730/themes/17678785455626adf5f6.png?width=1200&height=0&min_height=0",
      ],
      [
        "07-home-neck-coverage.png",
        "https://img.thesitebase.net/10650/10650730/themes/175579023880acb601be.png?width=640&height=0&min_height=0",
      ],
      [
        "08-home-light-therapy-story.jpeg",
        "https://img.thesitebase.net/10650/10650730/themes/0x2048@175542857082096e3033.jpeg",
      ],
      [
        "09-home-younger-you.png",
        "https://img.thesitebase.net/10650/10650730/themes/0x2048@1777605727702fab2885.png",
      ],
      [
        "10-home-red-torch.png",
        "https://img.thesitebase.net/10650/10650730/products/ver_1/176738038817f3610740.png?width=1200&height=0&min_height=0",
      ],
    ],
  },
];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

for (const group of assets) {
  const outputDir = path.join(imageRoot, group.dir);
  await mkdir(outputDir, { recursive: true });

  for (const [fileName, url] of group.files) {
    const target = path.join(outputDir, fileName);

    if (await exists(target)) {
      console.log(`skip ${group.dir}/${fileName}`);
      continue;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download ${url}: ${response.status}`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(target, bytes);
    console.log(`wrote ${group.dir}/${fileName}`);
  }
}
