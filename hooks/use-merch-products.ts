"use client";

import { useState, useEffect, useCallback } from "react";
import { getActiveMerchProducts } from "@/lib/merch";
import type { MerchProduct } from "@/lib/types/merch";

export function useMerchProducts() {
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getActiveMerchProducts();
      setProducts(list);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  return { products, loading, error, refresh, categories };
}
