"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { LcLiveBenefitsContent, LcLiveBenefitItem } from "@/lib/types/cms";

const BENEFIT_ICONS: { value: LcLiveBenefitItem["icon"]; label: string }[] = [
  { value: "Calendar", label: "Calendar" },
  { value: "Wifi", label: "Wifi" },
  { value: "Users", label: "Users" },
  { value: "Heart", label: "Heart" },
];

export function LcLiveBenefitsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LcLiveBenefitsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("lcLiveBenefits").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateBenefit = (index: number, field: keyof LcLiveBenefitItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const benefits = [...prev.benefits];
      benefits[index] = { ...benefits[index], [field]: value };
      return { ...prev, benefits };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("lcLiveBenefits", form);
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
        <Label>Benefit cards</Label>
        {form.benefits.map((benefit, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <p className="text-sm text-neutral-400 font-medium">Card {i + 1}</p>
            <div className="space-y-2">
              <Label className="text-xs">Icon</Label>
              <select
                value={benefit.icon}
                onChange={(e) => updateBenefit(i, "icon", e.target.value as LcLiveBenefitItem["icon"])}
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
              >
                {BENEFIT_ICONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={benefit.title} onChange={(e) => updateBenefit(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={benefit.description} onChange={(e) => updateBenefit(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
