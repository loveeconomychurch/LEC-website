"use client";

import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a file to Firebase Storage and return its public URL.
 * Path will be: cms/{folder}/{uniqueId}-{originalName}
 */
export async function uploadMedia(
  file: File,
  folder: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `cms/${folder}/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      cacheControl: "public, max-age=31536000",
    });

    task.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress?.(percent);
      },
      (err) => reject(err),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

export interface MediaItem {
  url: string;
  name: string;
}

/**
 * List all media files in a folder (cms/{folder}/).
 * Returns download URLs and file names for use in gallery.
 */
export async function listMediaInFolder(folder: string): Promise<MediaItem[]> {
  const folderRef = ref(storage, `cms/${folder}`);
  const result = await listAll(folderRef);
  const items: MediaItem[] = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { url, name: itemRef.name };
    })
  );
  return items;
}
