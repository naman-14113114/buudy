export function productAsset(fileName: string) {
  return `/images/products/buudy-led-mask/${fileName}`;
}

export type ProductImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
