"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { LiveStreamsContent, LiveStreamItem } from "@/lib/types/cms";

export function LiveStreamsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LiveStreamsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("liveStreams").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateStream = (index: number, field: keyof LiveStreamItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const streams = [...prev.streams];
      streams[index] = { ...streams[index], [field]: value };
      return { ...prev, streams };
    });
  };

  const addStream = () => {
    setForm((prev) => {
      if (!prev) return prev;
      const newStream: LiveStreamItem = {
        title: "",
        description: "",
        ctaLabel: "Watch",
        link: "",
      };
      return { ...prev, streams: [...prev.streams, newStream] };
    });
  };

  const removeStream = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.streams.length <= 1) return prev;
      const streams = prev.streams.filter((_, i) => i !== index);
      return { ...prev, streams };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("liveStreams", form);
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
        <Input value={form.sectionTitle} onChange={(e) => updateSection("sectionTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Section subtitle</Label>
        <Textarea value={form.sectionSubtitle} onChange={(e) => updateSection("sectionSubtitle", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Label>Streams (order shown on live page)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addStream} className="border-neutral-600 text-neutral-300 hover:bg-neutral-800">
            + Add stream
          </Button>
        </div>
        {form.streams.map((stream, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3 relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400 font-medium">{stream.title || `Stream ${i + 1}`}</p>
              {form.streams.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeStream(i)} className="text-red-400 hover:text-red-300 hover:bg-red-950/30">
                  Remove
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={stream.title} onChange={(e) => updateStream(i, "title", e.target.value)} placeholder="e.g. Sunday Service" className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={stream.description} onChange={(e) => updateStream(i, "description", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Button label</Label>
              <Input value={stream.ctaLabel} onChange={(e) => updateStream(i, "ctaLabel", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Link (YouTube URL for this stream)</Label>
              <Input value={stream.link} onChange={(e) => updateStream(i, "link", e.target.value)} placeholder="https://www.youtube.com/..." className="bg-neutral-800 border-neutral-700" />
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
