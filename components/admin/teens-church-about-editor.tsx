"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { TeensChurchAboutContent } from "@/lib/types/cms";

export function TeensChurchAboutEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<TeensChurchAboutContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("teensChurchAbout").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof TeensChurchAboutContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("teensChurchAbout", form);
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
        <Input value={form.sectionTitle} onChange={(e) => update("sectionTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Paragraph 1</Label>
        <Textarea value={form.paragraph1} onChange={(e) => update("paragraph1", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Paragraph 2</Label>
        <Textarea value={form.paragraph2} onChange={(e) => update("paragraph2", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Paragraph 3</Label>
        <Textarea value={form.paragraph3} onChange={(e) => update("paragraph3", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
      </div>
      <MediaUpload label="Gallery image 1" type="image" value={form.image1Url} onChange={(url) => update("image1Url", url)} folder="teens-church" />
      <MediaUpload label="Gallery image 2" type="image" value={form.image2Url} onChange={(url) => update("image2Url", url)} folder="teens-church" />
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
