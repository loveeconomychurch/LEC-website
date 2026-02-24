"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaUpload } from "@/components/admin/media-upload";
import { getContent, setContent } from "@/lib/cms";
import type { ThreeOneSixArtistsContent, ThreeOneSixArtistItem } from "@/lib/types/cms";

export function ThreeOneSixArtistsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<ThreeOneSixArtistsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("threeOneSixArtists").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateArtist = (index: number, field: keyof ThreeOneSixArtistItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const artists = [...prev.artists];
      artists[index] = { ...artists[index], [field]: value };
      return { ...prev, artists };
    });
  };

  const addArtist = () => {
    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, artists: [...prev.artists, { name: "", role: "", imageUrl: "" }] };
    });
  };

  const removeArtist = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.artists.length <= 1) return prev;
      return { ...prev, artists: prev.artists.filter((_, i) => i !== index) };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("threeOneSixArtists", form);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Artists</Label>
          <Button type="button" variant="outline" size="sm" onClick={addArtist} className="border-neutral-600 text-neutral-300 hover:bg-neutral-800">+ Add artist</Button>
        </div>
        {form.artists.map((a, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Artist {i + 1}</span>
              {form.artists.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removeArtist(i)} className="text-red-400">Remove</Button>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={a.name} onChange={(e) => updateArtist(i, "name", e.target.value)} placeholder="Name" className="bg-neutral-800 border-neutral-700" />
              <Input value={a.role} onChange={(e) => updateArtist(i, "role", e.target.value)} placeholder="Role" className="bg-neutral-800 border-neutral-700" />
            </div>
            <MediaUpload label="Image" type="image" value={a.imageUrl} onChange={(url) => updateArtist(i, "imageUrl", url)} folder="3one6" />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
