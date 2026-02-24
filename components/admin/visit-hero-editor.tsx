"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { VisitHeroContent } from "@/lib/types/cms";

export function VisitHeroEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<VisitHeroContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("visitHero").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof VisitHeroContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("visitHero", form);
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
      {message && (
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>
      )}
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Subheadline</Label>
        <Textarea
          value={form.subheadline}
          onChange={(e) => update("subheadline", e.target.value)}
          rows={2}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <MediaUpload
        label="Background video (optional – falls back to home hero if empty)"
        type="video"
        value={form.videoUrl ?? ""}
        onChange={(url) => update("videoUrl", url)}
        folder="visit"
      />
      <MediaUpload
        label="Background image (optional – fallback when video fails)"
        type="image"
        value={form.backgroundImageUrl ?? ""}
        onChange={(url) => update("backgroundImageUrl", url)}
        folder="visit"
      />
      <div className="space-y-2">
        <Label>Button text</Label>
        <Input
          value={form.ctaText}
          onChange={(e) => update("ctaText", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Button link</Label>
        <Input
          value={form.ctaLink}
          onChange={(e) => update("ctaLink", e.target.value)}
          placeholder="/locations"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
