"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import type { ThreeOneSixListenNowContent, ThreeOneSixPlatformItem } from "@/lib/types/cms";

export function ThreeOneSixListenNowEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<ThreeOneSixListenNowContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("threeOneSixListenNow").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updatePlatform = (index: number, field: keyof ThreeOneSixPlatformItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const platforms = [...prev.platforms];
      platforms[index] = { ...platforms[index], [field]: value };
      return { ...prev, platforms };
    });
  };

  const addPlatform = () => {
    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, platforms: [...prev.platforms, { label: "", url: "" }] };
    });
  };

  const removePlatform = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.platforms.length <= 1) return prev;
      return { ...prev, platforms: prev.platforms.filter((_, i) => i !== index) };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("threeOneSixListenNow", form);
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
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}
      <div className="space-y-2">
        <Label>Section title</Label>
        <Input value={form.sectionTitle} onChange={(e) => setForm((p) => (p ? { ...p, sectionTitle: e.target.value } : p))} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Streaming platforms</Label>
          <Button type="button" variant="outline" size="sm" onClick={addPlatform} className="border-neutral-600 text-neutral-300 hover:bg-neutral-800">+ Add</Button>
        </div>
        {form.platforms.map((p, i) => (
          <div key={i} className="flex gap-2 items-center p-3 rounded-lg border border-neutral-700">
            <Input value={p.label} onChange={(e) => updatePlatform(i, "label", e.target.value)} placeholder="Label" className="bg-neutral-800 border-neutral-700 flex-1" />
            <Input value={p.url} onChange={(e) => updatePlatform(i, "url", e.target.value)} placeholder="URL" className="bg-neutral-800 border-neutral-700 flex-1" />
            {form.platforms.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => removePlatform(i)} className="text-red-400">Remove</Button>
            )}
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
