export function productAsset(fileName: string, productSlug = "buudy-led-mask") {
  return `/images/products/${productSlug}/${fileName}`;
}

export function productMediaAsset(
  fileName: string,
  productSlug = "buudy-led-mask",
  kind: "images" | "videos" = "images",
) {
  return `/media/products/${productSlug}/${kind}/${fileName}`;
}

export function homeAsset(fileName: string) {
  return `/images/home/${fileName}`;
}

export type ProductImageBadge = {
  title: string;
  sub?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  theme?: "dark" | "white";
};

export type ProductImage = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  animated?: boolean;
  width?: number;
  height?: number;
  badge?: ProductImageBadge;
};
