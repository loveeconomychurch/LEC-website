"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ContentSectionId } from "@/lib/types/cms";
import { getPageById, getPageIdForSection } from "@/lib/admin-pages";
import { HeroEditor } from "@/components/admin/hero-editor";
import { WelcomeEditor } from "@/components/admin/welcome-editor";
import { VisitEditor } from "@/components/admin/visit-editor";
import { LatestSermonEditor } from "@/components/admin/latest-sermon-editor";
import { MinistriesEditor } from "@/components/admin/ministries-editor";
import { FooterEditor } from "@/components/admin/footer-editor";
import { HeaderEditor } from "@/components/admin/header-editor";
import { SiteEditor } from "@/components/admin/site-editor";
import { AboutHeroEditor } from "@/components/admin/about-hero-editor";
import { AboutStoryEditor } from "@/components/admin/about-story-editor";
import { AboutMissionVisionEditor } from "@/components/admin/about-mission-vision-editor";
import { AboutMessageEditor } from "@/components/admin/about-message-editor";
import { AboutCulturesEditor } from "@/components/admin/about-cultures-editor";
import { AboutCoreValuesEditor } from "@/components/admin/about-core-values-editor";
import { AboutServiceTimesEditor } from "@/components/admin/about-service-times-editor";
import { AboutCtaEditor } from "@/components/admin/about-cta-editor";
import { GiveHeroEditor } from "@/components/admin/give-hero-editor";
import { GiveWaysToGiveEditor } from "@/components/admin/give-ways-to-give-editor";
import { GiveImpactEditor } from "@/components/admin/give-impact-editor";
import { GiveCommitEditor } from "@/components/admin/give-commit-editor";
import { GiveCtaEditor } from "@/components/admin/give-cta-editor";
import { ServeHeroEditor } from "@/components/admin/serve-hero-editor";
import { ServeDepartmentsEditor } from "@/components/admin/serve-departments-editor";
import { ServeCtaEditor } from "@/components/admin/serve-cta-editor";
import { EventsFeaturedEditor } from "@/components/admin/events-featured-editor";
import { VisitHeroEditor } from "@/components/admin/visit-hero-editor";
import { TeensChurchHeroEditor } from "@/components/admin/teens-church-hero-editor";
import { TeensChurchAboutEditor } from "@/components/admin/teens-church-about-editor";
import { TeensChurchProgramsEditor } from "@/components/admin/teens-church-programs-editor";
import { TeensChurchMeetingsEditor } from "@/components/admin/teens-church-meetings-editor";
import { KChurchHeroEditor } from "@/components/admin/k-church-hero-editor";
import { KChurchAboutEditor } from "@/components/admin/k-church-about-editor";
import { KChurchProgramsEditor } from "@/components/admin/k-church-programs-editor";
import { KChurchAgeGroupsEditor } from "@/components/admin/k-church-age-groups-editor";
import { ChildrensMinistryHeroEditor } from "@/components/admin/childrens-ministry-hero-editor";
import { ChildrensMinistryAboutEditor } from "@/components/admin/childrens-ministry-about-editor";
import { ChildrensMinistryProgramsEditor } from "@/components/admin/childrens-ministry-programs-editor";
import { ChildrensMinistryAgeGroupsEditor } from "@/components/admin/childrens-ministry-age-groups-editor";
import { LcLiveHeroEditor } from "@/components/admin/lc-live-hero-editor";
import { LcLiveGatherTypesEditor } from "@/components/admin/lc-live-gather-types-editor";
import { LcLiveGalleryEditor } from "@/components/admin/lc-live-gallery-editor";
import { LcLiveBenefitsEditor } from "@/components/admin/lc-live-benefits-editor";
import { LcLiveVisualBreakEditor } from "@/components/admin/lc-live-visual-break-editor";
import { LcLiveHowToJoinEditor } from "@/components/admin/lc-live-how-to-join-editor";
import { LiveHeroEditor } from "@/components/admin/live-hero-editor";
import { LiveStreamsEditor } from "@/components/admin/live-streams-editor";
import { ThreeOneSixHeroEditor } from "@/components/admin/three-one-six-hero-editor";
import { ThreeOneSixListenNowEditor } from "@/components/admin/three-one-six-listen-now-editor";
import { ThreeOneSixReleasesEditor } from "@/components/admin/three-one-six-releases-editor";
import { ThreeOneSixNowPlayingEditor } from "@/components/admin/three-one-six-now-playing-editor";
import { ThreeOneSixArtistsEditor } from "@/components/admin/three-one-six-artists-editor";
import { ThreeOneSixInYourCityEditor } from "@/components/admin/three-one-six-in-your-city-editor";
import { ThreeOneSixMerchEditor } from "@/components/admin/three-one-six-merch-editor";
import { ThreeOneSixFaithStreetsEditor } from "@/components/admin/three-one-six-faith-streets-editor";
import { MerchHeroEditor } from "@/components/admin/merch-hero-editor";
import { MerchFeaturedProductsEditor } from "@/components/admin/merch-featured-products-editor";
import { LetomHeroEditor } from "@/components/admin/letom-hero-editor";
import { LetomAboutEditor } from "@/components/admin/letom-about-editor";
import { LetomProgramsEditor } from "@/components/admin/letom-programs-editor";
import { LetomEventsEditor } from "@/components/admin/letom-events-editor";
import { LetomGetInvolvedEditor } from "@/components/admin/letom-get-involved-editor";

const SECTION_LABELS: Record<ContentSectionId, string> = {
  hero: "Hero",
  welcome: "Welcome",
  visit: "Cards & Directions",
  visitHero: "Visit Hero",
  latestSermon: "Latest Sermon",
  ministries: "Ministries",
  footer: "Footer",
  header: "Header",
  site: "Site & SEO",
  aboutHero: "About Hero",
  aboutStory: "Our Story",
  aboutMissionVision: "Mission & Vision",
  aboutMessage: "Message of the House",
  aboutCultures: "Cultures",
  aboutCoreValues: "Core Values",
  aboutServiceTimes: "Service Times",
  aboutCta: "Call to Action",
  giveHero: "Give Hero",
  giveWaysToGive: "Ways to Give",
  giveImpact: "Your Impact",
  giveCommit: "Commit to Giving",
  giveCta: "Give CTA",
  serveHero: "Serve Hero",
  serveDepartments: "Church Departments",
  serveCta: "Serve CTA",
  eventsFeatured: "Featured Events",
  teensChurchHero: "Teens Church Hero",
  teensChurchAbout: "Teens Church About",
  teensChurchPrograms: "Teens Church What We Do",
  teensChurchMeetings: "Teens Church When We Meet",
  kChurchHero: "K Church Hero",
  kChurchAbout: "K Church About",
  kChurchPrograms: "K Church What We Do",
  kChurchAgeGroups: "K Church Age Groups",
  childrensMinistryHero: "Children's Ministry Hero",
  childrensMinistryAbout: "Children's Ministry About",
  childrensMinistryPrograms: "Children's Ministry What We Do",
  childrensMinistryAgeGroups: "Children's Ministry Age Groups",
  lcLiveHero: "LC Live Hero",
  lcLiveGatherTypes: "LC Live Where We Gather",
  lcLiveGallery: "LC Live Gallery",
  lcLiveBenefits: "LC Live Why LC Live",
  lcLiveVisualBreak: "LC Live Visual Break",
  lcLiveHowToJoin: "LC Live How to Join",
  liveHero: "Live Hero",
  liveStreams: "Live Streams (Sunday Service, LC Live, Stir Up)",
  threeOneSixHero: "3one6 Hero",
  threeOneSixListenNow: "3one6 Listen Now",
  threeOneSixReleases: "3one6 New Releases",
  threeOneSixNowPlaying: "3one6 Now Playing",
  threeOneSixArtists: "3one6 Featured Artists",
  threeOneSixInYourCity: "3one6 In Your City",
  threeOneSixMerch: "3one6 Upcoming Merch",
  threeOneSixFaithStreets: "3one6 Faith in the Streets",
  merchHero: "Merch Hero",
  merchFeaturedProducts: "Featured Products",
  letomHero: "LETOM Hero",
  letomAbout: "LETOM About",
  letomPrograms: "LETOM Outreach Programs",
  letomEvents: "LETOM Upcoming Events",
  letomGetInvolved: "LETOM Get Involved",
};

type EditorProps = { onSaved?: () => void };

const EDITORS: Record<ContentSectionId, (props: EditorProps) => React.ReactNode> = {
  hero: (p) => <HeroEditor onSaved={p.onSaved} />,
  welcome: (p) => <WelcomeEditor onSaved={p.onSaved} />,
  visit: (p) => <VisitEditor onSaved={p.onSaved} />,
  latestSermon: (p) => <LatestSermonEditor onSaved={p.onSaved} />,
  ministries: (p) => <MinistriesEditor onSaved={p.onSaved} />,
  footer: (p) => <FooterEditor onSaved={p.onSaved} />,
  header: (p) => <HeaderEditor onSaved={p.onSaved} />,
  site: (p) => <SiteEditor onSaved={p.onSaved} />,
  aboutHero: (p) => <AboutHeroEditor onSaved={p.onSaved} />,
  aboutStory: (p) => <AboutStoryEditor onSaved={p.onSaved} />,
  aboutMissionVision: (p) => <AboutMissionVisionEditor onSaved={p.onSaved} />,
  aboutMessage: (p) => <AboutMessageEditor onSaved={p.onSaved} />,
  aboutCultures: (p) => <AboutCulturesEditor onSaved={p.onSaved} />,
  aboutCoreValues: (p) => <AboutCoreValuesEditor onSaved={p.onSaved} />,
  aboutServiceTimes: (p) => <AboutServiceTimesEditor onSaved={p.onSaved} />,
  aboutCta: (p) => <AboutCtaEditor onSaved={p.onSaved} />,
  giveHero: (p) => <GiveHeroEditor onSaved={p.onSaved} />,
  giveWaysToGive: (p) => <GiveWaysToGiveEditor onSaved={p.onSaved} />,
  giveImpact: (p) => <GiveImpactEditor onSaved={p.onSaved} />,
  giveCommit: (p) => <GiveCommitEditor onSaved={p.onSaved} />,
  giveCta: (p) => <GiveCtaEditor onSaved={p.onSaved} />,
  serveHero: (p) => <ServeHeroEditor onSaved={p.onSaved} />,
  serveDepartments: (p) => <ServeDepartmentsEditor onSaved={p.onSaved} />,
  serveCta: (p) => <ServeCtaEditor onSaved={p.onSaved} />,
  eventsFeatured: (p) => <EventsFeaturedEditor onSaved={p.onSaved} />,
  visitHero: (p) => <VisitHeroEditor onSaved={p.onSaved} />,
  teensChurchHero: (p) => <TeensChurchHeroEditor onSaved={p.onSaved} />,
  teensChurchAbout: (p) => <TeensChurchAboutEditor onSaved={p.onSaved} />,
  teensChurchPrograms: (p) => <TeensChurchProgramsEditor onSaved={p.onSaved} />,
  teensChurchMeetings: (p) => <TeensChurchMeetingsEditor onSaved={p.onSaved} />,
  kChurchHero: (p) => <KChurchHeroEditor onSaved={p.onSaved} />,
  kChurchAbout: (p) => <KChurchAboutEditor onSaved={p.onSaved} />,
  kChurchPrograms: (p) => <KChurchProgramsEditor onSaved={p.onSaved} />,
  kChurchAgeGroups: (p) => <KChurchAgeGroupsEditor onSaved={p.onSaved} />,
  childrensMinistryHero: (p) => <ChildrensMinistryHeroEditor onSaved={p.onSaved} />,
  childrensMinistryAbout: (p) => <ChildrensMinistryAboutEditor onSaved={p.onSaved} />,
  childrensMinistryPrograms: (p) => <ChildrensMinistryProgramsEditor onSaved={p.onSaved} />,
  childrensMinistryAgeGroups: (p) => <ChildrensMinistryAgeGroupsEditor onSaved={p.onSaved} />,
  lcLiveHero: (p) => <LcLiveHeroEditor onSaved={p.onSaved} />,
  lcLiveGatherTypes: (p) => <LcLiveGatherTypesEditor onSaved={p.onSaved} />,
  lcLiveGallery: (p) => <LcLiveGalleryEditor onSaved={p.onSaved} />,
  lcLiveBenefits: (p) => <LcLiveBenefitsEditor onSaved={p.onSaved} />,
  lcLiveVisualBreak: (p) => <LcLiveVisualBreakEditor onSaved={p.onSaved} />,
  lcLiveHowToJoin: (p) => <LcLiveHowToJoinEditor onSaved={p.onSaved} />,
  liveHero: (p) => <LiveHeroEditor onSaved={p.onSaved} />,
  liveStreams: (p) => <LiveStreamsEditor onSaved={p.onSaved} />,
  threeOneSixHero: (p) => <ThreeOneSixHeroEditor onSaved={p.onSaved} />,
  threeOneSixListenNow: (p) => <ThreeOneSixListenNowEditor onSaved={p.onSaved} />,
  threeOneSixReleases: (p) => <ThreeOneSixReleasesEditor onSaved={p.onSaved} />,
  threeOneSixNowPlaying: (p) => <ThreeOneSixNowPlayingEditor onSaved={p.onSaved} />,
  threeOneSixArtists: (p) => <ThreeOneSixArtistsEditor onSaved={p.onSaved} />,
  threeOneSixInYourCity: (p) => <ThreeOneSixInYourCityEditor onSaved={p.onSaved} />,
  threeOneSixMerch: (p) => <ThreeOneSixMerchEditor onSaved={p.onSaved} />,
  threeOneSixFaithStreets: (p) => <ThreeOneSixFaithStreetsEditor onSaved={p.onSaved} />,
  merchHero: (p) => <MerchHeroEditor onSaved={p.onSaved} />,
  merchFeaturedProducts: (p) => <MerchFeaturedProductsEditor onSaved={p.onSaved} />,
  letomHero: (p) => <LetomHeroEditor onSaved={p.onSaved} />,
  letomAbout: (p) => <LetomAboutEditor onSaved={p.onSaved} />,
  letomPrograms: (p) => <LetomProgramsEditor onSaved={p.onSaved} />,
  letomEvents: (p) => <LetomEventsEditor onSaved={p.onSaved} />,
  letomGetInvolved: (p) => <LetomGetInvolvedEditor onSaved={p.onSaved} />,
};

const VALID_SECTIONS: ContentSectionId[] = [
  "hero",
  "welcome",
  "visit",
  "visitHero",
  "latestSermon",
  "ministries",
  "footer",
  "header",
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
  "teensChurchHero",
  "teensChurchAbout",
  "teensChurchPrograms",
  "teensChurchMeetings",
  "kChurchHero",
  "kChurchAbout",
  "kChurchPrograms",
  "kChurchAgeGroups",
  "childrensMinistryHero",
  "childrensMinistryAbout",
  "childrensMinistryPrograms",
  "childrensMinistryAgeGroups",
  "lcLiveHero",
  "lcLiveGatherTypes",
  "lcLiveGallery",
  "lcLiveBenefits",
  "lcLiveVisualBreak",
  "lcLiveHowToJoin",
  "liveHero",
  "liveStreams",
  "threeOneSixHero",
  "threeOneSixListenNow",
  "threeOneSixReleases",
  "threeOneSixNowPlaying",
  "threeOneSixArtists",
  "threeOneSixInYourCity",
  "threeOneSixMerch",
  "threeOneSixFaithStreets",
  "merchHero",
  "merchFeaturedProducts",
  "letomHero",
  "letomAbout",
  "letomPrograms",
  "letomEvents",
  "letomGetInvolved",
];

export function AdminContentClient({
  section,
  onSaved,
  hideBreadcrumbs,
}: {
  section: string;
  onSaved?: () => void;
  hideBreadcrumbs?: boolean;
}) {
  const sectionId = VALID_SECTIONS.includes(section as ContentSectionId)
    ? (section as ContentSectionId)
    : null;

  if (!sectionId) {
    return (
      <div>
        <p className="text-red-400">Unknown section.</p>
        <Link href="/admin" className="text-neutral-400 hover:text-white mt-2 inline-block">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  const label = SECTION_LABELS[sectionId];
  const pageId = getPageIdForSection(sectionId);
  const page = getPageById(pageId);

  return (
    <div>
      {!hideBreadcrumbs && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            {page && (
              <>
                <span className="text-neutral-600">/</span>
                <Link
                  href={`/admin/pages/${pageId}`}
                  className="text-neutral-400 hover:text-white text-sm"
                >
                  {page.label}
                </Link>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-8">Edit: {label}</h1>
        </>
      )}
      {EDITORS[sectionId]({ onSaved })}
    </div>
  );
}
