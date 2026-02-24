"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaGalleryModal, SITE_MEDIA_FOLDER } from "@/components/admin/media-gallery-modal";
import { getContent, setContent } from "@/lib/cms";
import type { WelcomeContent } from "@/lib/types/cms";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";

export function WelcomeEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<WelcomeContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryTarget, setGalleryTarget] = useState<number | "add" | null>(null);

  useEffect(() => {
    getContent("welcome").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof WelcomeContent, value: string | string[]) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const marqueeImages = form.marqueeImages ?? [];

  const setMarqueeImage = (index: number, url: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = [...(prev.marqueeImages ?? [])];
      next[index] = url;
      return { ...prev, marqueeImages: next };
    });
  };

  const addMarqueeImage = (url: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, marqueeImages: [...(prev.marqueeImages ?? []), url] };
    });
  };

  const removeMarqueeImage = (index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = (prev.marqueeImages ?? []).filter((_, i) => i !== index);
      return { ...prev, marqueeImages: next };
    });
  };

  const handleGallerySelect = (url: string) => {
    if (galleryTarget === "add") {
      addMarqueeImage(url);
    } else if (typeof galleryTarget === "number") {
      setMarqueeImage(galleryTarget, url);
    }
    setGalleryOpen(false);
    setGalleryTarget(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("welcome", form);
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
        <Label>Label (small text above headline)</Label>
        <Input
          value={form.label}
          onChange={(e) => update("label", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Headline</Label>
        <Textarea
          value={form.headline}
          onChange={(e) => update("headline", e.target.value)}
          rows={3}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Visit button text</Label>
          <Input
            value={form.visitCta}
            onChange={(e) => update("visitCta", e.target.value)}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        <div className="space-y-2">
          <Label>Visit button link (optional)</Label>
          <Input
            value={form.visitCtaLink ?? ""}
            onChange={(e) => update("visitCtaLink", e.target.value)}
            placeholder="/visit"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        <div className="space-y-2">
          <Label>About button text</Label>
          <Input
            value={form.aboutCta}
            onChange={(e) => update("aboutCta", e.target.value)}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        <div className="space-y-2">
          <Label>About button link (optional)</Label>
          <Input
            value={form.aboutCtaLink ?? ""}
            onChange={(e) => update("aboutCtaLink", e.target.value)}
            placeholder="/about"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Marquee images</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-neutral-600 text-neutral-300"
            onClick={() => {
              setGalleryTarget("add");
              setGalleryOpen(true);
            }}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Add from gallery
          </Button>
        </div>
        <p className="text-xs text-neutral-500">
          Images shown in the scrolling marquee. Use the site media gallery to upload or pick images.
        </p>
        {marqueeImages.length === 0 ? (
          <p className="text-sm text-neutral-400 py-4">No marquee images yet. Add one from the gallery.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {marqueeImages.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="relative group rounded-lg border border-neutral-700 overflow-hidden bg-neutral-800 aspect-[3/4]"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setGalleryTarget(i);
                      setGalleryOpen(true);
                    }}
                    title="Change image"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    onClick={() => removeMarqueeImage(i)}
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MediaGalleryModal
        open={galleryOpen}
        onOpenChange={(open) => {
          setGalleryOpen(open);
          if (!open) setGalleryTarget(null);
        }}
        folder={SITE_MEDIA_FOLDER}
        type="image"
        onSelect={handleGallerySelect}
      />

      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Welcome"}
      </Button>
    </form>
  );
}
