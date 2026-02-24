"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import type { HeaderContent, HeaderNavLink } from "@/lib/types/cms";
import { Plus, Trash2 } from "lucide-react";

export function HeaderEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<HeaderContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("header").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof HeaderContent, value: string | HeaderNavLink[]) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateNavLink = (index: number, field: "label" | "href", value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = [...prev.navLinks];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, navLinks: next };
    });
  };

  const addNavLink = () => {
    setForm((prev) =>
      prev ? { ...prev, navLinks: [...prev.navLinks, { label: "", href: "/" }] } : prev
    );
  };

  const removeNavLink = (index: number) => {
    setForm((prev) =>
      prev
        ? { ...prev, navLinks: prev.navLinks.filter((_, i) => i !== index) }
        : prev
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("header", form);
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
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Label>Logo URL</Label>
        <Input
          value={form.logoUrl}
          onChange={(e) => update("logoUrl", e.target.value)}
          placeholder="/love-economy-church-logo.png"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Logo alt text</Label>
        <Input
          value={form.logoAlt}
          onChange={(e) => update("logoAlt", e.target.value)}
          placeholder="Love Economy Church Logo"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Search placeholder</Label>
        <Input
          value={form.searchPlaceholder}
          onChange={(e) => update("searchPlaceholder", e.target.value)}
          placeholder="Search"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Navigation links</Label>
          <Button type="button" variant="outline" size="sm" onClick={addNavLink} className="gap-1">
            <Plus className="h-4 w-4" />
            Add link
          </Button>
        </div>
        <div className="space-y-2">
          {form.navLinks.map((link, index) => (
            <div
              key={index}
              className="flex gap-2 items-center p-3 rounded-lg bg-neutral-800/50 border border-neutral-700"
            >
              <Input
                value={link.label}
                onChange={(e) => updateNavLink(index, "label", e.target.value)}
                placeholder="Label"
                className="bg-neutral-800 border-neutral-700 flex-1"
              />
              <Input
                value={link.href}
                onChange={(e) => updateNavLink(index, "href", e.target.value)}
                placeholder="/path"
                className="bg-neutral-800 border-neutral-700 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeNavLink(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/30 shrink-0"
                aria-label="Remove link"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Header"}
      </Button>
    </form>
  );
}
