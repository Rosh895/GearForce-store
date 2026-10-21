import { SOURCE_CATALOGUE } from "../src/data/source-catalogue";
import { validateCatalogue } from "../src/lib/validation";

const r = validateCatalogue(SOURCE_CATALOGUE);
const section = (title: string, items: string[]) =>
  console.log(`\n${title} (${items.length})\n${items.length ? items.map((i) => `  - ${i}`).join("\n") : "  none"}`);

console.log("GearForce catalogue validation report");
console.log(`Total entries: ${r.total} | Published: ${r.published} | Hidden: ${r.hidden}`);
section("ERRORS", r.errors);
section("Hidden from storefront", r.unresolved.hiddenRecords);
section("Unverified SKUs", r.unresolved.unverifiedSkus);
section("Truncated product names (full name unknown)", r.unresolved.truncatedNames);
section("Unknown variant counts (published)", r.unresolved.unknownVariantCounts);
section("No original price supplied (published)", r.unresolved.missingOriginalPrice);
process.exit(r.errors.length ? 1 : 0);
