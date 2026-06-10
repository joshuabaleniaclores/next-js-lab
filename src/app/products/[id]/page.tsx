"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useProduct, useDeleteProduct } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailSkeleton } from "@/components/products/product-detail-skeleton";
import { UpdateProductDialog } from "@/components/products/update-product-dialog";
import type { ApiError } from "@/types/api.types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: product, isLoading, error } = useProduct(Number(id));
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  function handleDelete() {
    if (!product) return;
    deleteProduct(product.id, {
      onSuccess: () => router.push("/products"),
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/products">← Back to Products</Link>
        </Button>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {(error as unknown as ApiError).message}
          </p>
        )}

        {isLoading ? (
          <ProductDetailSkeleton />
        ) : product ? (
          <article>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative w-full h-96">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge
                      variant={
                        product.availabilityStatus === "In Stock"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {product.availabilityStatus}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-semibold">{product.title}</h1>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                  <span className="text-sm text-muted-foreground">★ {product.rating}</span>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm">
                      Stock: <span className="font-medium">{product.stock} units</span>
                    </p>
                    <p className="text-sm">
                      SKU: <span className="font-medium">{product.sku}</span>
                    </p>
                    <p className="text-sm">
                      Warranty: <span className="font-medium">{product.warrantyInformation}</span>
                    </p>
                    <p className="text-sm">
                      Shipping: <span className="font-medium">{product.shippingInformation}</span>
                    </p>
                    <p className="text-sm">
                      Return Policy: <span className="font-medium">{product.returnPolicy}</span>
                    </p>
                  </CardContent>
                </Card>

                {product.tags.length > 0 && (
                  <section aria-label="Tags" className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </section>
                )}

                <footer className="flex gap-2 pt-2">
                  <UpdateProductDialog product={product} />
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting}
                    onClick={handleDelete}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </footer>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </main>
  );
}
