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
  manualPromoCode: string;
  manualPromoCodes?: string[];
  giftMessage: string;
};

export const promoCode = "AUTO";
export const manualPromoCode = "BUUDY10";
export const manualPromoDiscountCents = 1000;

export const VALID_PROMO_CODES: Record<
  string,
  { code: string; discountCents: number; type: "promo" | "gift_card" }
> = {
  BUUDY10: { code: "BUUDY10", discountCents: 1000, type: "promo" },
  BUUDY: { code: "BUUDY10", discountCents: 1000, type: "promo" },
  "9PQ28ENBLJ": { code: "9PQ28ENBLJ", discountCents: 2000, type: "gift_card" },
};

export const emptyCart: CartState = {
  lines: [],
  promoCode,
  manualPromoCode: "",
  manualPromoCodes: [],
  giftMessage: "",
};

export function normalizeManualPromoCode(code: string | null | undefined) {
  return (code ?? "").trim().toUpperCase();
}

export function getPromoCodeConfig(code: string | null | undefined) {
  const normalized = normalizeManualPromoCode(code);
  return VALID_PROMO_CODES[normalized] || null;
}

export function isValidManualPromoCode(code: string | null | undefined) {
  return Boolean(getPromoCodeConfig(code));
}

export function getAppliedManualPromoCode(code: string | null | undefined) {
  const config = getPromoCodeConfig(code);
  return config ? config.code : "";
}

export function getPromoDiscountCents(code: string | null | undefined): number {
  const config = getPromoCodeConfig(code);
  return config ? config.discountCents : 0;
}

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
    compareAtCents:
      product.compareAtCents && product.compareAtCents > product.priceCents
        ? product.compareAtCents
        : undefined,
    quantity: normalizedQuantity,
  };

  const gifts = product.gifts.map<CartLine>((gift) => {
    const isEbook = gift.id === "skincare-ebook";
    return {
      id: `${product.id}:${gift.id}`,
      productId: product.id,
      slug: isEbook ? "skincare-ebook" : product.slug,
      type: "gift",
      title: gift.name,
      subtitle: isEbook
        ? "Delivered digitally via email after checkout"
        : `${product.name} free gift unlocked`,
      image: gift.image,
      unitPriceCents: 0,
      compareAtCents:
        gift.valueCents > 0 ? gift.valueCents : undefined,
      quantity: normalizedQuantity,
      locked: true,
    };
  });

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

export function calculateCartTotals(
  lines: CartLine[],
  appliedManualPromo: string | string[] = "",
  nativePromoDiscountCents = 0,
) {
  const promoCodesList = Array.isArray(appliedManualPromo)
    ? appliedManualPromo
    : appliedManualPromo
    ? [appliedManualPromo]
    : [];

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

  // Sum unique applied promo code discounts
  const uniqueAppliedCodes = Array.from(
    new Set(promoCodesList.map((c) => getAppliedManualPromoCode(c)).filter(Boolean)),
  );
  const calculatedPromoDiscountCents = uniqueAppliedCodes.reduce((acc, code) => {
    return acc + getPromoDiscountCents(code);
  }, 0);
  const promoDiscountCents = Math.min(
    calculatedPromoDiscountCents > 0 ? calculatedPromoDiscountCents : Math.max(nativePromoDiscountCents, 0),
    subtotalCents,
  );

  return {
    itemCount: productLines.reduce((total, line) => total + line.quantity, 0),
    subtotalCents,
    compareAtCents,
    giftValueCents,
    savingsCents,
    promoDiscountCents,
    shippingCents: subtotalCents > 0 ? 0 : 0,
    totalCents: Math.max(subtotalCents - promoDiscountCents, 0),
  };
}

export function getDisplayLines(lines: CartLine[]): CartLine[] {
  const hasMaskProduct = lines.some(
    (line) => line.productId === "buudy-led-mask" && line.type === "product"
  );

  const formattedLines = lines.map((line) => {
    if (hasMaskProduct && line.productId === "buudy-led-mask" && line.type === "product") {
      return {
        ...line,
        title: "Buudy LED Mask + Premium Travel Box",
        image: "/media/products/buudy-led-mask/images/84-w.webp",
      };
    }
    if (
      line.id.includes("skincare-ebook") ||
      line.productId === "buudy-skincare-ebook" ||
      line.slug === "skincare-ebook"
    ) {
      return {
        ...line,
        title: "Skincare E-Book",
        subtitle: "Delivered digitally via email after checkout",
        compareAtCents:
          line.type === "gift"
            ? line.compareAtCents || 1900
            : line.compareAtCents,
      };
    }
    return line;
  });

  return formattedLines.filter((line) => {
    if (hasMaskProduct && line.productId === "buudy-led-mask" && line.type === "gift") {
      const giftId = line.id.split(":")[1];
      if (giftId === "premium-travel-box") {
        return false;
      }
    }
    return true;
  });
}
