"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import type { ContentSectionId, ContentMap } from "./types/cms";
import { defaults } from "./content-defaults";
import { db } from "./firebase";

const CONTENT_COLLECTION = "content";

function getDefault<T extends ContentSectionId>(sectionId: T): ContentMap[T] {
  return defaults[sectionId] as ContentMap[T];
}

/** Get content for a section from Firestore. Returns default if not found or error. */
export async function getContent<T extends ContentSectionId>(
  sectionId: T
): Promise<ContentMap[T]> {
  try {
    const ref = doc(db, CONTENT_COLLECTION, sectionId);
    const snap = await getDoc(ref);
    if (snap.exists() && snap.data().data) {
      return { ...getDefault(sectionId), ...snap.data().data } as ContentMap[T];
    }
  } catch (e) {
    console.warn("[CMS] getContent error:", sectionId, e);
  }
  return getDefault(sectionId);
}

/** Save content for a section. Requires Firebase Auth (call from admin only). */
export async function setContent<T extends ContentSectionId>(
  sectionId: T,
  data: ContentMap[T]
): Promise<void> {
  const ref = doc(db, CONTENT_COLLECTION, sectionId);
  await setDoc(
    ref,
    {
      id: sectionId,
      data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export { getDefault, defaults };
export type { ContentSectionId, ContentMap };
