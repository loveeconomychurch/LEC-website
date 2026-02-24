"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContent, setContent } from "@/lib/cms";
import type { LatestSermonContent } from "@/lib/types/cms";

export function LatestSermonEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LatestSermonContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("latestSermon").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof LatestSermonContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("latestSermon", form);
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
        <Label>Section title</Label>
        <Input
          value={form.sectionTitle}
          onChange={(e) => update("sectionTitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Sermon title</Label>
        <Input
          value={form.sermonTitle}
          onChange={(e) => update("sermonTitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Speaker</Label>
        <Input
          value={form.speaker}
          onChange={(e) => update("speaker", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Thumbnail image URL</Label>
        <Input
          value={form.thumbnailUrl}
          onChange={(e) => update("thumbnailUrl", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Video URL (e.g. YouTube embed or link)</Label>
        <Input
          value={form.videoUrl}
          onChange={(e) => update("videoUrl", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Watch more button text</Label>
        <Input
          value={form.watchMoreLabel}
          onChange={(e) => update("watchMoreLabel", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Watch more link (opens in new tab)</Label>
        <Input
          value={form.watchMoreUrl}
          onChange={(e) => update("watchMoreUrl", e.target.value)}
          placeholder="https://youtube.com/..."
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Latest Sermon"}
      </Button>
    </form>
  );
}
