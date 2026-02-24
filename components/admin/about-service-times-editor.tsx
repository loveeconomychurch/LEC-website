"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import type { AboutServiceTimesContent } from "@/lib/types/cms";

export function AboutServiceTimesEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<AboutServiceTimesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("aboutServiceTimes").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof AboutServiceTimesContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("aboutServiceTimes", form);
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
        <Input value={form.serviceTimesTitle} onChange={(e) => update("serviceTimesTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Sunday label</Label>
          <Input value={form.sundayLabel} onChange={(e) => update("sundayLabel", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label>Sunday time</Label>
          <Input value={form.sundayTime} onChange={(e) => update("sundayTime", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label>Wednesday label</Label>
          <Input value={form.wednesdayLabel} onChange={(e) => update("wednesdayLabel", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label>Wednesday time</Label>
          <Input value={form.wednesdayTime} onChange={(e) => update("wednesdayTime", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Button text</Label>
        <Input value={form.visitCtaText} onChange={(e) => update("visitCtaText", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
