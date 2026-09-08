import type { ComponentType, SVGProps } from "react"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { TiktokIcon } from "@/components/icons/tiktok-icon"

export interface SocialLink {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Lucide outline icons need a stroke; solid-filled glyphs do not. */
  strokeWidth: number
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/LoveEconomyChurch/",
    Icon: Facebook,
    strokeWidth: 0,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/loveeconomychurch/",
    Icon: Instagram,
    strokeWidth: 1.5,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bishopisaacotiboateng",
    Icon: Youtube,
    strokeWidth: 1.5,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@loveeconomychurch",
    Icon: TiktokIcon,
    strokeWidth: 0,
  },
]
