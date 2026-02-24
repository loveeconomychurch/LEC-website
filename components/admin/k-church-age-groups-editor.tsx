"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { KChurchAgeGroupsContent, KChurchAgeGroupItem } from "@/lib/types/cms";

export function KChurchAgeGroupsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<KChurchAgeGroupsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("kChurchAgeGroups").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateGroup = (index: number, field: keyof KChurchAgeGroupItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const groups = [...prev.groups];
      groups[index] = { ...groups[index], [field]: value };
      return { ...prev, groups };
    });
  };

  const addGroup = () => {
    setForm((prev) =>
      prev
        ? { ...prev, groups: [...prev.groups, { age: "", title: "", description: "" }] }
        : prev
    );
  };

  const removeGroup = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.groups.length <= 1) return prev;
      const groups = prev.groups.filter((_, i) => i !== index);
      return { ...prev, groups };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("kChurchAgeGroups", form);
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
          <Label>Age groups</Label>
          <Button type="button" variant="outline" size="sm" onClick={addGroup} className="border-neutral-600 text-neutral-300">Add group</Button>
        </div>
        {form.groups.map((group, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">Group {i + 1}</p>
              {form.groups.length > 1 && (
                <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => removeGroup(i)}>Remove</Button>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Age range</Label>
              <Input value={group.age} onChange={(e) => updateGroup(i, "age", e.target.value)} placeholder="e.g. Ages 2-5" className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={group.title} onChange={(e) => updateGroup(i, "title", e.target.value)} placeholder="e.g. Little Kids" className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={group.description} onChange={(e) => updateGroup(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
