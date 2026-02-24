"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { EventsFeaturedContent, EventsFeaturedEventItem } from "@/lib/types/cms";

export function EventsFeaturedEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<EventsFeaturedContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("eventsFeatured").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateEvent = (index: number, field: keyof EventsFeaturedEventItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const events = [...prev.events];
      events[index] = { ...events[index], [field]: value };
      return { ...prev, events };
    });
  };

  const addEvent = () => {
    setForm((prev) =>
      prev
        ? { ...prev, events: [...prev.events, { title: "", imageUrl: "", date: "", location: "" }] }
        : prev
    );
  };

  const removeEvent = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.events.length <= 1) return prev;
      const events = prev.events.filter((_, i) => i !== index);
      return { ...prev, events };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("eventsFeatured", form);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Featured event cards</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEvent} className="border-neutral-600 text-neutral-300">Add event</Button>
        </div>
        {form.events.map((event, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">Event {i + 1}</p>
              {form.events.length > 1 && (
                <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => removeEvent(i)}>Remove</Button>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={event.title} onChange={(e) => updateEvent(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <MediaUpload label="Image" type="image" value={event.imageUrl} onChange={(url) => updateEvent(i, "imageUrl", url)} folder="events" />
            <div className="space-y-2">
              <Label className="text-xs">Date (e.g. Dec 24, 7:00 PM)</Label>
              <Input value={event.date ?? ""} onChange={(e) => updateEvent(i, "date", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Location</Label>
              <Input value={event.location ?? ""} onChange={(e) => updateEvent(i, "location", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
