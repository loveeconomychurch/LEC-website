"use client";

import { useState, useEffect, useCallback } from "react";
import { getContent, getDefault } from "@/lib/cms";
import type { ContentSectionId, ContentMap } from "@/lib/types/cms";
import { useServerSiteContent } from "@/components/site-content-provider";

/**
 * Reads server-prefetched CMS content immediately. `refresh` performs an
 * uncached client read for admin previews after an edit.
 */
export function useSiteContent<T extends ContentSectionId>(sectionId: T) {
  const serverContent = useServerSiteContent();
  const initialData = serverContent?.[sectionId] ?? getDefault(sectionId);
  const [data, setData] = useState<ContentMap[T]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    getContent(sectionId)
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        setError(e instanceof Error ? e : new Error(String(e)));
        setData(getDefault(sectionId) as ContentMap[T]);
      })
      .finally(() => setLoading(false));
  }, [sectionId]);

  useEffect(() => {
    setData(serverContent?.[sectionId] ?? getDefault(sectionId));
    setLoading(false);
  }, [sectionId, serverContent]);

  return { data, loading, error, refresh };
}
