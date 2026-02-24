"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import { getMerchProducts } from "@/lib/merch";
import type { MerchFeaturedProductsContent } from "@/lib/types/cms";
import type { MerchProduct } from "@/lib/types/merch";
import { GripVertical, Package } from "lucide-react";

export function MerchFeaturedProductsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<MerchFeaturedProductsContent | null>(null);
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getContent("merchFeaturedProducts"), getMerchProducts()]).then(
      ([content, productList]) => {
        setForm(content);
        setProducts(productList);
        setLoading(false);
      }
    );
  }, []);

  if (!form || loading) return <p className="text-neutral-500">Loading…</p>;

  const selectedIds = form.productIds;
  const selectedProducts = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as MerchProduct[];
  const unselectedProducts = products.filter((p) => !selectedIds.includes(p.id));

  const setProductIds = (productIds: string[]) => {
    setForm((prev) => (prev ? { ...prev, productIds } : prev));
  };

  const addProduct = (productId: string) => {
    setProductIds([...selectedIds, productId]);
  };

  const removeProduct = (productId: string) => {
    setProductIds(selectedIds.filter((id) => id !== productId));
  };

  const moveProduct = (index: number, direction: "up" | "down") => {
    const next = [...selectedIds];
    const j = direction === "up" ? index - 1 : index + 1;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setProductIds(next);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("merchFeaturedProducts", form);
      setMessage({ type: "ok", text: "Saved." });
      onSaved?.();
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Failed to save." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {message && (
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showAll"
            checked={form.showAll}
            onChange={(e) => setForm((prev) => (prev ? { ...prev, showAll: e.target.checked } : prev))}
            className="rounded border-neutral-600 bg-neutral-800"
          />
          <Label htmlFor="showAll" className="cursor-pointer">
            Show all active products (ignore list below)
          </Label>
        </div>
        <p className="text-xs text-neutral-500">
          When off, only the products in the list below are shown on the merch page, in order.
        </p>
      </div>
      {!form.showAll && (
        <>
          <div className="space-y-2">
            <Label>Products to show on the merch page (drag order)</Label>
            {selectedProducts.length === 0 ? (
              <p className="text-sm text-neutral-500">No products selected. Add from the list below.</p>
            ) : (
              <ul className="space-y-1 rounded-lg border border-neutral-700 bg-neutral-800/50 p-2">
                {selectedProducts.map((p, index) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-2 rounded-md bg-neutral-800 px-2 py-2 text-sm"
                  >
                    <div className="flex shrink-0 gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveProduct(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <GripVertical className="h-4 w-4 rotate-90" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveProduct(index, "down")}
                        disabled={index === selectedProducts.length - 1}
                        className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <GripVertical className="h-4 w-4 -rotate-90" />
                      </button>
                    </div>
                    <div className="w-8 h-8 rounded bg-neutral-700 shrink-0 overflow-hidden flex items-center justify-center">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-4 w-4 text-neutral-500" />
                      )}
                    </div>
                    <span className="min-w-0 truncate text-white">{p.name}</span>
                    <span className="text-neutral-500 shrink-0">${p.price.toFixed(2)}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-auto shrink-0 text-red-400 hover:text-red-300"
                      onClick={() => removeProduct(p.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <Label>Add product (from Ecommerce)</Label>
            {unselectedProducts.length === 0 ? (
              <p className="text-sm text-neutral-500">All products are already in the list.</p>
            ) : (
              <ul className="space-y-1 rounded-lg border border-neutral-700 bg-neutral-800/30 p-2 max-h-48 overflow-y-auto">
                {unselectedProducts.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-neutral-700/50"
                  >
                    <div className="w-8 h-8 rounded bg-neutral-700 shrink-0 overflow-hidden flex items-center justify-center">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-4 w-4 text-neutral-500" />
                      )}
                    </div>
                    <span className="min-w-0 truncate text-neutral-300">{p.name}</span>
                    <span className="text-neutral-500 shrink-0">${p.price.toFixed(2)}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="ml-auto shrink-0 border-neutral-600 text-neutral-300"
                      onClick={() => addProduct(p.id)}
                    >
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
