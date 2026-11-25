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
export const manualPromoCode = "";
export const manualPromoDiscountCents = 1000;

export const VALID_PROMO_CODES: Record<
  string,
  { code: string; discountCents: number; type: "promo" | "gift_card" }
> = {
  BLACKFRIDAY10: { code: "BLACKFRIDAY10", discountCents: 1000, type: "promo" },
  BUUDY10: { code: "BUUDY10", discountCents: 1000, type: "promo" },
  BUUDY: { code: "BUUDY10", discountCents: 1000, type: "promo" },
  BUUDYBF20: { code: "BUUDYBF20", discountCents: 2000, type: "promo" },
  BUUDY10BLACKFRIDAY10: { code: "BUUDY10BLACKFRIDAY10", discountCents: 2000, type: "promo" },
  VIP50: { code: "VIP50", discountCents: 5000, type: "promo" },
};

export const emptyCart: CartState = {
  lines: [],
  promoCode,
  manualPromoCode: "",
  manualPromoCodes: [],
  giftMessage: "",
};

export function normalizeManualPromoCode(code: string | null | undefined) {
  return (code ?? "").trim().toUpperCase().replace(/\s+/g, "");
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

export function isProtocolProduct(product: Product | { id?: string; slug?: string; template?: string }) {
  const template = (product as Product).template;
  const slug = product.slug || "";
  const id = product.id || "";
  return (
    template === "serum" ||
    template === "cleanser" ||
    id === "buudy-light-activating-hyaluronic-serum" ||
    slug.includes("serum") ||
    slug.includes("cream") ||
    slug.includes("concentrate") ||
    slug.includes("face-wash") ||
    slug.includes("collection") ||
    slug.includes("box") ||
    slug.includes("duo") ||
    slug.includes("hyaluronic")
  );
}

export function getProtocolCartDetails(product: Product, quantity: number) {
  const slug = product.slug || "";
  const isBox = slug.includes("collection") || slug.includes("box") || slug.includes("duo");

  if (isBox) {
    if (quantity === 2) {
      return {
        unitPriceCents: 17450,
        compareAtCents: product.compareAtCents ? product.compareAtCents : undefined,
        subtitle: slug.includes("duo")
          ? "2 Duo Gift Boxes (4 x 30ml) · Extended 120-Day Protocol"
          : slug.includes("peptide")
          ? "2 Collection Boxes · Extended 180-Day Firming Protocol"
          : "2 Collection Boxes (6 x 30ml) · Continuous Renewal Protocol",
      };
    }
    if (quantity === 3) {
      return {
        unitPriceCents: 14967,
        compareAtCents: product.compareAtCents ? product.compareAtCents : undefined,
        subtitle: slug.includes("duo")
          ? "3 Duo Gift Boxes (6 x 30ml) · Year-Round Hydration & Gifting"
          : slug.includes("peptide")
          ? "3 Collection Boxes · Ultimate Luxury Gifting & Year-Round Care"
          : "3 Collection Boxes (9 x 30ml) · Luxury Gifting & Year-Round Care",
      };
    }
    return {
      unitPriceCents: product.priceCents,
      compareAtCents: product.compareAtCents && product.compareAtCents > product.priceCents ? product.compareAtCents : undefined,
      subtitle: slug.includes("duo")
        ? "1 Duo Gift Box (2 x 30ml) · 2-Step Cellular Hydration"
        : slug.includes("peptide")
        ? "1 Collection Box (3-Step Trio) · Full Anti-Age Protocol"
        : "1 Collection Box (3 x 30ml) · Complete Renewal Trilogy",
    };
  }

  const isEyeCream = slug.includes("eye-cream") || slug.includes("eye");
  const isCream = (slug.includes("cream") || product.id.includes("cream")) && !isEyeCream;
  const isFaceWash = slug.includes("face-wash") || slug.includes("wash") || product.template === "cleanser";

  if (isEyeCream) {
    if (quantity === 3) {
      return {
        unitPriceCents: 8300,
        compareAtCents: 11900,
        subtitle: "3 Tubes (45ml) · Full 90-Day Protocol",
      };
    }
    if (quantity === 6) {
      return {
        unitPriceCents: 6650,
        compareAtCents: 11900,
        subtitle: "6 Tubes (90ml) · 6-Month Protocol",
      };
    }
    return {
      unitPriceCents: 9900,
      compareAtCents: 11900,
      subtitle: "1 Tube (15ml) · Daily Eye Contour Care",
    };
  }

  if (isCream) {
    if (quantity === 3) {
      return {
        unitPriceCents: 8300,
        compareAtCents: 11900,
        subtitle: "3 Jars (150ml) · Full 90-Day Protocol",
      };
    }
    if (quantity === 6) {
      return {
        unitPriceCents: 6650,
        compareAtCents: 11900,
        subtitle: "6 Jars (300ml) · 6-Month Protocol",
      };
    }
    return {
      unitPriceCents: 9900,
      compareAtCents: 11900,
      subtitle: "1 Jar (50ml) · Daily Restorative Care",
    };
  }

  if (isFaceWash) {
    if (quantity === 3) {
      return {
        unitPriceCents: 8300,
        compareAtCents: 11900,
        subtitle: "3 Bottles (420ml) · Full 90-Day Protocol",
      };
    }
    if (quantity === 6) {
      return {
        unitPriceCents: 6650,
        compareAtCents: 11900,
        subtitle: "6 Bottles (840ml) · 6-Month Protocol",
      };
    }
    return {
      unitPriceCents: 9900,
      compareAtCents: 11900,
      subtitle: "1 Bottle (140ml) · Daily Purifying & Balancing",
    };
  }

  let tier1Action = "Daily Hydration";
  if (slug.includes("peptide")) tier1Action = "Post-Light Collagen Lock";
  else if (slug.includes("prebiotic")) tier1Action = "Microbiome & Barrier Balance";
  else if (slug.includes("aha")) tier1Action = "Overnight Cellular Resurfacing";
  else if (slug.includes("retinol")) tier1Action = "LED-Safe Night Cellular Renewal";
  else if (slug.includes("niacinamide")) tier1Action = "Blemish Defence & Pore Control";
  else if (slug.includes("hydrating")) tier1Action = "Intensive Moisture & Barrier Care";

  if (quantity === 3) {
    return {
      unitPriceCents: 8300,
      compareAtCents: 11900,
      subtitle: "3 Bottles (90ml) · Full 90-Day Protocol",
    };
  }
  if (quantity === 6) {
    return {
      unitPriceCents: 6650,
      compareAtCents: 11900,
      subtitle: "6 Bottles (180ml) · 6-Month Protocol",
    };
  }
  return {
    unitPriceCents: 9900,
    compareAtCents: 11900,
    subtitle: `1 Bottle (30ml) · ${tier1Action}`,
  };
}

export function buildProductCartLines(product: Product, quantity = 1): CartLine[] {
  const normalizedQuantity = Math.max(quantity, 0);

  if (normalizedQuantity <= 0) {
    return [];
  }

  let unitPriceCents = product.priceCents;
  let compareAtCents =
    product.compareAtCents && product.compareAtCents > product.priceCents
      ? product.compareAtCents
      : undefined;
  let subtitle = product.shortDescription;

  if (isProtocolProduct(product)) {
    const details = getProtocolCartDetails(product, normalizedQuantity);
    unitPriceCents = details.unitPriceCents;
    compareAtCents = details.compareAtCents;
    subtitle = details.subtitle;
  }

  const productLine: CartLine = {
    id: product.id,
    productId: product.id,
    slug: product.slug,
    type: "product",
    title: product.name,
    subtitle,
    image: product.cartImage,
    unitPriceCents,
    compareAtCents,
    quantity: normalizedQuantity,
  };

  const gifts = product.gifts.map<CartLine>((gift) => {
    const isEbook = gift.id === "skincare-ebook";
    const isTravelBox = gift.id === "premium-travel-box";
    const isTorch = gift.id === "buudy-led-torch" || gift.id.includes("torch");
    return {
      id: `${product.id}:${gift.id}`,
      productId: product.id,
      slug: isEbook ? "skincare-ebook" : isTravelBox ? "premium-travel-box" : isTorch ? "red-light-torch" : product.slug,
      type: "gift",
      title: isTravelBox ? "Premium Travel Case" : gift.name,
      subtitle: isEbook
        ? "Delivered digitally via email after checkout"
        : isTravelBox
        ? "Luxury protective hard travel case"
        : isTorch
        ? "Targeted red and near-infrared light therapy device"
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

// Product CTAs express "put this in my bag", rather than an instruction to
// increment an existing quantity. The cart controls own explicit increments.
export function ensureProductInCart(
  state: CartState,
  product: Product,
  requestedQuantity = 1,
): CartState {
  if (!Number.isSafeInteger(requestedQuantity) || requestedQuantity < 1) return state;
  const isProtocol = isProtocolProduct(product);
  const existing = state.lines.find(line => line.type === "product" && line.productId === product.id);
  if (isProtocol) {
    if (existing && existing.quantity === requestedQuantity) return state;
    return { ...state, lines: upsertProductCartLines(state.lines, product, requestedQuantity) };
  }
  if (existing && existing.quantity >= requestedQuantity) return state;
  return { ...state, lines: upsertProductCartLines(state.lines, product, requestedQuantity) };
}

export function calculateCartTotals(
  lines: CartLine[],
  appliedManualPromo: string | string[] = "",
) {
  const promoCodesList = Array.isArray(appliedManualPromo)
    ? appliedManualPromo
    : appliedManualPromo
    ? [appliedManualPromo]
    : [];

  const uniqueAppliedCodes = Array.from(
    new Set(promoCodesList.map((c) => getAppliedManualPromoCode(c)).filter(Boolean)),
  );

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

  // Sum unique applied promo code discounts (allows both BUUDY10 and BLACKFRIDAY10)
  const totalPromoDiscountCents = uniqueAppliedCodes.reduce((acc, code) => {
    return acc + getPromoDiscountCents(code);
  }, 0);
  const promoDiscountCents = Math.min(totalPromoDiscountCents, subtotalCents);

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

  const formatted = lines.map((line) => {
    if (line.type === "product") {
      const prod = findProductForLine(line);
      const isProtocol =
        (prod && isProtocolProduct(prod)) ||
        line.productId === "buudy-light-activating-hyaluronic-serum" ||
        Boolean(line.slug && line.slug.includes("hyaluronic"));
      return {
        ...line,
        title: line.productId === "buudy-led-mask" ? "Buudy LED Mask" : line.title,
        subtitle: isProtocol && line.subtitle ? line.subtitle : (prod?.shortDescription ?? line.subtitle),
        image: line.productId === "buudy-led-mask" ? (getProductById("buudy-led-mask")?.cartImage ?? line.image) : line.image,
      };
    }
    if (
      line.id.includes("buudy-led-torch") ||
      line.productId === "buudy-red-torch" ||
      line.title.toLowerCase().includes("torch")
    ) {
      return {
        ...line,
        title: "Buudy LED Torch",
        subtitle: "Targeted red and near-infrared light therapy device",
        compareAtCents:
          line.type === "gift"
            ? line.compareAtCents || 7000
            : line.compareAtCents,
      };
    }
    if (
      line.id.includes("premium-travel-box") ||
      line.productId === "premium-travel-box" ||
      line.title.toLowerCase().includes("travel")
    ) {
      return {
        ...line,
        title: "Premium Travel Case",
        subtitle: "Luxury protective hard travel case",
        compareAtCents:
          line.type === "gift"
            ? line.compareAtCents || 3900
            : line.compareAtCents,
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

  const lineOrder = (line: CartLine) => {
    if (line.type === "product") return 0;
    if (line.id.includes("buudy-led-torch") || line.title.toLowerCase().includes("torch")) return 1;
    if (line.id.includes("premium-travel-box") || line.title.toLowerCase().includes("travel")) return 2;
    if (line.id.includes("skincare-ebook") || line.title.toLowerCase().includes("ebook") || line.title.toLowerCase().includes("e-book")) return 3;
    return 4;
  };

  return [...formatted].sort((a, b) => lineOrder(a) - lineOrder(b));
}
