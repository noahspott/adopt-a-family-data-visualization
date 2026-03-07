type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  /** Optional secondary style (light gray like "Back" in reference). */
  secondary?: boolean;
};

export function CtaButton({ href, children, secondary }: CtaButtonProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={
        secondary
          ? "inline-flex min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-6 py-3 text-base font-semibold text-[var(--text)] shadow-sm transition hover:bg-[var(--border)]"
          : "inline-flex min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-95"
      }
    >
      {children}
    </a>
  );
}
