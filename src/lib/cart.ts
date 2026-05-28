import type { Product } from "@/data/products";

export type CartLineType = "product" | "gift";

export type CartLine = {
  id: string;
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

export const promoCode = "GLOWKIT";

export const emptyCart: CartState = {
  lines: [],
  promoCode,
  giftMessage: "",
};

export function buildProductCartLines(product: Product, quantity = 1): CartLine[] {
  const productLine: CartLine = {
    id: product.id,
    slug: product.slug,
    type: "product",
    title: product.name,
    subtitle: product.shortDescription,
    image: product.cartImage,
    unitPriceCents: product.priceCents,
    compareAtCents: product.compareAtCents,
    quantity,
  };

  const gifts = product.gifts.map<CartLine>((gift) => ({
    id: gift.id,
    type: "gift",
    title: gift.name,
    subtitle: "Free gift unlocked",
    image: gift.image,
    unitPriceCents: 0,
    compareAtCents: gift.valueCents,
    quantity,
    locked: true,
  }));

  return [productLine, ...gifts];
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
