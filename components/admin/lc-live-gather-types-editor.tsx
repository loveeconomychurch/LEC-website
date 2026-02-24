"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { LcLiveGatherTypesContent, LcLiveGatherTypeItem } from "@/lib/types/cms";

export function LcLiveGatherTypesEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LcLiveGatherTypesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("lcLiveGatherTypes").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateType = (index: number, field: keyof LcLiveGatherTypeItem, value: string | string[]) => {
    setForm((prev) => {
      if (!prev) return prev;
      const types = [...prev.types];
      types[index] = { ...types[index], [field]: value };
      return { ...prev, types };
    });
  };

  const updateExample = (typeIndex: number, exampleIndex: number, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const types = [...prev.types];
      const examples = [...(types[typeIndex].examples || [])];
      examples[exampleIndex] = value;
      types[typeIndex] = { ...types[typeIndex], examples };
      return { ...prev, types };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("lcLiveGatherTypes", form);
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
      <div className="space-y-6">
        <Label>Gather type cards (3)</Label>
        {form.types.map((type, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <p className="text-sm text-neutral-400 font-medium">Card {i + 1}</p>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={type.title} onChange={(e) => updateType(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={type.description} onChange={(e) => updateType(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Examples (one per line)</Label>
              <Textarea
                value={(type.examples || []).join("\n")}
                onChange={(e) => updateType(i, "examples", e.target.value.split("\n").filter(Boolean))}
                rows={3}
                placeholder="Living rooms&#10;Family dinners"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
