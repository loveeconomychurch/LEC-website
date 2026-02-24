"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { AboutMessageContent } from "@/lib/types/cms";

export function AboutMessageEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<AboutMessageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("aboutMessage").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof AboutMessageContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("aboutMessage", form);
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
        <Input value={form.messageTitle} onChange={(e) => update("messageTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Tagline</Label>
        <Input value={form.messageTagline} onChange={(e) => update("messageTagline", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="rounded-lg border border-neutral-700 p-4 space-y-3">
        <Label className="text-neutral-300">Point 1</Label>
        <Input value={form.messagePoint1Title} onChange={(e) => update("messagePoint1Title", e.target.value)} placeholder="Point 1 title" className="bg-neutral-800 border-neutral-700" />
        <Input value={form.messagePoint1aTitle} onChange={(e) => update("messagePoint1aTitle", e.target.value)} placeholder="1a title" className="bg-neutral-800 border-neutral-700" />
        <Textarea value={form.messagePoint1aText} onChange={(e) => update("messagePoint1aText", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
        <Input value={form.messagePoint1bTitle} onChange={(e) => update("messagePoint1bTitle", e.target.value)} placeholder="1b title" className="bg-neutral-800 border-neutral-700" />
        <Textarea value={form.messagePoint1bText} onChange={(e) => update("messagePoint1bText", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="rounded-lg border border-neutral-700 p-4 space-y-3">
        <Label className="text-neutral-300">Point 2</Label>
        <Input value={form.messagePoint2Title} onChange={(e) => update("messagePoint2Title", e.target.value)} placeholder="Point 2 title" className="bg-neutral-800 border-neutral-700" />
        <Input value={form.messagePoint2aTitle} onChange={(e) => update("messagePoint2aTitle", e.target.value)} placeholder="2a title" className="bg-neutral-800 border-neutral-700" />
        <Textarea value={form.messagePoint2aText} onChange={(e) => update("messagePoint2aText", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
        <Input value={form.messagePoint2bTitle} onChange={(e) => update("messagePoint2bTitle", e.target.value)} placeholder="2b title" className="bg-neutral-800 border-neutral-700" />
        <Textarea value={form.messagePoint2bText} onChange={(e) => update("messagePoint2bText", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
