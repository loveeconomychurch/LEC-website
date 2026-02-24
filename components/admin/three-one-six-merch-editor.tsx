"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import { getMerchProducts } from "@/lib/merch";
import type { ThreeOneSixMerchContent } from "@/lib/types/cms";
import type { MerchProduct } from "@/lib/types/merch";
import { GripVertical, Package, ShoppingBag } from "lucide-react";

export function ThreeOneSixMerchEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<ThreeOneSixMerchContent | null>(null);
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getContent("threeOneSixMerch"), getMerchProducts()]).then(
      ([content, productList]) => {
        setForm(content);
        setProducts(productList);
        setLoading(false);
      }
    );
  }, []);

  if (!form || loading) return <p className="text-neutral-500">Loading…</p>;

  const selectedIds = form.productIds ?? [];
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
      await setContent("threeOneSixMerch", form);
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
        <Label>Section title</Label>
        <Input
          value={form.sectionTitle}
          onChange={(e) => setForm((p) => (p ? { ...p, sectionTitle: e.target.value } : p))}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>View All button text</Label>
          <Input
            value={form.viewAllText}
            onChange={(e) => setForm((p) => (p ? { ...p, viewAllText: e.target.value } : p))}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        <div className="space-y-2">
          <Label>View All link (e.g. /merch)</Label>
          <Input
            value={form.viewAllLink}
            onChange={(e) => setForm((p) => (p ? { ...p, viewAllLink: e.target.value } : p))}
            placeholder="/merch"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
      </div>

      <div className="rounded-lg border border-neutral-700 bg-neutral-800/30 p-4 space-y-4">
        <div>
          <Label className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#1762B9]" />
            Products from Ecommerce
          </Label>
          <p className="text-xs text-neutral-500 mt-1">
            Select products from your Ecommerce catalog. They will appear in the Upcoming Merch section on the 3one6 page in the order below.
          </p>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="rounded-lg border border-neutral-700 border-dashed bg-neutral-800/30 p-6 text-center">
            <Package className="h-8 w-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm text-neutral-400">No products selected</p>
            <p className="text-xs text-neutral-500 mt-1">
              Add products from the list below to show them on the 3one6 page.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-neutral-500">
              Products will appear in this order on the 3one6 page:
            </p>
            <ul className="space-y-3 rounded-lg border border-neutral-700 bg-neutral-800/50 p-3">
              {selectedProducts.map((p, index) => (
                <li
                  key={p.id}
                  className="group flex flex-col rounded-lg border border-neutral-700 bg-neutral-800 min-h-[140px] overflow-hidden hover:border-neutral-600 hover:bg-neutral-800/80 transition-colors"
                >
                  <div className="flex flex-1 gap-3 p-3">
                    <div className="w-20 h-20 shrink-0 rounded-lg bg-neutral-700 overflow-hidden flex items-center justify-center border border-neutral-600">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-8 w-8 text-neutral-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                      <p className="text-sm font-medium text-white line-clamp-2">{p.name}</p>
                      <p className="text-sm text-neutral-400 mt-1">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-neutral-700 bg-neutral-800/80 px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveProduct(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded text-neutral-500 hover:text-neutral-300 hover:bg-neutral-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        aria-label="Move up"
                        title="Move up"
                      >
                        <GripVertical className="h-4 w-4 rotate-90" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveProduct(index, "down")}
                        disabled={index === selectedProducts.length - 1}
                        className="p-1.5 rounded text-neutral-500 hover:text-neutral-300 hover:bg-neutral-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        aria-label="Move down"
                        title="Move down"
                      >
                        <GripVertical className="h-4 w-4 -rotate-90" />
                      </button>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      onClick={() => removeProduct(p.id)}
                      aria-label={`Remove ${p.name}`}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-xs font-medium text-neutral-400">Add product from Ecommerce</Label>
          {unselectedProducts.length === 0 ? (
            <div className="rounded-lg border border-neutral-700 bg-neutral-800/30 p-4 text-center">
              <p className="text-sm text-neutral-400">All products are already selected</p>
              <p className="text-xs text-neutral-500 mt-1">
                Add more products in Admin → Ecommerce → Products
              </p>
            </div>
          ) : (
            <ul className="space-y-3 rounded-lg border border-neutral-700 bg-neutral-800/30 p-3 max-h-[320px] overflow-y-auto">
              {unselectedProducts.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-col rounded-lg border border-neutral-700 bg-neutral-800/50 min-h-[100px] overflow-hidden hover:border-neutral-600 hover:bg-neutral-700/50 transition-colors"
                >
                  <div className="flex flex-1 gap-3 p-3">
                    <div className="w-14 h-14 shrink-0 rounded-lg bg-neutral-700 overflow-hidden flex items-center justify-center border border-neutral-600">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-6 w-6 text-neutral-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                      <p className="text-sm text-neutral-200 line-clamp-2">{p.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-neutral-700 px-3 py-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full h-8 border-neutral-600 text-neutral-300 hover:bg-[#1762B9]/20 hover:border-[#1762B9]/50 hover:text-[#1762B9] transition-colors"
                      onClick={() => addProduct(p.id)}
                    >
                      Add to list
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
