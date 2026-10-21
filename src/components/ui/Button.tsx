import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-heading text-sm font-bold uppercase tracking-[0.14em] italic transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]";

const variants: Record<Variant, string> = {
  primary: "bg-racing text-white hover:bg-racing-dark",
  secondary: "border border-silver/50 bg-transparent text-arctic hover:bg-white/10",
  dark: "bg-midnight text-white hover:bg-graphite",
  ghost: "bg-transparent text-racing hover:bg-racing/10",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={buttonClasses(variant, className)} {...props} />;
}
