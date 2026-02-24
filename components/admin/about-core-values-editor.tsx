"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { AboutCoreValuesContent, AboutCoreValueItem } from "@/lib/types/cms";

export function AboutCoreValuesEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<AboutCoreValuesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("aboutCoreValues").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "coreValuesTitle" | "coreValuesSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateValue = (index: number, field: keyof AboutCoreValueItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = [...prev.coreValues];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, coreValues: next };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("aboutCoreValues", form);
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
        <Input value={form.coreValuesTitle} onChange={(e) => updateSection("coreValuesTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Section subtitle</Label>
        <Input value={form.coreValuesSubtitle} onChange={(e) => updateSection("coreValuesSubtitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      {form.coreValues.map((v, i) => (
        <div key={i} className="rounded-lg border border-neutral-700 p-4 space-y-2">
          <Label className="text-neutral-400">Value {i + 1}</Label>
          <Input placeholder="Title" value={v.title} onChange={(e) => updateValue(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
          <Textarea placeholder="Description" value={v.description} onChange={(e) => updateValue(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
        </div>
      ))}
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
