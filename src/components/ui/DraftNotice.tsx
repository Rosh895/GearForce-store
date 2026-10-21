import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="flex gap-3 border border-amber-500/60 bg-amber-500/10 p-4 text-sm text-amber-200">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
