import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "ghost" | "quiet";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "buudy-cart-wipe border border-[var(--plum)] bg-[var(--plum)] text-[var(--cream)] shadow-[0_14px_30px_-18px_rgba(58,31,61,.8)] hover:border-[var(--gold)]",
  ghost:
    "border border-[rgba(58,31,61,.24)] text-[var(--plum)] hover:bg-[rgba(58,31,61,.06)]",
  quiet: "text-[var(--plum)] hover:bg-[rgba(58,31,61,.06)]",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <span className="buudy-cart-wipe-content inline-flex items-center justify-center gap-2">
      {children}
    </span>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  asChild,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  );

  if (asChild && isValidElement<HTMLAttributes<HTMLElement>>(children)) {
    return cloneElement(children, {
      ...(props as HTMLAttributes<HTMLElement>),
      className: cn(children.props.className, classes),
      children: <ButtonContent>{children.props.children}</ButtonContent>,
    });
  }

  return (
    <button className={classes} type={type} {...props}>
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}
