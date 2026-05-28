export function productAsset(fileName: string, productSlug = "buudy-led-mask") {
  return `/images/products/${productSlug}/${fileName}`;
}

export function homeAsset(fileName: string) {
  return `/images/home/${fileName}`;
}

export type ProductImage = {
  src: string;
  alt: string;
  animated?: boolean;
  width?: number;
  height?: number;
};
