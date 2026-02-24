"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { LcLiveHowToJoinContent, LcLiveHowToJoinStepItem } from "@/lib/types/cms";

export function LcLiveHowToJoinEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LcLiveHowToJoinContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("lcLiveHowToJoin").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "ctaText" | "ctaLink", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateStep = (index: number, field: keyof LcLiveHowToJoinStepItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const steps = [...prev.steps];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, steps };
    });
  };

  const addStep = () => {
    setForm((prev) =>
      prev
        ? { ...prev, steps: [...prev.steps, { step: String(prev.steps.length + 1), title: "", description: "" }] }
        : prev
    );
  };

  const removeStep = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.steps.length <= 1) return prev;
      const steps = prev.steps.filter((_, i) => i !== index);
      return { ...prev, steps };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("lcLiveHowToJoin", form);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Steps</Label>
          <Button type="button" variant="outline" size="sm" onClick={addStep} className="border-neutral-600 text-neutral-300">Add step</Button>
        </div>
        {form.steps.map((step, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">Step {i + 1}</p>
              {form.steps.length > 1 && (
                <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => removeStep(i)}>Remove</Button>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Step number (e.g. 1)</Label>
              <Input value={step.step} onChange={(e) => updateStep(i, "step", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={step.title} onChange={(e) => updateStep(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={step.description} onChange={(e) => updateStep(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label>Button text</Label>
        <Input value={form.ctaText} onChange={(e) => updateSection("ctaText", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Button link (optional)</Label>
        <Input value={form.ctaLink ?? ""} onChange={(e) => updateSection("ctaLink", e.target.value)} placeholder="/give" className="bg-neutral-800 border-neutral-700" />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
