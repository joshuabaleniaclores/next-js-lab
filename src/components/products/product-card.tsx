"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/useProducts";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteProduct(product.id, {
      onSuccess: () => setConfirmDelete(false),
    });
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <figure className="relative w-full h-48">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            className="object-cover rounded-t-lg"
          />
        </figure>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-medium text-sm leading-tight line-clamp-2">{product.title}</h2>
          <Badge variant="secondary" className="shrink-0 text-xs">{product.category}</Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-semibold">${product.price}</span>
          <span className="text-xs text-muted-foreground">★ {product.rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/products/${product.id}`}><Eye size={15} />View Details</Link>
        </Button>
        <Button
          variant={confirmDelete ? "destructive" : "outline"}
          size="sm"
          disabled={isPending}
          onClick={handleDelete}
          onBlur={() => setConfirmDelete(false)}
        >
          <Trash2 size={15} />
          {isPending ? "..." : confirmDelete ? "Confirm?" : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
