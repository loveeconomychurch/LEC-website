"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getMerchCategories } from "@/lib/merch";
import type { MerchProduct } from "@/lib/types/merch";

type FormState = {
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  order: string;
  active: boolean;
};

const defaultForm: FormState = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
  order: "0",
  active: true,
};

interface MerchProductFormProps {
  product?: MerchProduct | null;
  onSave: (data: {
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    order: number;
    active: boolean;
  }) => Promise<void>;
  onCancel: () => void;
}

export function MerchProductForm({ product, onSave, onCancel }: MerchProductFormProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>(
    product
      ? {
          name: product.name,
          price: String(product.price),
          image: product.image,
          category: product.category,
          description: product.description,
          order: String(product.order),
          active: product.active,
        }
      : defaultForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMerchCategories().then((list) => {
      setCategories((prev) => {
        const next = [...list];
        if (product?.category && !next.includes(product.category)) {
          next.push(product.category);
          next.sort();
        }
        return next;
      });
      if (!product && list.length > 0) {
        setForm((f) => (f.category ? f : { ...f, category: list[0] }));
      }
    });
  }, [product?.id, product?.category]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const price = parseFloat(form.price);
    const order = parseInt(form.order, 10) || 0;
    if (isNaN(price) || price < 0) {
      setError("Price must be a non-negative number.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        name: form.name.trim(),
        price,
        image: form.image.trim(),
        category: form.category.trim() || (categories[0] ?? "Apparel"),
        description: form.description.trim(),
        order,
        active: form.active,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="space-y-2">
        <Label className="text-neutral-300">Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. LEC T-Shirt"
          className="bg-neutral-800 border-neutral-700 text-white"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-neutral-300">Price ($)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="bg-neutral-800 border-neutral-700 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-neutral-300">Sort order</Label>
          <Input
            type="number"
            min="0"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-neutral-300">Category</Label>
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="flex h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1762B9]"
        >
          {categories.length === 0 && <option value="">Loading…</option>}
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <MediaUpload
        label="Product image"
        type="image"
        value={form.image}
        onChange={(url) => setForm((f) => ({ ...f, image: url }))}
        folder="merch"
      />
      <div className="space-y-2">
        <Label className="text-neutral-300">Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Short description for the store"
          className="min-h-[80px] bg-neutral-800 border-neutral-700 text-white"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={form.active}
          onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
          className="rounded border-neutral-600 bg-neutral-800"
        />
        <Label htmlFor="active" className="text-neutral-300 cursor-pointer">
          Visible on store
        </Label>
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
          {saving ? "Saving…" : product ? "Update product" : "Add product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="border-neutral-600 text-neutral-300">
          Cancel
        </Button>
      </div>
    </form>
  );
}
