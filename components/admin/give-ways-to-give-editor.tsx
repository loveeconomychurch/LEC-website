"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { GiveWaysToGiveContent, GiveMethodItem } from "@/lib/types/cms";

const ICON_OPTIONS: GiveMethodItem["icon"][] = ["CreditCard", "Smartphone", "Building", "PiggyBank"];

export function GiveWaysToGiveEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<GiveWaysToGiveContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("giveWaysToGive").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateMethod = (index: number, field: keyof GiveMethodItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const methods = [...prev.methods];
      methods[index] = { ...methods[index], [field]: value };
      return { ...prev, methods };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("giveWaysToGive", form);
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
        <Input value={form.sectionTitle} onChange={(e) => updateSection("sectionTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Section subtitle</Label>
        <Textarea value={form.sectionSubtitle} onChange={(e) => updateSection("sectionSubtitle", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-4">
        <Label>Methods (4 cards)</Label>
        {form.methods.map((method, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <p className="text-sm text-neutral-400">Method {i + 1}</p>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={method.title} onChange={(e) => updateMethod(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Input value={method.description} onChange={(e) => updateMethod(i, "description", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Icon</Label>
              <select
                value={method.icon}
                onChange={(e) => updateMethod(i, "icon", e.target.value as GiveMethodItem["icon"])}
                className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
