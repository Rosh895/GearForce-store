import Image from "next/image";
import Link from "next/link";

/** Full lockup on ≥ sm, compact GF monogram on mobile. `mix-blend-lighten` fuses the logo's black with the dark header. */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link href="/" aria-label="GearForce — home" className="block shrink-0">
      <Image
        src="/logo/gearforce-mark.png"
        alt="GearForce"
        width={800}
        height={310}
        priority={priority}
        className="h-9 w-auto mix-blend-lighten sm:hidden"
      />
      <Image
        src="/logo/gearforce-logo.png"
        alt="GearForce — Gear for Every Journey"
        width={1400}
        height={530}
        priority={priority}
        className="hidden h-14 w-auto mix-blend-lighten sm:block"
      />
    </Link>
  );
}
