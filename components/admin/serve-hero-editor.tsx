"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { ServeHeroContent } from "@/lib/types/cms";

export function ServeHeroEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<ServeHeroContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("serveHero").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof ServeHeroContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("serveHero", form);
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
        <Label>Title</Label>
        <Input value={form.title} onChange={(e) => update("title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Textarea value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
      </div>
      <MediaUpload label="Background image" type="image" value={form.backgroundImageUrl} onChange={(url) => update("backgroundImageUrl", url)} folder="serve" />
      <div className="space-y-2">
        <Label>Primary button text</Label>
        <Input value={form.primaryCta} onChange={(e) => update("primaryCta", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Secondary button text</Label>
        <Input value={form.secondaryCta} onChange={(e) => update("secondaryCta", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Secondary button link (optional)</Label>
        <Input value={form.secondaryCtaLink ?? ""} onChange={(e) => update("secondaryCtaLink", e.target.value)} placeholder="/contact" className="bg-neutral-800 border-neutral-700" />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
