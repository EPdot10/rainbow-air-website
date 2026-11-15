# Archived: installation packages & product showcase

Removed from the live site in **v0.4.0** (client has not decided on products yet). Kept here so they can be restored quickly.

| File | What it is |
|---|---|
| `FeaturedPackages.tsx` + `PackageCard.tsx` + `packages.ts` | Home page "Featured Air Conditioning Packages" section |
| `ProductShowcase.tsx` + `ProductCard.tsx` + `products.ts` | Product list (Midea demo data) with spec dialogs |
| `archivedCopy.ts` | Section headings / notices |

## Restore
1. Home: in `src/app/page.tsx` add `import { FeaturedPackages } from "@/archive/packages-products/FeaturedPackages";` and render `<FeaturedPackages />` after `<Hero />`.
2. Services: in `src/app/our-services/page.tsx` render `<ProductShowcase />` (import from `@/archive/packages-products/ProductShowcase`).
3. Optional: re-add package/model suggestions to the enquiry form (`preferredOptions` in `src/components/forms/QuoteEnquiryForm.tsx`).

The full pre-removal site is also on the git branch **`backup/packages-products`** (commit `2f6b423`).
