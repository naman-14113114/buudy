import { getProductById, getProductBySlug, type Product } from "@/data/products";

export type CartLineType = "product" | "gift";

export type CartLine = {
  id: string;
  productId: string;
  slug?: string;
  type: CartLineType;
  title: string;
  subtitle?: string;
  image: string;
  unitPriceCents: number;
  compareAtCents?: number;
  quantity: number;
  locked?: boolean;
};

export type CartState = {
  lines: CartLine[];
  promoCode: string;
  giftMessage: string;
};

export const promoCode = "AUTO";

export const emptyCart: CartState = {
  lines: [],
  promoCode,
  giftMessage: "",
};

export function buildProductCartLines(product: Product, quantity = 1): CartLine[] {
  const normalizedQuantity = Math.max(quantity, 0);

  if (normalizedQuantity <= 0) {
    return [];
  }

  const productLine: CartLine = {
    id: product.id,
    productId: product.id,
    slug: product.slug,
    type: "product",
    title: product.name,
    subtitle: product.shortDescription,
    image: product.cartImage,
    unitPriceCents: product.priceCents,
    compareAtCents: product.compareAtCents,
    quantity: normalizedQuantity,
  };

  const gifts = product.gifts.map<CartLine>((gift) => ({
    id: `${product.id}:${gift.id}`,
    productId: product.id,
    slug: product.slug,
    type: "gift",
    title: gift.name,
    subtitle: `${product.name} free gift unlocked`,
    image: gift.image,
    unitPriceCents: 0,
    compareAtCents: gift.valueCents,
    quantity: normalizedQuantity,
    locked: true,
  }));

  return [productLine, ...gifts];
}

function findProductForLine(line: CartLine) {
  return (
    getProductById(line.productId) ??
    getProductById(line.id) ??
    (line.slug ? getProductBySlug(line.slug) : undefined)
  );
}

export function normalizeCartLines(lines: CartLine[]) {
  const productLines = lines.filter((line) => line.type === "product");

  return productLines.flatMap((line) => {
    const product = findProductForLine(line);

    if (!product) {
      return [];
    }

    return buildProductCartLines(product, line.quantity);
  });
}

export function upsertProductCartLines(
  lines: CartLine[],
  product: Product,
  quantity: number,
) {
  const withoutProduct = lines.filter((line) => line.productId !== product.id);
  return [...withoutProduct, ...buildProductCartLines(product, quantity)];
}

export function calculateCartTotals(lines: CartLine[]) {
  const productLines = lines.filter((line) => line.type === "product");
  const giftLines = lines.filter((line) => line.type === "gift");
  const subtotalCents = productLines.reduce(
    (total, line) => total + line.unitPriceCents * line.quantity,
    0,
  );
  const compareAtCents = productLines.reduce(
    (total, line) =>
      total + (line.compareAtCents ?? line.unitPriceCents) * line.quantity,
    0,
  );
  const giftValueCents = giftLines.reduce(
    (total, line) => total + (line.compareAtCents ?? 0) * line.quantity,
    0,
  );
  const savingsCents = Math.max(compareAtCents - subtotalCents, 0);

  return {
    itemCount: productLines.reduce((total, line) => total + line.quantity, 0),
    subtotalCents,
    compareAtCents,
    giftValueCents,
    savingsCents,
    shippingCents: subtotalCents > 0 ? 0 : 0,
    totalCents: subtotalCents,
  };
}

export function getDisplayLines(lines: CartLine[]): CartLine[] {
  const hasMaskProduct = lines.some(
    (line) => line.productId === "buudy-led-mask" && line.type === "product"
  );

  if (!hasMaskProduct) {
    return lines;
  }

  return lines
    .map((line) => {
      if (line.productId === "buudy-led-mask" && line.type === "product") {
        return {
          ...line,
          title: "Buudy LED Mask + Premium Travel Box",
          image: "/media/products/buudy-led-mask/images/84-w.webp",
        };
      }
      return line;
    })
    .filter((line) => {
      if (line.productId === "buudy-led-mask" && line.type === "gift") {
        const giftId = line.id.split(":")[1];
        if (giftId === "premium-travel-box" || giftId === "skincare-ebook") {
          return false;
        }
      }
      return true;
    });
}
