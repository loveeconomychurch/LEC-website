"use client";

import { useState, useEffect, useCallback } from "react";
import { getContent, getDefault } from "@/lib/cms";
import { getActiveMerchProducts } from "@/lib/merch";
import type { MerchHeroContent, MerchFeaturedProductsContent } from "@/lib/types/cms";
import type { MerchProduct } from "@/lib/types/merch";

export function useMerchPage() {
  const [hero, setHero] = useState<MerchHeroContent | null>(null);
  const [featuredConfig, setFeaturedConfig] = useState<MerchFeaturedProductsContent | null>(null);
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [heroContent, featuredContent, allActive] = await Promise.all([
        getContent("merchHero"),
        getContent("merchFeaturedProducts"),
        getActiveMerchProducts(),
      ]);
      setHero(heroContent);
      setFeaturedConfig(featuredContent);
      if (featuredContent.showAll || !featuredContent.productIds.length) {
        setProducts(allActive);
      } else {
        const idToProduct = new Map(allActive.map((p) => [p.id, p]));
        const ordered = featuredContent.productIds
          .map((id) => idToProduct.get(id))
          .filter(Boolean) as MerchProduct[];
        setProducts(ordered);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setHero(getDefault("merchHero") as MerchHeroContent);
      setFeaturedConfig(getDefault("merchFeaturedProducts") as MerchFeaturedProductsContent);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  return { hero, featuredConfig, products, categories, loading, error, refresh };
}
