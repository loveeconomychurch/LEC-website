"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { FooterContent } from "@/lib/types/cms";

export function FooterEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<FooterContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("footer").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const update = (field: keyof FooterContent, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("footer", form);
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
        <Label>Tagline (under logo)</Label>
        <Textarea
          value={form.tagline}
          onChange={(e) => update("tagline", e.target.value)}
          rows={2}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Newsletter title</Label>
        <Input
          value={form.newsletterTitle}
          onChange={(e) => update("newsletterTitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Newsletter placeholder</Label>
        <Input
          value={form.newsletterPlaceholder}
          onChange={(e) => update("newsletterPlaceholder", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Newsletter button text</Label>
        <Input
          value={form.newsletterButton}
          onChange={(e) => update("newsletterButton", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Newsletter description</Label>
        <Textarea
          value={form.newsletterDescription}
          onChange={(e) => update("newsletterDescription", e.target.value)}
          rows={2}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Footer"}
      </Button>
    </form>
  );
}
