"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import type { GiveImpactContent, GiveImpactStatItem } from "@/lib/types/cms";

const ICON_OPTIONS: GiveImpactStatItem["icon"][] = ["Users", "TrendingUp", "Heart"];

export function GiveImpactEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<GiveImpactContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("giveImpact").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateStat = (index: number, field: keyof GiveImpactStatItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("giveImpact", form);
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
        <Input value={form.sectionSubtitle} onChange={(e) => updateSection("sectionSubtitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-4">
        <Label>Stats (3 items)</Label>
        {form.stats.map((stat, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <p className="text-sm text-neutral-400">Stat {i + 1}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Number</Label>
                <Input value={stat.number} onChange={(e) => updateStat(i, "number", e.target.value)} placeholder="50+" className="bg-neutral-800 border-neutral-700" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Label</Label>
                <Input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} className="bg-neutral-800 border-neutral-700" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Icon</Label>
              <select
                value={stat.icon}
                onChange={(e) => updateStat(i, "icon", e.target.value as GiveImpactStatItem["icon"])}
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
