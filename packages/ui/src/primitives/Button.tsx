import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "quiet";
};

type ButtonProps =
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const variants = {
  primary: "buudy-ui-btn buudy-ui-btn-primary",
  secondary: "buudy-ui-btn buudy-ui-btn-secondary",
  quiet: "buudy-ui-btn buudy-ui-btn-quiet",
};

export function Button({ children, className = "", variant = "primary", href, ...props }: ButtonProps) {
  const classes = `${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
