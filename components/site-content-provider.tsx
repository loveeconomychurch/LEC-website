"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { ContentMap } from "@/lib/types/cms"

const SiteContentContext = createContext<ContentMap | null>(null)

export function SiteContentProvider({
  content,
  children,
}: {
  content: ContentMap
  children: ReactNode
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useServerSiteContent() {
  return useContext(SiteContentContext)
}
