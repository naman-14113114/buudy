import type { ReactNode } from "react";

export function MediaFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`buudy-ui-media-frame ${className}`.trim()}>{children}</div>;
}
