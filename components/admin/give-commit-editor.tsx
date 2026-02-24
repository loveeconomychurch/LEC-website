"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { GiveCommitContent } from "@/lib/types/cms";

export function GiveCommitEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<GiveCommitContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("giveCommit").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateTither = (field: keyof GiveCommitContent["tither"], value: string | string[]) => {
    setForm((prev) => (prev ? { ...prev, tither: { ...prev.tither, [field]: value } } : prev));
  };

  const updatePartner = (field: keyof GiveCommitContent["partner"], value: string | string[]) => {
    setForm((prev) => (prev ? { ...prev, partner: { ...prev.partner, [field]: value } } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("giveCommit", form);
      setMessage({ type: "ok", text: "Saved." });
      onSaved?.();
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Failed to save." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}
      <div className="space-y-2">
        <Label>Section title</Label>
        <Input value={form.sectionTitle} onChange={(e) => updateSection("sectionTitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="space-y-2">
        <Label>Section subtitle</Label>
        <Input value={form.sectionSubtitle} onChange={(e) => updateSection("sectionSubtitle", e.target.value)} className="bg-neutral-800 border-neutral-700" />
      </div>

      <div className="space-y-4 p-4 rounded-lg border border-neutral-700">
        <p className="text-sm font-medium text-neutral-300">Become a Tither</p>
        <div className="space-y-2">
          <Label className="text-xs">Title</Label>
          <Input value={form.tither.title} onChange={(e) => updateTither("title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Description</Label>
          <Textarea value={form.tither.description} onChange={(e) => updateTither("description", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Bullets (one per line)</Label>
          <Textarea
            value={form.tither.bullets.join("\n")}
            onChange={(e) => updateTither("bullets", e.target.value.split("\n").filter(Boolean))}
            rows={3}
            placeholder="One bullet per line"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Button text</Label>
          <Input value={form.tither.buttonText} onChange={(e) => updateTither("buttonText", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
      </div>

      <div className="space-y-4 p-4 rounded-lg border border-neutral-700">
        <p className="text-sm font-medium text-neutral-300">Become a Partner</p>
        <div className="space-y-2">
          <Label className="text-xs">Title</Label>
          <Input value={form.partner.title} onChange={(e) => updatePartner("title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Description</Label>
          <Textarea value={form.partner.description} onChange={(e) => updatePartner("description", e.target.value)} rows={3} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Bullets (one per line)</Label>
          <Textarea
            value={form.partner.bullets.join("\n")}
            onChange={(e) => updatePartner("bullets", e.target.value.split("\n").filter(Boolean))}
            rows={3}
            placeholder="One bullet per line"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Button text</Label>
          <Input value={form.partner.buttonText} onChange={(e) => updatePartner("buttonText", e.target.value)} className="bg-neutral-800 border-neutral-700" />
        </div>
      </div>

      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
