"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddProduct } from "@/hooks/useProducts";
import { addProductSchema, type AddProductFormValues } from "@/schemas/product.schema";

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: addProduct, isPending } = useAddProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
  });

  function onSubmit(values: AddProductFormValues) {
    addProduct(values, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Fill in the details to add a new product.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Product title"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p role="alert" className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              aria-invalid={!!errors.price}
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p role="alert" className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g. beauty"
              aria-invalid={!!errors.category}
              {...register("category")}
            />
            {errors.category && (
              <p role="alert" className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              placeholder="Brand name"
              aria-invalid={!!errors.brand}
              {...register("brand")}
            />
            {errors.brand && (
              <p role="alert" className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} aria-busy={isPending}>
              {isPending ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
