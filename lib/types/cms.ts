/**
 * CMS content types for Firestore. Each section has a document in the "content" collection.
 */

export type ContentSectionId =
  | "hero"
  | "welcome"
  | "visit"
  | "visitHero"
  | "latestSermon"
  | "ministries"
  | "footer"
  | "header"
  | "site"
  | "aboutHero"
  | "aboutStory"
  | "aboutMissionVision"
  | "aboutMessage"
  | "aboutCultures"
  | "aboutCoreValues"
  | "aboutServiceTimes"
  | "aboutCta"
  | "giveHero"
  | "giveWaysToGive"
  | "giveImpact"
  | "giveCommit"
  | "giveCta"
  | "serveHero"
  | "serveDepartments"
  | "serveCta"
  | "eventsFeatured"
  | "teensChurchHero"
  | "teensChurchAbout"
  | "teensChurchPrograms"
  | "teensChurchMeetings"
  | "kChurchHero"
  | "kChurchAbout"
  | "kChurchPrograms"
  | "kChurchAgeGroups"
  | "childrensMinistryHero"
  | "childrensMinistryAbout"
  | "childrensMinistryPrograms"
  | "childrensMinistryAgeGroups"
  | "lcLiveHero"
  | "lcLiveGatherTypes"
  | "lcLiveGallery"
  | "lcLiveBenefits"
  | "lcLiveVisualBreak"
  | "lcLiveHowToJoin"
  | "liveHero"
  | "liveStreams"
  | "threeOneSixHero"
  | "threeOneSixListenNow"
  | "threeOneSixReleases"
  | "threeOneSixNowPlaying"
  | "threeOneSixArtists"
  | "threeOneSixInYourCity"
  | "threeOneSixMerch"
  | "threeOneSixFaithStreets"
  | "merchHero"
  | "merchFeaturedProducts"
  | "letomHero"
  | "letomAbout"
  | "letomPrograms"
  | "letomEvents"
  | "letomGetInvolved";

export interface HeroContent {
  headline: string;
  subtitle: string;
  serviceTimes: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
  videoUrl: string;
  backgroundImageUrl: string;
}

export interface WelcomeContent {
  label: string;
  headline: string;
  visitCta: string;
  visitCtaLink?: string;
  aboutCta: string;
  aboutCtaLink?: string;
  /** Image URLs for the marquee strip (uploadable via gallery) */
  marqueeImages: string[];
}

/** Visit page – hero block */
export interface VisitHeroContent {
  title: string;
  subheadline: string;
  videoUrl?: string;
  backgroundImageUrl?: string;
  ctaText: string;
  ctaLink: string;
}

export interface VisitContent {
  headline: string;
  subheadline: string;
  cardTitle: string;
  cardSubtitle: string;
  cardCta: string;
  cardCtaLink?: string;
  cardImageUrl: string;
  card2Title: string;
  card2Subtitle: string;
  card2Cta: string;
  card2CtaLink?: string;
  card2ImageUrl: string;
  directionsHeadline: string;
  directionsPhone: string;
  directionsButtonText?: string;
}

/** One ministry card on the home page (fixed layout: 5 cards). */
export interface MinistryCard {
  label: string;
  headline: string;
  showLearnMore: boolean;
  learnMoreLink?: string;
  /** Tailwind bg color suffix, e.g. "green-700", "black", "yellow-700", "amber-800" */
  bgColor?: string;
  /** Background image URL for card (e.g. 3one6) */
  backgroundImage?: string;
  /** Video URL for card (e.g. LETOM) */
  videoUrl?: string;
  /** Icon name for card decoration */
  icon?: "fastForward" | "smile" | "";
}

export interface LatestSermonContent {
  sectionTitle: string;
  sermonTitle: string;
  speaker: string;
  thumbnailUrl: string;
  videoUrl: string;
  watchMoreLabel: string;
  watchMoreUrl: string;
}

export interface MinistriesContent {
  sectionTitle: string;
  sectionSubtitle: string;
  /** Exactly 5 cards matching home page layout: Teens, K church, Children, 3one6, LETOM */
  ministries: MinistryCard[];
}

export interface FooterContent {
  tagline: string;
  newsletterTitle: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterDescription: string;
}

export interface HeaderNavLink {
  label: string;
  href: string;
}

export interface HeaderContent {
  logoUrl: string;
  logoAlt: string;
  searchPlaceholder: string;
  navLinks: HeaderNavLink[];
}

export interface SiteContent {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
}

export interface AboutCultureItem {
  number: string;
  title: string;
  description: string;
  references: string;
}

export interface AboutCoreValueItem {
  title: string;
  description: string;
}

export interface AboutHeroContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
}

export interface AboutStoryContent {
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
}

export interface AboutMissionVisionContent {
  missionVisionTitle: string;
  missionVisionSubtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
}

export interface AboutMessageContent {
  messageTitle: string;
  messageTagline: string;
  messagePoint1Title: string;
  messagePoint1aTitle: string;
  messagePoint1aText: string;
  messagePoint1bTitle: string;
  messagePoint1bText: string;
  messagePoint2Title: string;
  messagePoint2aTitle: string;
  messagePoint2aText: string;
  messagePoint2bTitle: string;
  messagePoint2bText: string;
}

export interface AboutCulturesContent {
  culturesTitle: string;
  culturesSubtitle: string;
  cultures: AboutCultureItem[];
}

export interface AboutCoreValuesContent {
  coreValuesTitle: string;
  coreValuesSubtitle: string;
  coreValues: AboutCoreValueItem[];
}

export interface AboutServiceTimesContent {
  serviceTimesTitle: string;
  sundayLabel: string;
  sundayTime: string;
  wednesdayLabel: string;
  wednesdayTime: string;
  visitCtaText: string;
}

export interface AboutCtaContent {
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/** Give page – hero block */
export interface GiveHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** Give page – ways to give method */
export interface GiveMethodItem {
  title: string;
  description: string;
  icon: "CreditCard" | "Smartphone" | "Building" | "PiggyBank";
}

export interface GiveWaysToGiveContent {
  sectionTitle: string;
  sectionSubtitle: string;
  methods: GiveMethodItem[];
}

/** Give page – impact stat */
export interface GiveImpactStatItem {
  number: string;
  label: string;
  icon: "Users" | "TrendingUp" | "Heart";
}

export interface GiveImpactContent {
  sectionTitle: string;
  sectionSubtitle: string;
  stats: GiveImpactStatItem[];
}

/** Give page – commit (tither + partner) */
export interface GiveCommitCard {
  title: string;
  description: string;
  bullets: string[];
  buttonText: string;
}

export interface GiveCommitContent {
  sectionTitle: string;
  sectionSubtitle: string;
  tither: GiveCommitCard;
  partner: GiveCommitCard;
}

/** Give page – final CTA */
export interface GiveCtaContent {
  headline: string;
  body: string;
  buttonText: string;
  buttonLink?: string;
}

/** Serve page – hero block */
export interface ServeHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** Serve page – department card */
export type ServeDepartmentIcon =
  | "Mic"
  | "Users"
  | "HandHeart"
  | "Building"
  | "ClipboardCheck"
  | "Heart"
  | "Globe"
  | "Video"
  | "Camera"
  | "Lightbulb"
  | "Radio"
  | "Monitor"
  | "Footprints"
  | "Film";

export interface ServeDepartmentItem {
  name: string;
  description: string;
  icon: ServeDepartmentIcon;
}

export interface ServeDepartmentsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  joinButtonText: string;
  departments: ServeDepartmentItem[];
}

/** Serve page – final CTA */
export interface ServeCtaContent {
  headline: string;
  body: string;
  buttonText: string;
}

/** Events page – featured hero cards */
export interface EventsFeaturedEventItem {
  title: string;
  imageUrl: string;
  date?: string;
  location?: string;
}

export interface EventsFeaturedContent {
  events: EventsFeaturedEventItem[];
}

/** Teens Church page – hero block */
export interface TeensChurchHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** Teens Church page – about block */
export interface TeensChurchAboutContent {
  sectionTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image1Url: string;
  image2Url: string;
}

/** Teens Church – one program card (What We Do) */
export type TeensChurchProgramIcon = "BookOpen" | "Music" | "Users" | "Heart";

export interface TeensChurchProgramItem {
  icon: TeensChurchProgramIcon;
  title: string;
  description: string;
}

export interface TeensChurchProgramsContent {
  sectionTitle: string;
  programs: TeensChurchProgramItem[];
}

/** Teens Church – one meeting time (When We Meet) */
export interface TeensChurchMeetingItem {
  day: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface TeensChurchMeetingsContent {
  sectionTitle: string;
  meetings: TeensChurchMeetingItem[];
}

/** K Church page – hero block */
export interface KChurchHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** K Church page – about block */
export interface KChurchAboutContent {
  sectionTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image1Url: string;
  image2Url: string;
}

/** K Church – one program card (What We Do) */
export type KChurchProgramIcon = "BookOpen" | "Music" | "Users" | "Heart" | "Calendar";

export interface KChurchProgramItem {
  icon: KChurchProgramIcon;
  title: string;
  description: string;
}

export interface KChurchProgramsContent {
  sectionTitle: string;
  programs: KChurchProgramItem[];
}

/** K Church – one age group */
export interface KChurchAgeGroupItem {
  age: string;
  title: string;
  description: string;
}

export interface KChurchAgeGroupsContent {
  sectionTitle: string;
  groups: KChurchAgeGroupItem[];
}

/** Children's Ministry page – hero block */
export interface ChildrensMinistryHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** Children's Ministry page – about block */
export interface ChildrensMinistryAboutContent {
  sectionTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image1Url: string;
  image2Url: string;
}

/** Children's Ministry – one program card (What We Do) */
export type ChildrensMinistryProgramIcon = "BookOpen" | "Music" | "Users" | "Heart" | "Calendar";

export interface ChildrensMinistryProgramItem {
  icon: ChildrensMinistryProgramIcon;
  title: string;
  description: string;
}

export interface ChildrensMinistryProgramsContent {
  sectionTitle: string;
  programs: ChildrensMinistryProgramItem[];
}

/** Children's Ministry – one age group */
export interface ChildrensMinistryAgeGroupItem {
  age: string;
  title: string;
  description: string;
}

export interface ChildrensMinistryAgeGroupsContent {
  sectionTitle: string;
  groups: ChildrensMinistryAgeGroupItem[];
}

/** LC Live page – hero block */
export interface LcLiveHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** LC Live – one "where we gather" card */
export interface LcLiveGatherTypeItem {
  title: string;
  description: string;
  examples: string[];
}

export interface LcLiveGatherTypesContent {
  sectionTitle: string;
  sectionSubtitle: string;
  types: LcLiveGatherTypeItem[];
}

/** LC Live – image gallery (3 images) */
export interface LcLiveGalleryContent {
  image1Url: string;
  image1Alt: string;
  image2Url: string;
  image2Alt: string;
  image3Url: string;
  image3Alt: string;
}

/** LC Live – one benefit card */
export type LcLiveBenefitIcon = "Calendar" | "Wifi" | "Users" | "Heart";

export interface LcLiveBenefitItem {
  icon: LcLiveBenefitIcon;
  title: string;
  description: string;
}

export interface LcLiveBenefitsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  benefits: LcLiveBenefitItem[];
}

/** LC Live – visual break (full-width image + overlay text) */
export interface LcLiveVisualBreakContent {
  imageUrl: string;
  headline: string;
  subline: string;
}

/** LC Live – one step in "how to join" */
export interface LcLiveHowToJoinStepItem {
  step: string;
  title: string;
  description: string;
}

export interface LcLiveHowToJoinContent {
  sectionTitle: string;
  steps: LcLiveHowToJoinStepItem[];
  ctaText: string;
  ctaLink?: string;
}

/** Live page – hero block (Watch Live) */
export interface LiveHeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageUrl?: string;
}

/** Live page – one stream card (Sunday Service, LC Live, Stir Up) */
export interface LiveStreamItem {
  title: string;
  description: string;
  ctaLabel: string;
  link: string;
}

export interface LiveStreamsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  streams: LiveStreamItem[];
}

/** 3one6 page – hero */
export interface ThreeOneSixHeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  videoUrl: string;
}

/** 3one6 – one streaming platform link */
export interface ThreeOneSixPlatformItem {
  label: string;
  url: string;
}

export interface ThreeOneSixListenNowContent {
  sectionTitle: string;
  platforms: ThreeOneSixPlatformItem[];
}

/** 3one6 – one release */
export interface ThreeOneSixReleaseItem {
  title: string;
  artist: string;
  featuring: string;
  type: string;
  year: string;
  imageUrl: string;
}

export interface ThreeOneSixReleasesContent {
  sectionTitle: string;
  viewAllText: string;
  viewAllLink: string;
  releases: ThreeOneSixReleaseItem[];
}

export interface ThreeOneSixNowPlayingContent {
  label: string;
  trackTitle: string;
  artistName: string;
}

/** 3one6 – one featured artist */
export interface ThreeOneSixArtistItem {
  name: string;
  role: string;
  imageUrl: string;
}

export interface ThreeOneSixArtistsContent {
  sectionTitle: string;
  artists: ThreeOneSixArtistItem[];
}

export interface ThreeOneSixInYourCityContent {
  title: string;
  subtitle: string;
  body: string;
  ctaText: string;
  videoUrl: string;
}

/** 3one6 – one merch item */
export interface ThreeOneSixMerchItem {
  name: string;
  price: string;
  imageUrl: string;
}

export interface ThreeOneSixMerchContent {
  sectionTitle: string;
  viewAllText: string;
  viewAllLink: string;
  /** Legacy: manual items. Used when productIds is empty. */
  items: ThreeOneSixMerchItem[];
  /** Product IDs from ecommerce. When set, these are shown instead of items. */
  productIds: string[];
}

export interface ThreeOneSixFaithStreetsContent {
  title: string;
  subtitle: string;
  body: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export interface MerchHeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
}

export interface MerchFeaturedProductsContent {
  /** If true, show all active products from ecommerce. If false, use productIds order. */
  showAll: boolean;
  /** Product IDs from ecommerce to show (order preserved). Used when showAll is false. */
  productIds: string[];
}

/** LETOM page – hero block */
export interface LetomHeroContent {
  title: string;
  subtitle: string;
  /** Video plays as hero background when set; otherwise background image is used. */
  videoUrl: string;
  backgroundImageUrl: string;
  primaryCta: string;
  primaryCtaLink?: string;
  secondaryCta: string;
  secondaryCtaLink?: string;
}

/** LETOM page – about block */
export interface LetomAboutContent {
  sectionTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image1Url: string;
  image2Url: string;
}

/** LETOM – one outreach program card */
export type LetomProgramIcon = "School" | "Users" | "Heart";

export interface LetomProgramItem {
  icon: LetomProgramIcon;
  title: string;
  description: string;
}

export interface LetomProgramsContent {
  sectionTitle: string;
  programs: LetomProgramItem[];
}

/** LETOM – one upcoming event */
export interface LetomEventItem {
  date: string;
  location: string;
  title: string;
  imageUrl: string;
}

export interface LetomEventsContent {
  sectionTitle: string;
  events: LetomEventItem[];
}

/** LETOM – Get Involved block */
export interface LetomGetInvolvedContent {
  sectionTitle: string;
  subtitle: string;
  forSchoolsTitle: string;
  forSchoolsBody: string;
  forSchoolsCta: string;
  forSchoolsCtaLink?: string;
  forVolunteersTitle: string;
  forVolunteersBody: string;
  forVolunteersCta: string;
  forVolunteersCtaLink?: string;
}

export type ContentMap = {
  hero: HeroContent;
  welcome: WelcomeContent;
  visit: VisitContent;
  visitHero: VisitHeroContent;
  latestSermon: LatestSermonContent;
  ministries: MinistriesContent;
  footer: FooterContent;
  header: HeaderContent;
  site: SiteContent;
  aboutHero: AboutHeroContent;
  aboutStory: AboutStoryContent;
  aboutMissionVision: AboutMissionVisionContent;
  aboutMessage: AboutMessageContent;
  aboutCultures: AboutCulturesContent;
  aboutCoreValues: AboutCoreValuesContent;
  aboutServiceTimes: AboutServiceTimesContent;
  aboutCta: AboutCtaContent;
  giveHero: GiveHeroContent;
  giveWaysToGive: GiveWaysToGiveContent;
  giveImpact: GiveImpactContent;
  giveCommit: GiveCommitContent;
  giveCta: GiveCtaContent;
  serveHero: ServeHeroContent;
  serveDepartments: ServeDepartmentsContent;
  serveCta: ServeCtaContent;
  eventsFeatured: EventsFeaturedContent;
  teensChurchHero: TeensChurchHeroContent;
  teensChurchAbout: TeensChurchAboutContent;
  teensChurchPrograms: TeensChurchProgramsContent;
  teensChurchMeetings: TeensChurchMeetingsContent;
  kChurchHero: KChurchHeroContent;
  kChurchAbout: KChurchAboutContent;
  kChurchPrograms: KChurchProgramsContent;
  kChurchAgeGroups: KChurchAgeGroupsContent;
  childrensMinistryHero: ChildrensMinistryHeroContent;
  childrensMinistryAbout: ChildrensMinistryAboutContent;
  childrensMinistryPrograms: ChildrensMinistryProgramsContent;
  childrensMinistryAgeGroups: ChildrensMinistryAgeGroupsContent;
  lcLiveHero: LcLiveHeroContent;
  lcLiveGatherTypes: LcLiveGatherTypesContent;
  lcLiveGallery: LcLiveGalleryContent;
  lcLiveBenefits: LcLiveBenefitsContent;
  lcLiveVisualBreak: LcLiveVisualBreakContent;
  lcLiveHowToJoin: LcLiveHowToJoinContent;
  liveHero: LiveHeroContent;
  liveStreams: LiveStreamsContent;
  threeOneSixHero: ThreeOneSixHeroContent;
  threeOneSixListenNow: ThreeOneSixListenNowContent;
  threeOneSixReleases: ThreeOneSixReleasesContent;
  threeOneSixNowPlaying: ThreeOneSixNowPlayingContent;
  threeOneSixArtists: ThreeOneSixArtistsContent;
  threeOneSixInYourCity: ThreeOneSixInYourCityContent;
  threeOneSixMerch: ThreeOneSixMerchContent;
  threeOneSixFaithStreets: ThreeOneSixFaithStreetsContent;
  merchHero: MerchHeroContent;
  merchFeaturedProducts: MerchFeaturedProductsContent;
  letomHero: LetomHeroContent;
  letomAbout: LetomAboutContent;
  letomPrograms: LetomProgramsContent;
  letomEvents: LetomEventsContent;
  letomGetInvolved: LetomGetInvolvedContent;
};

export interface ContentDoc<T = unknown> {
  id: ContentSectionId;
  updatedAt: string;
  data: T;
}
