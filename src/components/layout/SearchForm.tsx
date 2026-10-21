"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SearchForm({ className = "", onDone }: { className?: string; onDone?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    onDone?.();
  }

  return (
    <form role="search" onSubmit={submit} className={`flex items-center border border-white/20 bg-graphite-deep focus-within:border-racing ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search gear…"
        className="w-full bg-transparent px-3 py-2 text-sm text-arctic placeholder:text-silver/70 focus:outline-none"
      />
      <button type="submit" aria-label="Search" className="px-3 py-2 text-silver hover:text-white">
        <Search className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
