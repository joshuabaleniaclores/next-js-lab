import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";

export default function ProductsLoading() {
  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-9 w-28 bg-muted rounded animate-pulse" />
        </header>

        <section aria-label="Loading products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
