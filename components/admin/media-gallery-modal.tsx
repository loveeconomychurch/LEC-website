"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, ImageIcon, VideoIcon } from "lucide-react";
import { listMediaInFolder, uploadMedia, type MediaItem } from "@/lib/storage";

/** Site-wide media folder – same gallery everywhere in the CMS */
export const SITE_MEDIA_FOLDER = "media";

type MediaType = "image" | "video";

const ACCEPT: Record<MediaType, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif",
  video: "video/mp4,video/webm,video/quicktime",
};

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)(\?|$)/i;
const VIDEO_EXT = /\.(mp4|webm|mov|quicktime)(\?|$)/i;

function filterByType(items: MediaItem[], type: MediaType): MediaItem[] {
  if (type === "image") {
    return items.filter((item) => IMAGE_EXT.test(item.url) || IMAGE_EXT.test(item.name));
  }
  return items.filter((item) => VIDEO_EXT.test(item.url) || VIDEO_EXT.test(item.name));
}

interface MediaGalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Use SITE_MEDIA_FOLDER for a shared site-wide gallery (recommended). */
  folder?: string;
  type: MediaType;
  onSelect: (url: string) => void;
}

export function MediaGalleryModal({
  open,
  onOpenChange,
  folder = SITE_MEDIA_FOLDER,
  type,
  onSelect,
}: MediaGalleryModalProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveFolder = folder || SITE_MEDIA_FOLDER;
  const filteredItems = filterByType(items, type);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    listMediaInFolder(effectiveFolder)
      .then(setItems)
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to load gallery");
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [open, effectiveFolder]);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadMedia(file, effectiveFolder, setProgress);
      setItems((prev) => [...prev, { url, name: file.name }]);
      onSelect(url);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = "";
    }
  }

  function handleSelect(item: MediaItem) {
    onSelect(item.url);
    onOpenChange(false);
  }

  const Icon = type === "image" ? ImageIcon : VideoIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-neutral-900 border-neutral-700 text-white sm:max-w-5xl lg:max-w-6xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden"
        showCloseButton={true}
      >
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-white flex items-center gap-2">
            <Icon className="h-5 w-5" />
            Site media gallery
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 shrink-0">
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
                  Upload new
                </>
              )}
            </Button>
            <span className="text-xs text-neutral-500">
              {filteredItems.length} {type}(s) in site gallery
            </span>
          </div>

          {error && <p className="text-sm text-red-400 shrink-0">{error}</p>}

          <div className="flex-1 min-h-0 rounded-lg border border-neutral-700 overflow-y-auto overflow-x-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-neutral-500" />
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-500 text-sm">
                <Icon className="h-14 w-14 mb-3 opacity-50" />
                <p>No {type}s in gallery yet.</p>
                <p className="mt-1">Upload one using the button above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 p-4">
                {filteredItems.map((item) => (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-neutral-700 hover:border-[#1762B9] focus:border-[#1762B9] focus:outline-none transition-colors group bg-neutral-800"
                  >
                    {type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <VideoIcon className="h-12 w-12 text-neutral-500" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 py-1.5 px-2 text-xs truncate text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
