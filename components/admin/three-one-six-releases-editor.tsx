"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { ThreeOneSixReleasesContent, ThreeOneSixReleaseItem } from "@/lib/types/cms";

export function ThreeOneSixReleasesEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<ThreeOneSixReleasesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("threeOneSixReleases").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateRelease = (index: number, field: keyof ThreeOneSixReleaseItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const releases = [...prev.releases];
      releases[index] = { ...releases[index], [field]: value };
      return { ...prev, releases };
    });
  };

  const addRelease = () => {
    setForm((prev) => {
      if (!prev) return prev;
      const newItem: ThreeOneSixReleaseItem = { title: "", artist: "", featuring: "", type: "Single", year: "", imageUrl: "" };
      return { ...prev, releases: [...prev.releases, newItem] };
    });
  };

  const removeRelease = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.releases.length <= 1) return prev;
      return { ...prev, releases: prev.releases.filter((_, i) => i !== index) };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("threeOneSixReleases", form);
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
        <Input value={form.sectionTitle} onChange={(e) => setForm((p) => (p ? { ...p, sectionTitle: e.target.value } : p))} className="bg-neutral-800 border-neutral-700" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>View All button text</Label>
          <Input value={form.viewAllText} onChange={(e) => setForm((p) => (p ? { ...p, viewAllText: e.target.value } : p))} className="bg-neutral-800 border-neutral-700" />
        </div>
        <div className="space-y-2">
          <Label>View All link (optional)</Label>
          <Input value={form.viewAllLink} onChange={(e) => setForm((p) => (p ? { ...p, viewAllLink: e.target.value } : p))} className="bg-neutral-800 border-neutral-700" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Releases</Label>
          <Button type="button" variant="outline" size="sm" onClick={addRelease} className="border-neutral-600 text-neutral-300 hover:bg-neutral-800">+ Add release</Button>
        </div>
        {form.releases.map((r, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Release {i + 1}</span>
              {form.releases.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removeRelease(i)} className="text-red-400">Remove</Button>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={r.title} onChange={(e) => updateRelease(i, "title", e.target.value)} placeholder="Title" className="bg-neutral-800 border-neutral-700" />
              <Input value={r.artist} onChange={(e) => updateRelease(i, "artist", e.target.value)} placeholder="Artist" className="bg-neutral-800 border-neutral-700" />
              <Input value={r.featuring} onChange={(e) => updateRelease(i, "featuring", e.target.value)} placeholder="Featuring" className="bg-neutral-800 border-neutral-700" />
              <Input value={r.type} onChange={(e) => updateRelease(i, "type", e.target.value)} placeholder="Type (Album/Single/EP)" className="bg-neutral-800 border-neutral-700" />
              <Input value={r.year} onChange={(e) => updateRelease(i, "year", e.target.value)} placeholder="Year" className="bg-neutral-800 border-neutral-700" />
            </div>
            <MediaUpload label="Cover image" type="image" value={r.imageUrl} onChange={(url) => updateRelease(i, "imageUrl", url)} folder="3one6" />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
