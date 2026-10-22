"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartLink } from "./CartLink";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";
import { SearchForm } from "./SearchForm";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-midnight/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-racing focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Logo priority />
        <nav aria-label="Primary" className="ml-4 hidden flex-1 xl:block">
          <ul className="flex items-center gap-4 2xl:gap-6">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap font-heading text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-racing 2xl:text-sm 2xl:tracking-[0.12em] ${active ? "text-racing" : "text-arctic"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchForm className="hidden w-40 md:flex 2xl:w-52" />
          <CartLink />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-arctic xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-white/10 bg-graphite-deep xl:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <SearchForm className="mb-4 md:hidden" onDone={() => setOpen(false)} />
          <ul className="grid gap-1 sm:grid-cols-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-3 font-heading text-lg font-semibold uppercase tracking-[0.12em] hover:text-racing">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
