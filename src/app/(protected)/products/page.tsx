"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageNumbers } from "@/utils/pagination";
import { isApiError } from "@/utils/api-error";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product.types";

const AddProductDialog = dynamic(
  () =>
    import("@/components/products/add-product-dialog").then(
      (m) => m.AddProductDialog
    ),
  {
    ssr: false,
    loading: () => (
      <Button variant="outline" disabled>
        Add Product
      </Button>
    ),
  }
);

const LIMIT = 12;

export default function ProductsPage() {
  const [page, setPage] = useState<number>(1);
  const skip = (page - 1) * LIMIT;

  const { data, isLoading, isFetching, error } = useProducts({ limit: LIMIT, skip });

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            {data && (
              <p className="text-sm text-muted-foreground">{data.total} total products</p>
            )}
          </div>
          <AddProductDialog />
        </header>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {isApiError(error) ? error.message : "An unexpected error occurred"}
          </p>
        )}

        <section aria-label="Product list">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: LIMIT }).map((_: unknown, i: number) => (
                  <ProductCardSkeleton key={i} />
                ))
              : data?.products.map((product: Product, i: number) => (
                  <ProductCard key={product.id} product={product} priority={i < 4} />
                ))}
          </div>
        </section>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => p - 1);
                  }}
                  aria-disabled={page === 1 || isFetching}
                  className={cn(
                    "cursor-pointer",
                    (page === 1 || isFetching) && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {pageNumbers.map((num, i) =>
                num === "..." ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={num}>
                    <PaginationLink
                      isActive={page === num}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(num);
                      }}
                      aria-disabled={isFetching}
                      className={cn(
                        "cursor-pointer",
                        isFetching && "pointer-events-none opacity-50"
                      )}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => p + 1);
                  }}
                  aria-disabled={page === totalPages || isFetching}
                  className={cn(
                    "cursor-pointer",
                    (page === totalPages || isFetching) && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
}
