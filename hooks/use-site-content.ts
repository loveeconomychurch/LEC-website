"use client";

import { useState, useEffect, useCallback } from "react";
import { getContent, getDefault } from "@/lib/cms";
import type { ContentSectionId, ContentMap } from "@/lib/types/cms";

/**
 * Loads CMS content for a section. Data is null until the first fetch completes
 * (from DB or default), so default content is not shown before we know there's
 * nothing in the DB. Use loading or data === null to show a loading state.
 */
export function useSiteContent<T extends ContentSectionId>(sectionId: T) {
  const [data, setData] = useState<ContentMap[T] | null>(null);
  const [loading, setLoading] = useState(true);
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
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
