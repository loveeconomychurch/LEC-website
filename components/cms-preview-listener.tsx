"use client";

import { useEffect } from "react";

const CMS_MESSAGE_TYPE = "cms-scroll-to-section";

type CmsScrollMessage = { type: typeof CMS_MESSAGE_TYPE; sectionId: string | null };

function isCmsScrollMessage(d: unknown): d is CmsScrollMessage {
  return (
    typeof d === "object" &&
    d !== null &&
    "type" in d &&
    (d as CmsScrollMessage).type === CMS_MESSAGE_TYPE &&
    ("sectionId" in d &&
      ((d as CmsScrollMessage).sectionId === null ||
        typeof (d as CmsScrollMessage).sectionId === "string"))
  );
}

export function CmsPreviewListener() {
  useEffect(() => {
    if (typeof window === "undefined" || window.self === window.top) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isCmsScrollMessage(event.data)) return;
      const { sectionId } = event.data;

      const doc = document;

      const previouslyHighlighted = doc.querySelectorAll("[data-cms-highlight]");
      previouslyHighlighted.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.outline = "";
          el.style.outlineOffset = "";
          el.removeAttribute("data-cms-highlight");
        }
      });

      if (!sectionId || sectionId === "site") return;

      const el = doc.querySelector(`[data-cms-section="${sectionId}"]`);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.style.outline = "3px solid #fa8c58";
        el.style.outlineOffset = "-3px";
        el.setAttribute("data-cms-highlight", "true");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
