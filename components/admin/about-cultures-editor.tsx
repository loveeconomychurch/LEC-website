"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { AboutCulturesContent, AboutCultureItem } from "@/lib/types/cms";

export function AboutCulturesEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<AboutCulturesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("aboutCultures").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "culturesTitle" | "culturesSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateCulture = (index: number, field: keyof AboutCultureItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = [...prev.cultures];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, cultures: next };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("aboutCultures", form);
      setMessage({ type: "ok", text: "Saved." });
      onSaved?.();
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Failed to save." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl pb-12">
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}
      <div className="space-y-2">
        <Label>Section title</Label>
        <Input value={form.culturesTitle} onChange={(e) => updateSection("culturesTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Section subtitle</Label>
        <Input value={form.culturesSubtitle} onChange={(e) => updateSection("culturesSubtitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-4">
        {form.cultures.map((c, i) => (
          <div key={i} className="rounded-lg border border-neutral-700 p-4 space-y-2">
            <p className="text-sm text-neutral-500">Culture {i + 1}</p>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Number" value={c.number} onChange={(e) => updateCulture(i, "number", e.target.value)} className="bg-neutral-800 border-neutral-700" />
              <Input placeholder="Title" value={c.title} onChange={(e) => updateCulture(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <Textarea placeholder="Description" value={c.description} onChange={(e) => updateCulture(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            <Input placeholder="References" value={c.references} onChange={(e) => updateCulture(i, "references", e.target.value)} className="bg-neutral-800 border-neutral-700" />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
