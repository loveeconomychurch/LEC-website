"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart";
import type { MerchProduct } from "@/lib/types/merch";

export type ProductCardProduct =
  | MerchProduct
  | { id?: string; name: string; price: number | string; image: string };

function formatPrice(price: number | string): string {
  if (typeof price === "number") return `$${price.toFixed(2)}`;
  return String(price).startsWith("$") ? String(price) : `$${price}`;
}

/** Normalize product to MerchProduct shape for cart (id, name, price, image, category, description). */
function toMerchProduct(product: ProductCardProduct): MerchProduct | null {
  if (!("id" in product) || !product.id) return null;
  return {
    id: product.id,
    name: product.name,
    price: typeof product.price === "number" ? product.price : parseFloat(String(product.price)) || 0,
    image: product.image ?? "",
    category: "category" in product ? String((product as MerchProduct).category ?? "") : "",
    description: "description" in product ? String((product as MerchProduct).description ?? "") : "",
    order: 0,
    active: true,
    createdAt: "",
    updatedAt: "",
  };
}

export interface ProductCardProps {
  product: ProductCardProduct;
  /** When provided, overrides global cart: the button calls this instead of opening cart. */
  onAddToCart?: (product: MerchProduct) => void;
  /** Visual variant: dark (white text) for dark backgrounds, light for light backgrounds. */
  variant?: "dark" | "light";
  /** Image container height class, e.g. "h-64" or "h-[280px]". */
  imageHeight?: string;
  /** Index for stagger animation delay. */
  index?: number;
  /** Optional link for "view all" style (legacy 3one6 items). */
  viewAllLink?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  variant = "dark",
  imageHeight = "h-[480px]",
  index = 0,
  viewAllLink,
}: ProductCardProps) {
  const cart = useCart();
  const priceDisplay = formatPrice(product.price);
  const merchProduct = toMerchProduct(product);
  const useGlobalCart = cart && merchProduct;
  const usePropCart = onAddToCart && merchProduct;

  const handleCartClick = () => {
    if (useGlobalCart) {
      cart.addToCart(merchProduct);
      cart.openCart();
      return;
    }
    if (usePropCart) {
      onAddToCart(merchProduct);
      return;
    }
  };

  const showCartButton = useGlobalCart || usePropCart;
  const showMerchLink = !showCartButton;

  const titleClass =
    variant === "dark"
      ? "text-white font-semibold text-lg"
      : "text-neutral-900 font-semibold text-lg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl mb-4 bg-neutral-800 ${imageHeight}`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
        <div className="absolute bottom-3 right-3">
          {showCartButton ? (
            <Button
              size="icon"
              style={{ backgroundColor: "#1762B9" }}
              className="w-10 h-10 rounded-full text-white hover:opacity-90"
              onClick={handleCartClick}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              style={{ backgroundColor: "#1762B9" }}
              className="w-10 h-10 rounded-full text-white hover:opacity-90"
              asChild
            >
              <Link href={viewAllLink ?? "/merch"} aria-label={`View ${product.name} on merch`}>
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <h3 className={titleClass}>{product.name}</h3>
      <p className="text-[#1762B9] font-bold">{priceDisplay}</p>
    </motion.div>
  );
}
