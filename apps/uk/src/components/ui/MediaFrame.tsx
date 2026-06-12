import Image from "next/image";
import type { ProductImage } from "@/lib/media";

type MediaFrameProps = ProductImage & {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function MediaFrame({
  src,
  alt,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: MediaFrameProps) {
  return (
    <div className={`relative overflow-hidden bg-[var(--blush)] ${className ?? ""}`}>
      <Image
        alt={alt}
        className="h-full w-full object-cover"
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
    </div>
  );
}
