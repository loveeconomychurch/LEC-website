import "server-only"

import { unstable_cache } from "next/cache"
import { collection, getDocs } from "firebase/firestore"
import { defaults } from "./content-defaults"
import { db } from "./firebase"
import type { ContentMap, ContentSectionId } from "./types/cms"

async function fetchAllContent(): Promise<ContentMap> {
  const merged = structuredClone(defaults) as unknown as ContentMap

  try {
    const snapshot = await getDocs(collection(db, "content"))
    for (const document of snapshot.docs) {
      const sectionId = document.id as ContentSectionId
      const remote = document.data().data
      if (sectionId in defaults && remote && typeof remote === "object") {
        const content = merged as unknown as Record<string, Record<string, unknown>>
        content[sectionId] = { ...content[sectionId], ...remote }
      }
    }
  } catch (error) {
    console.warn("[CMS] Server content fetch failed; using defaults", error)
  }

  return merged
}

export const getAllContent = unstable_cache(
  fetchAllContent,
  ["site-content"],
  { revalidate: 300 }
)
