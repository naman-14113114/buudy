import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "ghost" | "quiet";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--plum)] text-[var(--cream)] shadow-[0_14px_30px_-18px_rgba(58,31,61,.8)] hover:bg-[var(--ink)]",
  ghost:
    "border border-[rgba(58,31,61,.24)] text-[var(--plum)] hover:bg-[rgba(58,31,61,.06)]",
  quiet: "text-[var(--plum)] hover:bg-[rgba(58,31,61,.06)]",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
    });
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
