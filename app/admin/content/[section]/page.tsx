import type { ContentSectionId } from "@/lib/types/cms";
import { AdminContentClient } from "./admin-content-client";

const VALID_SECTIONS: ContentSectionId[] = [
  "hero",
  "welcome",
  "visit",
  "visitHero",
  "latestSermon",
  "ministries",
  "footer",
  "site",
  "aboutHero",
  "aboutStory",
  "aboutMissionVision",
  "aboutMessage",
  "aboutCultures",
  "aboutCoreValues",
  "aboutServiceTimes",
  "aboutCta",
  "giveHero",
  "giveWaysToGive",
  "giveImpact",
  "giveCommit",
  "giveCta",
  "serveHero",
  "serveDepartments",
  "serveCta",
  "eventsFeatured",
];

export function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
}

export default function AdminContentPage({
  params,
}: {
  params: { section: string };
}) {
  return <AdminContentClient section={params.section} />;
}
