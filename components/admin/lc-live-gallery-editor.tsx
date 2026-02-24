"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { LcLiveGalleryContent } from "@/lib/types/cms";

export function LcLiveGalleryEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LcLiveGalleryContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("lcLiveGallery").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof LcLiveGalleryContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("lcLiveGallery", form);
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
      <div className="space-y-2 p-4 rounded-lg border border-neutral-700">
        <Label>Image 1</Label>
        <MediaUpload label="" type="image" value={form.image1Url} onChange={(url) => update("image1Url", url)} folder="lc-live" />
        <Input value={form.image1Alt} onChange={(e) => update("image1Alt", e.target.value)} placeholder="Alt text" className="bg-neutral-800 border-neutral-700 mt-2" />
      </div>
      <div className="space-y-2 p-4 rounded-lg border border-neutral-700">
        <Label>Image 2</Label>
        <MediaUpload label="" type="image" value={form.image2Url} onChange={(url) => update("image2Url", url)} folder="lc-live" />
        <Input value={form.image2Alt} onChange={(e) => update("image2Alt", e.target.value)} placeholder="Alt text" className="bg-neutral-800 border-neutral-700 mt-2" />
      </div>
      <div className="space-y-2 p-4 rounded-lg border border-neutral-700">
        <Label>Image 3</Label>
        <MediaUpload label="" type="image" value={form.image3Url} onChange={(url) => update("image3Url", url)} folder="lc-live" />
        <Input value={form.image3Alt} onChange={(e) => update("image3Alt", e.target.value)} placeholder="Alt text" className="bg-neutral-800 border-neutral-700 mt-2" />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
