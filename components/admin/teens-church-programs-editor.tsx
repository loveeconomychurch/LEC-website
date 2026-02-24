"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContent, setContent } from "@/lib/cms";
import type { TeensChurchProgramsContent, TeensChurchProgramItem } from "@/lib/types/cms";

const ICON_OPTIONS: TeensChurchProgramItem["icon"][] = ["BookOpen", "Music", "Users", "Heart"];

export function TeensChurchProgramsEditor({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<TeensChurchProgramsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    getContent("teensChurchPrograms").then(setForm);
  }, []);

  if (!form) return <p className="text-neutral-500">Loading…</p>;

  const updateSection = (field: "sectionTitle", value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateProgram = (index: number, field: keyof TeensChurchProgramItem, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const programs = [...prev.programs];
      programs[index] = { ...programs[index], [field]: value };
      return { ...prev, programs };
    });
  };

  const addProgram = () => {
    setForm((prev) =>
      prev
        ? { ...prev, programs: [...prev.programs, { icon: "Heart", title: "", description: "" }] }
        : prev
    );
  };

  const removeProgram = (index: number) => {
    setForm((prev) => {
      if (!prev || prev.programs.length <= 1) return prev;
      const programs = prev.programs.filter((_, i) => i !== index);
      return { ...prev, programs };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await setContent("teensChurchPrograms", form);
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
          <Label>Programs</Label>
          <Button type="button" variant="outline" size="sm" onClick={addProgram} className="border-neutral-600 text-neutral-300">Add program</Button>
        </div>
        {form.programs.map((program, i) => (
          <div key={i} className="p-4 rounded-lg border border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">Program {i + 1}</p>
              {form.programs.length > 1 && (
                <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => removeProgram(i)}>Remove</Button>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Icon</Label>
              <select
                value={program.icon}
                onChange={(e) => updateProgram(i, "icon", e.target.value as TeensChurchProgramItem["icon"])}
                className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input value={program.title} onChange={(e) => updateProgram(i, "title", e.target.value)} className="bg-neutral-800 border-neutral-700" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={program.description} onChange={(e) => updateProgram(i, "description", e.target.value)} rows={2} className="bg-neutral-800 border-neutral-700" />
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} style={{ backgroundColor: "#1762B9" }}>{saving ? "Saving…" : "Save"}</Button>
    </form>
  );
}
