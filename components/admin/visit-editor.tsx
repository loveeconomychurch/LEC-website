"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { VisitContent } from "@/lib/types/cms";

export function VisitEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<VisitContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("visit").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof VisitContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("visit", form);
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
        <Label>Subheadline</Label>
        <Textarea
          value={form.subheadline}
          onChange={(e) => update("subheadline", e.target.value)}
          rows={2}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card title</Label>
        <Input
          value={form.cardTitle}
          onChange={(e) => update("cardTitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card subtitle</Label>
        <Input
          value={form.cardSubtitle}
          onChange={(e) => update("cardSubtitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card button text</Label>
        <Input
          value={form.cardCta}
          onChange={(e) => update("cardCta", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card button link</Label>
        <Input
          value={form.cardCtaLink ?? ""}
          onChange={(e) => update("cardCtaLink", e.target.value)}
          placeholder="/locations"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <MediaUpload
        label="Card image"
        type="image"
        value={form.cardImageUrl}
        onChange={(url) => update("cardImageUrl", url)}
        folder="visit-cards"
      />
      <div className="space-y-2 pt-4 border-t border-neutral-700">
        <Label className="text-neutral-400">Second card</Label>
      </div>
      <div className="space-y-2">
        <Label>Card 2 title</Label>
        <Input
          value={form.card2Title}
          onChange={(e) => update("card2Title", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card 2 subtitle</Label>
        <Input
          value={form.card2Subtitle}
          onChange={(e) => update("card2Subtitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card 2 button text</Label>
        <Input
          value={form.card2Cta}
          onChange={(e) => update("card2Cta", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Card 2 button link</Label>
        <Input
          value={form.card2CtaLink ?? ""}
          onChange={(e) => update("card2CtaLink", e.target.value)}
          placeholder="/groups"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <MediaUpload
        label="Card 2 image"
        type="image"
        value={form.card2ImageUrl}
        onChange={(url) => update("card2ImageUrl", url)}
        folder="visit-cards"
      />
      <div className="space-y-2 pt-4 border-t border-neutral-700">
        <Label>Call for Directions headline</Label>
        <Input
          value={form.directionsHeadline}
          onChange={(e) => update("directionsHeadline", e.target.value)}
          placeholder="Need directions? Give us a call."
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Directions phone number</Label>
        <Input
          value={form.directionsPhone}
          onChange={(e) => update("directionsPhone", e.target.value)}
          placeholder="+233 24 123 4567"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Directions button text</Label>
        <Input
          value={form.directionsButtonText ?? ""}
          onChange={(e) => update("directionsButtonText", e.target.value)}
          placeholder="Call for directions"
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Visit"}
      </Button>
    </form>
  );
}
