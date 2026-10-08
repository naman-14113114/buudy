export function productAsset(fileName: string, productSlug = "buudy-led-mask") {
  const encoded = fileName.includes("%") ? fileName : encodeURIComponent(fileName).replace(/%2F/g, "/");
  return `/images/products/${productSlug}/${encoded}`;
}

export function productMediaAsset(
  fileName: string,
  productSlug = "buudy-led-mask",
  kind: "images" | "videos" = "images",
) {
  const encoded = fileName.includes("%") ? fileName : encodeURIComponent(fileName).replace(/%2F/g, "/");
  return `/media/products/${productSlug}/${kind}/${encoded}`;
}

export function homeAsset(fileName: string) {
  const encoded = fileName.includes("%") ? fileName : encodeURIComponent(fileName).replace(/%2F/g, "/");
  return `/images/home/${encoded}`;
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
