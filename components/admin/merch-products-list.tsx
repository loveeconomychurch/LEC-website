"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getMerchProducts,
  createMerchProduct,
  updateMerchProduct,
  deleteMerchProduct,
} from "@/lib/merch";
import type { MerchProduct } from "@/lib/types/merch";
import { MerchProductForm } from "./merch-product-form";
import { Plus, Pencil, Trash2, Package } from "lucide-react";

export function MerchProductsList({ onSaved }: { onSaved?: () => void }) {
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await getMerchProducts();
      setProducts(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSaveNew = async (data: Parameters<typeof createMerchProduct>[0]) => {
    await createMerchProduct(data);
    setAdding(false);
    await load();
    onSaved?.();
  };

  const handleSaveEdit = async (
    id: string,
    data: Parameters<typeof updateMerchProduct>[1]
  ) => {
    await updateMerchProduct(id, data);
    setEditingId(null);
    await load();
    onSaved?.();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteMerchProduct(id);
    setEditingId(null);
    await load();
    onSaved?.();
  };

  if (adding) {
    return (
      <div className="p-3">
        <h3 className="text-sm font-medium text-white mb-4">Add product</h3>
        <MerchProductForm
          onSave={handleSaveNew}
          onCancel={() => setAdding(false)}
        />
      </div>
    );
  }

  if (editingId) {
    const product = products.find((p) => p.id === editingId);
    return (
      <div className="p-3">
        <h3 className="text-sm font-medium text-white mb-4">Edit product</h3>
        <MerchProductForm
          product={product ?? null}
          onSave={(data) => handleSaveEdit(editingId, data)}
          onCancel={() => setEditingId(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Products</h3>
        <Button
          type="button"
          size="sm"
          style={{ backgroundColor: "#1762B9" }}
          className="text-white"
          onClick={() => setAdding(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add product
        </Button>
      </div>
      {loading ? (
        <p className="text-neutral-500 text-sm">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-neutral-500 text-sm">No products yet. Add one to get started.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/50 p-2"
            >
              <div className="w-10 h-10 rounded bg-neutral-700 shrink-0 overflow-hidden flex items-center justify-center">
                {p.image ? (
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Package className="h-5 w-5 text-neutral-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{p.name}</p>
                <p className="text-xs text-neutral-500">
                  ${p.price.toFixed(2)} · {p.category}
                  {!p.active && " · Hidden"}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-neutral-400 hover:text-white"
                  onClick={() => setEditingId(p.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-400 hover:text-red-300"
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
