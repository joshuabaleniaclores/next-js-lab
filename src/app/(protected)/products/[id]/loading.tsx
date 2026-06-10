import { ProductDetailSkeleton } from "@/components/products/product-detail-skeleton";

export default function ProductDetailLoading() {
  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-9 w-32 bg-muted rounded animate-pulse" />
        <ProductDetailSkeleton />
      </div>
    </main>
  );
}
