"use client";

import { useState, useEffect, useCallback } from "react";
import { getMerchProductsByIds } from "@/lib/merch";
import type { MerchProduct } from "@/lib/types/merch";

export function useMerchProductsByIds(ids: string[]) {
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!ids.length) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const list = await getMerchProductsByIds(ids);
      setProducts(list);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [ids.join(",")]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { products, loading, refresh };
}
