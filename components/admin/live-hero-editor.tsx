"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { LiveHeroContent } from "@/lib/types/cms";

export function LiveHeroEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LiveHeroContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("liveHero").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof LiveHeroContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("liveHero", form);
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
      <div className="space-y-2">
        <Label>Button text</Label>
        <Input value={form.ctaText} onChange={(e) => update("ctaText", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Button link (YouTube channel or live URL)</Label>
        <Input value={form.ctaLink} onChange={(e) => update("ctaLink", e.target.value)} placeholder="https://www.youtube.com/@YourChannel" className="bg-neutral-800 border-neutral-700" />
      </div>
      <MediaUpload label="Background image (optional)" type="image" value={form.backgroundImageUrl ?? ""} onChange={(url) => update("backgroundImageUrl", url)} folder="live" />
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
