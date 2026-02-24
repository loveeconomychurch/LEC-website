"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMerchCategories, setMerchCategories } from "@/lib/merch";
import { Plus, Tag, Loader2, Trash2, AlertCircle } from "lucide-react";

export function MerchCategoriesEditor() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getMerchCategories();
      setCategories(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addCategory = async () => {
    const name = newName.trim();
    if (!name) return;
    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setError("This category already exists.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const next = [...categories, name].sort((a, b) => a.localeCompare(b));
      await setMerchCategories(next);
      setCategories(next);
      setNewName("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add category");
    } finally {
      setSaving(false);
    }
  };

  const removeCategory = async (name: string) => {
    setSaving(true);
    setError(null);
    try {
      const next = categories.filter((c) => c !== name);
      await setMerchCategories(next);
      setCategories(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to remove category");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-neutral-500" />
        <p className="text-sm text-neutral-500">Loading categories…</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/30 px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1762B9]/20">
            <Tag className="h-5 w-5 text-[#1762B9]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Categories</h1>
            <p className="text-sm text-neutral-500 mt-0.5 max-w-xl">
              Categories are used when adding or editing products. They appear in the product dropdown and as filters on the store (e.g. Apparel, Accessories).
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-200">{error}</p>
              <button
                type="button"
                onClick={() => setError(null)}
                className="mt-2 text-xs text-red-300 hover:text-red-200 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Add category */}
        <section>
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Add category
          </h2>
          <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-4 max-w-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
                placeholder="e.g. Apparel, Accessories, Books"
                className="flex-1 h-10 bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-[#1762B9] focus:ring-[#1762B9]/30"
                disabled={saving}
              />
              <Button
                type="button"
                onClick={addCategory}
                disabled={saving || !newName.trim()}
                className="shrink-0 h-10 px-5 bg-[#1762B9] hover:bg-[#1762B9]/90 text-white"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add category
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Press Enter to add. Names are sorted alphabetically.
            </p>
          </div>
        </section>

        {/* Category list */}
        <section>
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Current categories
            {categories.length > 0 && (
              <span className="ml-2 text-neutral-500 font-normal normal-case">
                ({categories.length})
              </span>
            )}
          </h2>

          {categories.length === 0 ? (
            <div className="rounded-xl border border-neutral-700 border-dashed bg-neutral-800/30 p-12 text-center max-w-xl">
              <Tag className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-neutral-400">No categories yet</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Add a category above to get started. You’ll be able to assign it to products when adding or editing them.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-700 bg-neutral-800/50 px-4 py-3 hover:border-neutral-600 hover:bg-neutral-800 transition-colors"
                >
                  <span className="font-medium text-white truncate">{cat}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(cat)}
                    disabled={saving}
                    className="shrink-0 h-8 w-8 p-0 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                    aria-label={`Remove ${cat}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
