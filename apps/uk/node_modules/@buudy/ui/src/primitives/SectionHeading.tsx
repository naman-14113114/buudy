import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="buudy-ui-section-heading">
      {eyebrow ? <p className="buudy-ui-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div className="buudy-ui-section-copy">{children}</div> : null}
    </div>
  );
}
