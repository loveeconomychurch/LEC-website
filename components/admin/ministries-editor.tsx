"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { getContent, setContent } from "@/lib/cms";
import type { MinistriesContent, MinistryCard } from "@/lib/types/cms";

const CARD_LABELS = ["1. Teens church", "2. K church", "3. Childrens ministry", "4. 3one6", "5. L.E.T.O.M"];

export function MinistriesEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<MinistriesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("ministries").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle" | "sectionSubtitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateCard = (index: number, field: keyof MinistryCard, value: string | boolean) => {
    setForm((prev) => {
      if (!prev) return prev;
      const cards = [...(prev.ministries ?? [])];
      while (cards.length <= index) {
        cards.push({
          label: "",
          headline: "",
          showLearnMore: false,
          icon: "",
        });
      }
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, ministries: cards };
    });
  };

  const ensureFiveCards = (): MinistryCard[] => {
    const cards = form.ministries ?? [];
    const result = [...cards];
    while (result.length < 5) {
      result.push({
        label: "",
        headline: "",
        showLearnMore: false,
        icon: "",
      });
    }
    return result.slice(0, 5);
  };

  const cards = ensureFiveCards();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("ministries", { ...form, ministries: cards });
      setMessage({ type: "ok", text: "Saved." });
      onSaved?.();
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Failed to save." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {message && (
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Label>Section title</Label>
        <Input
          value={form.sectionTitle}
          onChange={(e) => updateSection("sectionTitle", e.target.value)}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div className="space-y-2">
        <Label>Section subtitle</Label>
        <Textarea
          value={form.sectionSubtitle}
          onChange={(e) => updateSection("sectionSubtitle", e.target.value)}
          rows={2}
          className="bg-neutral-800 border-neutral-700"
        />
      </div>
      <div>
        <Label className="block mb-4">Ministry cards (matches home page layout)</Label>
        <div className="space-y-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-neutral-700 space-y-3"
            >
              <p className="text-sm font-medium text-neutral-400">{CARD_LABELS[i]}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Label (small text)</Label>
                  <Input
                    value={card.label}
                    onChange={(e) => updateCard(i, "label", e.target.value)}
                    placeholder="e.g. Teens church"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Headline (big text)</Label>
                  <Input
                    value={card.headline}
                    onChange={(e) => updateCard(i, "headline", e.target.value)}
                    placeholder="e.g. A vibrant place for growth..."
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`learn-${i}`}
                  checked={!!card.showLearnMore}
                  onCheckedChange={(checked) => updateCard(i, "showLearnMore", !!checked)}
                />
                <Label htmlFor={`learn-${i}`} className="text-xs">Show &quot;Learn more&quot; button</Label>
              </div>
              {card.showLearnMore && (
                <div className="space-y-1">
                  <Label className="text-xs">Learn more link</Label>
                  <Input
                    value={card.learnMoreLink ?? ""}
                    onChange={(e) => updateCard(i, "learnMoreLink", e.target.value)}
                    placeholder="e.g. /teens-church"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              )}
              {(i === 0 || i === 1) && (
                <div className="space-y-1">
                  <Label className="text-xs">Icon</Label>
                  <select
                    value={card.icon ?? ""}
                    onChange={(e) => updateCard(i, "icon", e.target.value as MinistryCard["icon"])}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white"
                  >
                    <option value="">None</option>
                    <option value="fastForward">Fast forward (Teens)</option>
                    <option value="smile">Smile (K church)</option>
                  </select>
                </div>
              )}
              {(i === 0 || i === 1 || i === 2 || i === 4) && (
                <div className="space-y-1">
                  <Label className="text-xs">Background color (Tailwind, e.g. green-700, black, yellow-700, amber-800)</Label>
                  <Input
                    value={card.bgColor ?? ""}
                    onChange={(e) => updateCard(i, "bgColor", e.target.value)}
                    placeholder="e.g. green-700"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              )}
              {i === 3 && (
                <div className="space-y-1">
                  <Label className="text-xs">Background image URL (e.g. /3one6.png)</Label>
                  <Input
                    value={card.backgroundImage ?? ""}
                    onChange={(e) => updateCard(i, "backgroundImage", e.target.value)}
                    placeholder="/3one6.png"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              )}
              {i === 4 && (
                <div className="space-y-1">
                  <Label className="text-xs">Video URL (e.g. /letom.mov)</Label>
                  <Input
                    value={card.videoUrl ?? ""}
                    onChange={(e) => updateCard(i, "videoUrl", e.target.value)}
                    placeholder="/letom.mov"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>
        {saving ? "Saving…" : "Save Ministries"}
      </Button>
    </form>
  );
}
