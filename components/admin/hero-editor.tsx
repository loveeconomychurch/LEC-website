"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { HeroContent } from "@/lib/types/cms";

export function HeroEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<HeroContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("hero").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof HeroContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("hero", form);
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
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Label>Headline</Label>
        <Input
          value={form.headline}
          onChange={(e) => update("headline", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Textarea
          value={form.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
          rows={3}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Service times (e.g. Sundays 9am…)</Label>
        <Input
          value={form.serviceTimes}
          onChange={(e) => update("serviceTimes", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Primary button text</Label>
        <Input
          value={form.primaryCta}
          onChange={(e) => update("primaryCta", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Primary button link (e.g. /visit)</Label>
        <Input
          value={form.primaryCtaLink ?? ""}
          onChange={(e) => update("primaryCtaLink", e.target.value)}
          placeholder="/visit"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Secondary button text</Label>
        <Input
          value={form.secondaryCta}
          onChange={(e) => update("secondaryCta", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Secondary button link (e.g. /give)</Label>
        <Input
          value={form.secondaryCtaLink ?? ""}
          onChange={(e) => update("secondaryCtaLink", e.target.value)}
          placeholder="/give"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <MediaUpload
        label="Hero video (MP4/WebM)"
        type="video"
        value={form.videoUrl}
        onChange={(url) => update("videoUrl", url)}
        folder="hero"
      />
      <MediaUpload
        label="Background image (fallback when video fails)"
        type="image"
        value={form.backgroundImageUrl}
        onChange={(url) => update("backgroundImageUrl", url)}
        folder="hero"
      />
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Hero"}
      </Button>
    </form>
  );
}
