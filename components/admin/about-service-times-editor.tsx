"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { getContent, setContent } from "@/lib/cms";
import type { AboutServiceTimesContent, ServiceTimeItem } from "@/lib/types/cms";

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

  const updateSundayService = (i: number, field: keyof ServiceTimeItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const sundayServices = prev.sundayServices.map((s, idx) => (idx === i ? { ...s, [field]: value } : s));
      return { ...prev, sundayServices };
    });
  };

  const addSundayService = () => {
    setForm((prev) => (prev ? { ...prev, sundayServices: [...prev.sundayServices, { label: "", time: "" }] } : prev));
  };

  const removeSundayService = (i: number) => {
    setForm((prev) => (prev ? { ...prev, sundayServices: prev.sundayServices.filter((_, idx) => idx !== i) } : prev));
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

      <div className="space-y-3">
        <Label>Sunday services</Label>
        {form.sundayServices.map((service, i) => (
          <div key={i} className="flex gap-2 items-start">
            <Input
              value={service.label}
              onChange={(e) => updateSundayService(i, "label", e.target.value)}
              placeholder="e.g. Sunday Love Service"
              className="bg-neutral-800 border-neutral-700"
            />
            <Input
              value={service.time}
              onChange={(e) => updateSundayService(i, "time", e.target.value)}
              placeholder="e.g. 9:00 AM"
              className="bg-neutral-800 border-neutral-700"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeSundayService(i)}
              disabled={form.sundayServices.length <= 1}
              className="shrink-0 border-neutral-700"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addSundayService} className="border-neutral-700">
          <Plus className="size-4 mr-1" /> Add Sunday service
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
