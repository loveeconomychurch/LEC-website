import type { ContentSectionId } from "@/lib/types/cms";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Heart,
  MapPin,
  Video,
  Users,
  FileText,
  Settings,
  Info,
  Image,
  BookOpen,
  Target,
  MessageSquare,
  Layers,
  Sparkles,
  Calendar,
  Megaphone,
  DollarSign,
  CreditCard,
  TrendingUp,
  HandHeart,
  HandHelping,
  LayoutList,
  CalendarDays,
  GraduationCap,
  Baby,
  Radio,
  Youtube,
  Music,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export type AdminPageId = "home" | "about" | "site" | "give" | "serve" | "events" | "visitPage" | "teensChurch" | "kChurch" | "childrensMinistry" | "lcLive" | "live" | "threeOneSix" | "merch" | "letom" | "ecommerce";

/** Main admin tabs: Overview (dashboard), Pages (all CMS pages), Ecommerce, Site settings */
export type AdminMainTabId = "overview" | "pages" | "ecommerce" | "site";

/** Page ids that appear under the "Pages" tab (excludes Ecommerce and Site settings) */
export const PAGES_TAB_PAGE_IDS: AdminPageId[] = [
  "home",
  "about",
  "visitPage",
  "give",
  "serve",
  "events",
  "teensChurch",
  "kChurch",
  "childrensMinistry",
  "lcLive",
  "live",
  "threeOneSix",
  "merch",
  "letom",
];

export interface AdminSectionItem {
  id: ContentSectionId;
  label: string;
  icon: LucideIcon;
}

export interface AdminPageItem {
  id: AdminPageId;
  label: string;
  description: string;
  icon: LucideIcon;
  sections: AdminSectionItem[];
}

export const ADMIN_PAGES: AdminPageItem[] = [
  {
    id: "home",
    label: "Home",
    description: "Hero, welcome, sermon, ministries, visit",
    icon: Home,
    sections: [
      { id: "hero", label: "Hero", icon: Home },
      { id: "welcome", label: "Welcome", icon: Heart },
      { id: "latestSermon", label: "Latest Sermon", icon: Video },
      { id: "ministries", label: "Ministries", icon: Users },
      { id: "visit", label: "Visit (Cards & Directions)", icon: MapPin },
    ],
  },
  {
    id: "about",
    label: "About",
    description: "Hero, story, mission, message, cultures, values, times, CTA",
    icon: Info,
    sections: [
      { id: "aboutHero", label: "About Hero", icon: Image },
      { id: "aboutStory", label: "Our Story", icon: BookOpen },
      { id: "aboutMissionVision", label: "Mission & Vision", icon: Target },
      { id: "aboutMessage", label: "Message of the House", icon: MessageSquare },
      { id: "aboutCultures", label: "Cultures", icon: Layers },
      { id: "aboutCoreValues", label: "Core Values", icon: Sparkles },
      { id: "aboutServiceTimes", label: "Service Times", icon: Calendar },
      { id: "aboutCta", label: "Call to Action", icon: Megaphone },
    ],
  },
  {
    id: "visitPage",
    label: "Visit",
    description: "Hero, cards, directions",
    icon: MapPin,
    sections: [
      { id: "visitHero", label: "Visit Hero", icon: Image },
      { id: "visit", label: "Cards & Directions", icon: MapPin },
    ],
  },
  {
    id: "site",
    label: "Site",
    description: "Site name, SEO, header, footer",
    icon: Settings,
    sections: [
      { id: "site", label: "Site & SEO", icon: Settings },
      { id: "header", label: "Header", icon: LayoutList },
      { id: "footer", label: "Footer", icon: FileText },
    ],
  },
  {
    id: "give",
    label: "Give",
    description: "Hero, ways to give, impact, commit, CTA",
    icon: DollarSign,
    sections: [
      { id: "giveHero", label: "Give Hero", icon: Image },
      { id: "giveWaysToGive", label: "Ways to Give", icon: CreditCard },
      { id: "giveImpact", label: "Your Impact", icon: TrendingUp },
      { id: "giveCommit", label: "Commit to Giving", icon: HandHeart },
      { id: "giveCta", label: "Call to Action", icon: Megaphone },
    ],
  },
  {
    id: "serve",
    label: "Serve",
    description: "Hero, departments, CTA",
    icon: HandHelping,
    sections: [
      { id: "serveHero", label: "Serve Hero", icon: Image },
      { id: "serveDepartments", label: "Church Departments", icon: LayoutList },
      { id: "serveCta", label: "Call to Action", icon: Megaphone },
    ],
  },
  {
    id: "events",
    label: "Events",
    description: "Featured events",
    icon: CalendarDays,
    sections: [
      { id: "eventsFeatured", label: "Featured Events", icon: Image },
    ],
  },
  {
    id: "teensChurch",
    label: "Teens Church",
    description: "Hero, about, programs, meeting times",
    icon: GraduationCap,
    sections: [
      { id: "teensChurchHero", label: "Hero", icon: Image },
      { id: "teensChurchAbout", label: "About", icon: BookOpen },
      { id: "teensChurchPrograms", label: "What We Do", icon: Users },
      { id: "teensChurchMeetings", label: "When We Meet", icon: Calendar },
    ],
  },
  {
    id: "kChurch",
    label: "K Church",
    description: "Hero, about, programs, age groups",
    icon: Sparkles,
    sections: [
      { id: "kChurchHero", label: "Hero", icon: Image },
      { id: "kChurchAbout", label: "About", icon: BookOpen },
      { id: "kChurchPrograms", label: "What We Do", icon: Users },
      { id: "kChurchAgeGroups", label: "Age Groups", icon: Users },
    ],
  },
  {
    id: "childrensMinistry",
    label: "Children's Ministry",
    description: "Hero, about, programs, age groups",
    icon: Baby,
    sections: [
      { id: "childrensMinistryHero", label: "Hero", icon: Image },
      { id: "childrensMinistryAbout", label: "About", icon: BookOpen },
      { id: "childrensMinistryPrograms", label: "What We Do", icon: Users },
      { id: "childrensMinistryAgeGroups", label: "Age Groups", icon: Users },
    ],
  },
  {
    id: "lcLive",
    label: "LC Live",
    description: "Wednesday service – hero, where we gather, gallery, benefits, visual break, how to join",
    icon: Radio,
    sections: [
      { id: "lcLiveHero", label: "Hero", icon: Image },
      { id: "lcLiveGatherTypes", label: "Where We Gather", icon: MapPin },
      { id: "lcLiveGallery", label: "Gallery", icon: Image },
      { id: "lcLiveBenefits", label: "Why LC Live", icon: Heart },
      { id: "lcLiveVisualBreak", label: "Visual Break", icon: Image },
      { id: "lcLiveHowToJoin", label: "How to Join", icon: Calendar },
    ],
  },
  {
    id: "live",
    label: "Live",
    description: "Watch Live page – hero and stream sections (Sunday Service, LC Live, Stir Up)",
    icon: Youtube,
    sections: [
      { id: "liveHero", label: "Hero", icon: Image },
      { id: "liveStreams", label: "Streams (Sunday Service, LC Live, Stir Up)", icon: Video },
    ],
  },
  {
    id: "threeOneSix",
    label: "3one6",
    description: "3one6 record label page – hero, listen now, releases, artists, merch, CTAs",
    icon: Music,
    sections: [
      { id: "threeOneSixHero", label: "Hero", icon: Image },
      { id: "threeOneSixListenNow", label: "Listen Now", icon: Music },
      { id: "threeOneSixReleases", label: "New Releases", icon: LayoutList },
      { id: "threeOneSixNowPlaying", label: "Now Playing", icon: Music },
      { id: "threeOneSixArtists", label: "Featured Artists", icon: Users },
      { id: "threeOneSixInYourCity", label: "In Your City", icon: MapPin },
      { id: "threeOneSixMerch", label: "Upcoming Merch", icon: LayoutList },
      { id: "threeOneSixFaithStreets", label: "Faith in the Streets", icon: Image },
    ],
  },
  {
    id: "merch",
    label: "Merch",
    description: "Merch page – hero and which products to show (from Ecommerce)",
    icon: ShoppingBag,
    sections: [
      { id: "merchHero", label: "Merch Hero", icon: Image },
      { id: "merchFeaturedProducts", label: "Featured Products", icon: LayoutList },
    ],
  },
  {
    id: "letom",
    label: "LETOM",
    description: "High school & teen outreach – hero, about, programs, events, get involved",
    icon: GraduationCap,
    sections: [
      { id: "letomHero", label: "Hero", icon: Image },
      { id: "letomAbout", label: "About", icon: BookOpen },
      { id: "letomPrograms", label: "Outreach Programs", icon: Users },
      { id: "letomEvents", label: "Upcoming Events", icon: Calendar },
      { id: "letomGetInvolved", label: "Get Involved", icon: Heart },
    ],
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    description: "Products, orders, categories – no page preview",
    icon: ShoppingCart,
    sections: [],
  },
];

const VALID_PAGE_IDS: AdminPageId[] = ["home", "about", "site", "give", "serve", "events", "visitPage", "teensChurch", "kChurch", "childrensMinistry", "lcLive", "live", "threeOneSix", "merch", "letom", "ecommerce"];

export function isValidPageId(page: string): page is AdminPageId {
  return VALID_PAGE_IDS.includes(page as AdminPageId);
}

export function getPageById(id: AdminPageId): AdminPageItem | undefined {
  return ADMIN_PAGES.find((p) => p.id === id);
}

export function getPageIdForSection(sectionId: ContentSectionId): AdminPageId {
  const page = ADMIN_PAGES.find((p) => p.sections.some((s) => s.id === sectionId));
  return page?.id ?? "home";
}

/** Frontend URL to show in admin preview iframe for each page */
export const PREVIEW_URL_BY_PAGE: Record<AdminPageId, string> = {
  home: "/",
  about: "/about",
  site: "/",
  give: "/give",
  serve: "/serve",
  events: "/events",
  visitPage: "/visit",
  teensChurch: "/teens-church",
  kChurch: "/k-church",
  childrensMinistry: "/childrens-ministry",
  lcLive: "/groups",
  live: "/live",
  threeOneSix: "/3one6",
  merch: "/merch",
  letom: "/letom",
  ecommerce: "/merch", // not used for iframe; ecommerce shows its own UI in main pane
};
