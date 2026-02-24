"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { LetomGetInvolvedContent } from "@/lib/types/cms";

export function LetomGetInvolvedEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<LetomGetInvolvedContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("letomGetInvolved").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof LetomGetInvolvedContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("letomGetInvolved", form);
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
        <Input value={form.sectionTitle} onChange={(e) => update("sectionTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Textarea value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="border-t border-neutral-700 pt-4 space-y-4">
        <Label className="text-neutral-300">For High Schools</Label>
        <div className="space-y-2">
          <Label className="text-xs">Title</Label>
          <Input value={form.forSchoolsTitle} onChange={(e) => update("forSchoolsTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Body</Label>
          <Textarea value={form.forSchoolsBody} onChange={(e) => update("forSchoolsBody", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Button text</Label>
          <Input value={form.forSchoolsCta} onChange={(e) => update("forSchoolsCta", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Button link (optional)</Label>
          <Input value={form.forSchoolsCtaLink ?? ""} onChange={(e) => update("forSchoolsCtaLink", e.target.value)} placeholder="/visit or mailto:..." className="bg-neutral-800 border-neutral-700" />
        </div>
      </div>
      <div className="border-t border-neutral-700 pt-4 space-y-4">
        <Label className="text-neutral-300">For Volunteers</Label>
        <div className="space-y-2">
          <Label className="text-xs">Title</Label>
          <Input value={form.forVolunteersTitle} onChange={(e) => update("forVolunteersTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Body</Label>
          <Textarea value={form.forVolunteersBody} onChange={(e) => update("forVolunteersBody", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Button text</Label>
          <Input value={form.forVolunteersCta} onChange={(e) => update("forVolunteersCta", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Button link (optional)</Label>
          <Input value={form.forVolunteersCtaLink ?? ""} onChange={(e) => update("forVolunteersCtaLink", e.target.value)} placeholder="/serve or #contact" className="bg-neutral-800 border-neutral-700" />
        </div>
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
