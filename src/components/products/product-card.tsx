"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
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
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
