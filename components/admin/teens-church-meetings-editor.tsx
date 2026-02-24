"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { TeensChurchMeetingsContent, TeensChurchMeetingItem } from "@/lib/types/cms";

export function TeensChurchMeetingsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<TeensChurchMeetingsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("teensChurchMeetings").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateMeeting = (index: number, field: keyof TeensChurchMeetingItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const meetings = [...prev.meetings];
      meetings[index] = { ...meetings[index], [field]: value };
      return { ...prev, meetings };
    });
  };

  const addMeeting = () => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            meetings: [
              ...prev.meetings,
              { day: "", time: "", location: "", description: "", imageUrl: "" },
            ],
          }
        : prev
    );
  };

  const removeMeeting = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.meetings.length <= 1) return prev;
      const meetings = prev.meetings.filter((_, i) => i !== index);
      return { ...prev, meetings };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("teensChurchMeetings", form);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Meeting times</Label>
          <Button type="button" variant="outline" size="sm" onClick={addMeeting} className="border-neutral-600 text-neutral-300">Add meeting</Button>
        </div>
        {form.meetings.map((meeting, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">Meeting {i + 1}</p>
              {form.meetings.length > 1 && (
                <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => removeMeeting(i)}>Remove</Button>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Day</Label>
              <Input value={meeting.day} onChange={(e) => updateMeeting(i, "day", e.target.value)} placeholder="e.g. Sunday" className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Time</Label>
              <Input value={meeting.time} onChange={(e) => updateMeeting(i, "time", e.target.value)} placeholder="e.g. 11:00 AM - 12:30 PM" className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Location</Label>
              <Input value={meeting.location} onChange={(e) => updateMeeting(i, "location", e.target.value)} placeholder="e.g. Teens Room" className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={meeting.description} onChange={(e) => updateMeeting(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            </div>
            <MediaUpload label="Image" type="image" value={meeting.imageUrl} onChange={(url) => updateMeeting(i, "imageUrl", url)} folder="teens-church" />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
