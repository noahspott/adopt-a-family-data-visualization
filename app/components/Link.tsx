import { type ComponentPropsWithoutRef } from "react";

const linkClassName =
  "text-[var(--accent)] underline underline-offset-4 decoration-[var(--accent)]/50 transition duration-200 hover:decoration-[var(--accent)] hover:brightness-110 touch-manipulation";

type LinkProps = ComponentPropsWithoutRef<"a"> & {
  external?: boolean;
};

export function Link({
  href,
  external,
  className,
  rel,
  target,
  ...rest
}: LinkProps) {
  const isExternal = external ?? (href?.startsWith("http") ?? false);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : target}
      rel={isExternal ? "noopener noreferrer" : rel}
      className={[linkClassName, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
