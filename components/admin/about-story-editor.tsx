"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { AboutStoryContent } from "@/lib/types/cms";

export function AboutStoryEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<AboutStoryContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("aboutStory").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof AboutStoryContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("aboutStory", form);
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
        <Input value={form.storyTitle} onChange={(e) => update("storyTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      {(["storyParagraph1", "storyParagraph2", "storyParagraph3"] as const).map((key, i) => (
        <div key={key} className="space-y-2">
          <Label>Paragraph {i + 1}</Label>
          <Textarea value={form[key]} onChange={(e) => update(key, e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
        </div>
      ))}
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
