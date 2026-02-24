"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, ImageIcon, VideoIcon, ImagePlus } from "lucide-react";
import { uploadMedia } from "@/lib/storage";
import { MediaGalleryModal, SITE_MEDIA_FOLDER } from "@/components/admin/media-gallery-modal";

type MediaType = "image" | "video";

const ACCEPT: Record<MediaType, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif",
  video: "video/mp4,video/webm,video/quicktime",
};

interface MediaUploadProps {
  label: string;
  type: MediaType;
  value: string;
  onChange: (url: string) => void;
  /** Storage folder name (e.g. "hero", "sermons") */
  folder: string;
  className?: string;
}

export function MediaUpload({
  label,
  type,
  value,
  onChange,
  folder,
  className = "",
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadMedia(file, folder, setProgress);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = "";
    }
  }

  const Icon = type === "image" ? ImageIcon : VideoIcon;

  return (
    <div className={className}>
      <Label className="block mb-2">{label}</Label>
      <div className="space-y-3">
        {/* Current URL or paste */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={type === "image" ? "Image URL or upload below" : "Video URL or upload below"}
          className="bg-neutral-800 border-neutral-700"
        />
        {/* Upload row + gallery */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT[type]}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {progress}%
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload {type}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
            onClick={() => setGalleryOpen(true)}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Choose from gallery
          </Button>
          {value && (
            <span className="text-xs text-neutral-500 truncate max-w-[200px]" title={value}>
              Current: {value.startsWith("http") ? "Firebase URL" : value}
            </span>
          )}
        </div>
        <MediaGalleryModal
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
          folder={SITE_MEDIA_FOLDER}
          type={type}
          onSelect={(url) => onChange(url)}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {/* Preview */}
        {value && type === "image" && (
          <div className="mt-2 rounded-lg overflow-hidden border border-neutral-700 max-w-xs">
            <img
              src={value}
              alt="Preview"
              className="w-full h-32 object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
        {value && type === "video" && (
          <div className="mt-2 rounded-lg overflow-hidden border border-neutral-700 max-w-xs">
            <video
              src={value}
              className="w-full h-32 object-cover"
              muted
              playsInline
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
