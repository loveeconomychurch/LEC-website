import type {
  HeroContent,
  WelcomeContent,
  VisitContent,
  VisitHeroContent,
  LatestSermonContent,
  MinistriesContent,
  FooterContent,
  HeaderContent,
  SiteContent,
  AboutHeroContent,
  AboutStoryContent,
  AboutMissionVisionContent,
  AboutMessageContent,
  AboutCulturesContent,
  AboutCoreValuesContent,
  AboutServiceTimesContent,
  AboutCtaContent,
  GiveHeroContent,
  GiveWaysToGiveContent,
  GiveImpactContent,
  GiveCommitContent,
  GiveCtaContent,
  ServeHeroContent,
  ServeDepartmentsContent,
  ServeCtaContent,
  EventsFeaturedContent,
  TeensChurchHeroContent,
  TeensChurchAboutContent,
  TeensChurchProgramsContent,
  TeensChurchMeetingsContent,
  KChurchHeroContent,
  KChurchAboutContent,
  KChurchProgramsContent,
  KChurchAgeGroupsContent,
  ChildrensMinistryHeroContent,
  ChildrensMinistryAboutContent,
  ChildrensMinistryProgramsContent,
  ChildrensMinistryAgeGroupsContent,
  LcLiveHeroContent,
  LcLiveGatherTypesContent,
  LcLiveGatherTypeItem,
  LcLiveGalleryContent,
  LcLiveBenefitsContent,
  LcLiveBenefitItem,
  LcLiveVisualBreakContent,
  LcLiveHowToJoinContent,
  LcLiveHowToJoinStepItem,
  LiveHeroContent,
  LiveStreamsContent,
  LiveStreamItem,
  ThreeOneSixHeroContent,
  ThreeOneSixListenNowContent,
  ThreeOneSixPlatformItem,
  ThreeOneSixReleasesContent,
  ThreeOneSixReleaseItem,
  ThreeOneSixNowPlayingContent,
  ThreeOneSixArtistsContent,
  ThreeOneSixArtistItem,
  ThreeOneSixInYourCityContent,
  ThreeOneSixMerchContent,
  ThreeOneSixMerchItem,
  ThreeOneSixFaithStreetsContent,
  MerchHeroContent,
  MerchFeaturedProductsContent,
  LetomHeroContent,
  LetomAboutContent,
  LetomProgramsContent,
  LetomProgramItem,
  LetomEventsContent,
  LetomEventItem,
  LetomGetInvolvedContent,
} from "./types/cms";

export const defaultHero: HeroContent = {
  headline: "OUR YEAR OF ABUNDANT GRACE AND GREAT APOSTLESHIP",
  subtitle:
    "We're a church built on grace and driven by love — dispensing the life of Christ into our homes, our city, and the nations.",
  serviceTimes: "Sundays at 9am to 12:30pm | Wednesdays at 7pm",
  primaryCta: "Join Our Community",
  primaryCtaLink: "/visit",
  secondaryCta: "Watch Online",
  secondaryCtaLink: "/give",
  videoUrl: "/LEC_service.mp4",
  backgroundImageUrl: "",
};

export const defaultWelcome: WelcomeContent = {
  label: "Welcome to Love Economy Church",
  headline:
    "We're one church with multiple congregations. Gathering across the city to love God, the church, the community, and the nations.",
  visitCta: "Visit",
  visitCtaLink: "/visit",
  aboutCta: "About us",
  aboutCtaLink: "/about",
  marqueeImages: [],
};

export const defaultVisitHero: VisitHeroContent = {
  title: "Join us for service",
  subheadline:
    "Find us next to you. You'd be surprised to know we are right next door.",
  ctaText: "Find a branch",
  ctaLink: "/locations",
};

export const defaultVisit: VisitContent = {
  headline: "Join us for service",
  subheadline:
    "Find us next to you. You'd be surprised to know we are right next door",
  cardTitle: "Find a branch near you",
  cardSubtitle: "Visit a branch",
  cardCta: "Locate branch",
  cardCtaLink: "/locations",
  cardImageUrl: "",
  card2Title: "Find a cell near you",
  card2Subtitle: "Join a cell meeting",
  card2Cta: "Find cell",
  card2CtaLink: "/groups",
  card2ImageUrl: "",
  directionsHeadline: "Need directions? Give us a call.",
  directionsPhone: "+233 24 123 4567",
  directionsButtonText: "Call for directions",
};

export const defaultLatestSermon: LatestSermonContent = {
  sectionTitle: "Watch our Latest Sermon",
  sermonTitle: 'Sermon: "Don\'t Fall For The Trap"',
  speaker: "Speaker: Bishop Isaac Oti-Boateng",
  thumbnailUrl: "",
  videoUrl: "",
  watchMoreLabel: "Watch more on YouTube",
  watchMoreUrl: "",
};

export const defaultMinistries: MinistriesContent = {
  sectionTitle: "Sunday, Fun day, Don't miss it",
  sectionSubtitle:
    "Discover meaningful ways to grow in faith, build relationships, and make a difference in our community",
  ministries: [
    {
      label: "Teens church",
      headline: "A vibrant place where for growth and worship.",
      showLearnMore: true,
      learnMoreLink: "/teens-church",
      bgColor: "green-700",
      icon: "fastForward",
    },
    {
      label: "K church",
      headline: "Fun, faith, and growth for every child.",
      showLearnMore: false,
      bgColor: "black",
      icon: "smile",
    },
    {
      label: "Childrens ministry",
      headline: "Growing little hearts for Jesus.",
      showLearnMore: true,
      learnMoreLink: "/childrens-ministry",
      bgColor: "yellow-700",
      icon: "",
    },
    {
      label: "",
      headline: "",
      showLearnMore: true,
      learnMoreLink: "/3one6",
      backgroundImage: "",
      icon: "",
    },
    {
      label: "L.E.T.O.M",
      headline: "Love Economy Teens Outreach Ministry",
      showLearnMore: true,
      learnMoreLink: "/letom",
      videoUrl: "/letom.mov",
      bgColor: "amber-800",
      icon: "",
    },
  ],
};

export const defaultFooter: FooterContent = {
  tagline:
    "A place where faith comes alive through worship, community, and God's transforming love.",
  newsletterTitle: "Don't miss a beat",
  newsletterPlaceholder: "Enter your email",
  newsletterButton: "Subscribe",
  newsletterDescription:
    "Subscribe to our newsletter to get the latest news and updates.",
};

export const defaultSite: SiteContent = {
  siteName: "Love Economy Church",
  metaTitle: "Love Economy Church - Where Love Transforms Lives",
  metaDescription:
    "Join us for inspiring worship, meaningful community, and life-changing messages. Experience God's love economy in a welcoming environment.",
};

export const defaultHeader: HeaderContent = {
  logoUrl: "/love-economy-church-logo.png",
  logoAlt: "Love Economy Church Logo",
  searchPlaceholder: "Search",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "LC Live", href: "/groups" },
    { label: "About", href: "/about" },
  ],
};

const defaultAboutCulturesList = [
  { number: "1", title: "We celebrate God and His word", description: "by receiving the word and responding to it with all readiness of mind and heart.", references: "[Acts 17:11, Prov 4:20-21]" },
  { number: "2", title: "We celebrate the Holy Spirit", description: "by acknowledging His presence and ministry in our lives.", references: "[Jn 14:16, Jn 16:13]" },
  { number: "3", title: "Soul winning without shame", description: "", references: "[Pro 11:30, Rom 1:16]" },
  { number: "4", title: "Culture of giving and love", description: "Tithing, offering, first fruits, seed sowing, partnering.", references: "[Gen 8:22, Col 3:14, 1Cor 13, Phi 2:1-2, Rom 5:5]" },
  { number: "5", title: "Culture of diligence and excellence", description: "", references: "[Pro 22:29, Pro 12:24, Pro 6:6-11, Dan 6:3, Phi 1:10]" },
  { number: "6", title: "Culture of learning and discipline", description: "Learning, meditation, and discipline.", references: "[2Ti 2:15, Ezr 7:10, Jos 1:8, 1 Ti 4:15, 1 Cor 9:27, 2 Ti 2:3-5]" },
  { number: "7", title: "Culture of accountability", description: "", references: "[1Pet 5:1-5]" },
  { number: "8", title: "Culture of receiving correction", description: "Receiving correction with delight.", references: "[Heb 12:6-8]" },
  { number: "9", title: "Culture of focus or concentration", description: "", references: "[Psa 90:12]" },
];

const defaultAboutCoreValuesList = [
  { title: "Love", description: "We believe love is the foundation of everything we do. It's through love that lives are transformed and communities are changed." },
  { title: "Truth", description: "We're committed to teaching the Bible as God's Word, providing clear, practical guidance for everyday life." },
  { title: "Community", description: "We value authentic relationships and believe in doing life together, supporting and encouraging one another." },
  { title: "Impact", description: "We're passionate about making a difference in our neighborhoods and reaching the nations with the Gospel." },
];

export const defaultAboutHero: AboutHeroContent = {
  heroTitle: "About Us",
  heroSubtitle: "We're one church with multiple congregations. Gathering across the city to love God, the church, the community, and the nations.",
  heroImageUrl: "",
};

export const defaultAboutStory: AboutStoryContent = {
  storyTitle: "Our Story",
  storyParagraph1: "Love Economy Church is a community where faith transforms lives and purpose drives action. We believe in the power of love to create lasting change in our hearts, families, and world.",
  storyParagraph2: "Founded on biblical principles and a heart for serving others, we've grown from a small gathering into a vibrant church family with multiple locations. Our journey is marked by God's faithfulness and the incredible ways He has used our community to make a difference.",
  storyParagraph3: "We're committed to creating spaces where everyone can experience God's love, grow in their faith, and discover their purpose. Whether you're exploring faith for the first time or looking to deepen your relationship with God, you're welcome here.",
};

export const defaultAboutMissionVision: AboutMissionVisionContent = {
  missionVisionTitle: "Our Mission & Vision",
  missionVisionSubtitle: "What drives us forward",
  missionTitle: "Our Mission",
  missionText: "The mission of the Church explains the practical processes that are to happen to the targets of the vision to ensure its fulfillment.\n\nThe mission is as follows:\n\nBuilding Christ into all men through the Revelation (Galatians 1:16), Formation (Galatians 4:19), Magnification (Philippians 1:20) and Glorification (2 Thessalonians 1:12) of Christ, until all men conform to the image of His Son (Romans 8:29), using Christ as the building material.",
  visionTitle: "Our Vision",
  visionText: "The vision of the Church is what defines the purpose and the scope of activities of the Church.\n\nThe vision is as follows:\n\nTo build a world where Christ is all and in all and to make Christ the centre of the world by dispensing Christ with love, the Holy Ghost as our means.\n\n(Colossians 3:11)",
};

export const defaultAboutMessage: AboutMessageContent = {
  messageTitle: "Our Message",
  messageTagline: "We preach LOVE i.e. dispensing Christ with Love with the Holy Spirit as our means.",
  messagePoint1Title: "1. God's love for me. (John 3:16)",
  messagePoint1aTitle: "a. God sent Jesus because He loves humanity.",
  messagePoint1aText: "Jesus' birth, life, crucifixion, death, resurrection, ascension, his seating and crowning are all because He loves me.",
  messagePoint1bTitle: "b. Jesus now lives in me through the ministry of the Holy Spirit",
  messagePoint1bText: "to help me live His life of goodness and abundance in this world",
  messagePoint2Title: "2. I love Him because He first loved me. (1 John 4:19)",
  messagePoint2aTitle: "a. I will do anything for Him:",
  messagePoint2aText: "I will go where He wants me to go, do what He wants me to do, share His love (point # 1) with others, help others to know He lives in them through the Holy Spirit. I will do everything for Him because He did everything for me. It is my only way of thanking Him.",
  messagePoint2bTitle: "b. I will aid others in returning His love",
  messagePoint2bText: "by teaching them how to love Him.",
};

export const defaultAboutCultures: AboutCulturesContent = {
  culturesTitle: "Cultures Of The House",
  culturesSubtitle: "Every nation has a culture and Love Economy also has a culture that is reflected by all its members.",
  cultures: defaultAboutCulturesList,
};

export const defaultAboutCoreValues: AboutCoreValuesContent = {
  coreValuesTitle: "Our Core Values",
  coreValuesSubtitle: "The principles that guide everything we do",
  coreValues: defaultAboutCoreValuesList,
};

export const defaultAboutServiceTimes: AboutServiceTimesContent = {
  serviceTimesTitle: "Join Us for Service",
  sundayServices: [
    { label: "Sunday Love Service", time: "9:00 AM" },
    { label: "Sunday Enlargement Service", time: "12:30 PM" },
  ],
  wednesdayLabel: "Wednesdays",
  wednesdayTime: "7:00 PM",
  visitCtaText: "Visit a Location",
};

export const defaultAboutCta: AboutCtaContent = {
  ctaTitle: "Ready to Be Part of Our Story?",
  ctaSubtitle: "We'd love to have you join us as we journey together in faith, love, and purpose.",
  ctaPrimary: "Plan Your Visit",
  ctaSecondary: "Get Connected",
};

export const defaultGiveHero: GiveHeroContent = {
  title: "Invest in God's Kingdom",
  subtitle:
    "Your giving transforms lives and builds the community. Every gift, no matter the size, makes an eternal impact.",
  backgroundImageUrl: "",
  primaryCta: "Give Now",
  primaryCtaLink: "/give",
  secondaryCta: "Got Questions?",
  secondaryCtaLink: "/contact",
};

export const defaultGiveWaysToGive: GiveWaysToGiveContent = {
  sectionTitle: "Ways to Give",
  sectionSubtitle: "Choose the method that works best for you",
  methods: [
    { title: "Online", description: "Give securely through our online portal", icon: "CreditCard" },
    { title: "Mobile", description: "Text GIVE to 555-1234", icon: "Smartphone" },
    { title: "In Person", description: "Give during services or visit our office", icon: "Building" },
    { title: "Planned Giving", description: "Set up recurring donations", icon: "PiggyBank" },
  ],
};

export const defaultGiveImpact: GiveImpactContent = {
  sectionTitle: "Your Impact",
  sectionSubtitle: "Together, we're making a difference in our community and beyond",
  stats: [
    { number: "50+", label: "Communities Served", icon: "Users" },
    { number: "$1M+", label: "Given This Year", icon: "TrendingUp" },
    { number: "10,000+", label: "Lives Impacted", icon: "Heart" },
  ],
};

export const defaultGiveCommit: GiveCommitContent = {
  sectionTitle: "Commit to Giving",
  sectionSubtitle: "Take your giving to the next level through tithing and partnership",
  tither: {
    title: "Become a Tither",
    description:
      "Commit to giving 10% of your income as a tithe. Tithing is a biblical principle that demonstrates trust in God's provision and helps sustain the church's mission.",
    bullets: [
      "Honor God with your firstfruits",
      "Support the church's ministries and operations",
      "Experience the blessing of faithful giving",
    ],
    buttonText: "Start Tithing",
  },
  partner: {
    title: "Become a Partner",
    description:
      "Partner with us through regular, committed giving. Partners are our dedicated supporters who enable us to expand our reach and impact more lives.",
    bullets: [
      "Make a recurring commitment to give monthly",
      "Help us plan and grow our ministries",
      "Join a community of committed supporters",
    ],
    buttonText: "Become a Partner",
  },
};

export const defaultGiveCta: GiveCtaContent = {
  headline: "Ready to Make a Difference?",
  body: "Join us in building God's kingdom and transforming lives through your generous giving.",
  buttonText: "Start Giving Today",
  buttonLink: "/give",
};

export const defaultServeHero: ServeHeroContent = {
  title: "Serve",
  subtitle:
    "Discover how you can use your gifts and talents to serve God and make a difference in our church community.",
  backgroundImageUrl: "",
  primaryCta: "Get Involved",
  secondaryCta: "Learn More",
  secondaryCtaLink: "/contact",
};

export const defaultServeDepartments: ServeDepartmentsContent = {
  sectionTitle: "Church Departments",
  sectionSubtitle: "Explore the various ways you can serve and contribute to the church's mission",
  joinButtonText: "Join Team",
  departments: [
    { name: "Love Choir", icon: "Mic", description: "Lead worship through music and vocals, ministering to hearts through song." },
    { name: "Lyrical Levites", icon: "Users", description: "Serve in worship ministry through lyrical expression and creative arts." },
    { name: "Love Ushers", icon: "HandHeart", description: "Welcome and assist members and guests, ensuring a warm and organized worship experience." },
    { name: "Estate", icon: "Building", description: "Maintain and manage church facilities, ensuring a clean and functional environment." },
    { name: "Protocol", icon: "ClipboardCheck", description: "Handle administrative tasks and ensure smooth operations during services and events." },
    { name: "Social Jesus", icon: "Heart", description: "Engage with the community through social media and digital platforms to share the Gospel." },
    { name: "Virtual Care", icon: "Globe", description: "Provide support and care to online attendees and members connecting virtually." },
    { name: "Videography", icon: "Video", description: "Capture and produce video content to document services and events." },
    { name: "Photography", icon: "Camera", description: "Capture moments through photography, preserving memories and creating visual content." },
    { name: "Lights", icon: "Lightbulb", description: "Manage lighting systems to enhance worship atmosphere and visual presentations." },
    { name: "Sound", icon: "Radio", description: "Operate audio systems ensuring clear sound quality for all services and events." },
    { name: "Live Stream", icon: "Monitor", description: "Broadcast services live online, reaching members and viewers around the world." },
    { name: "Love Tech", icon: "Monitor", description: "Support church technology needs, maintaining systems and assisting with tech solutions." },
    { name: "Beautiful Feet", icon: "Footprints", description: "Serve in outreach and evangelism, sharing the Gospel and serving the community." },
    { name: "Bimmywood", icon: "Film", description: "Create video productions, films, and multimedia content for church ministries." },
  ],
};

export const defaultServeCta: ServeCtaContent = {
  headline: "Ready to Serve?",
  body: "Every member has a role to play. Find your place and make a lasting impact through service.",
  buttonText: "Get Started",
};

export const defaultEventsFeatured: EventsFeaturedContent = {
  events: [
    { title: "Yadah", imageUrl: "", date: "Dec 24, 7:00 PM", location: "Main Sanctuary" },
    { title: "Believer's Convention 25", imageUrl: "", date: "TBA", location: "Main Sanctuary" },
    { title: "One Life Jam", imageUrl: "", date: "TBA", location: "Youth Center" },
    { title: "Youth Summer Retreat", imageUrl: "", date: "TBA", location: "Camp" },
    { title: "Community Outreach Event", imageUrl: "", date: "TBA", location: "Various" },
  ],
};

export const defaultTeensChurchHero: TeensChurchHeroContent = {
  title: "Teens Church",
  subtitle: "A place where teenagers can be real, find community, and discover their purpose in Christ.",
  backgroundImageUrl: "",
  primaryCta: "Join Us",
  secondaryCta: "Learn More",
  secondaryCtaLink: "#about",
};

export const defaultTeensChurchAbout: TeensChurchAboutContent = {
  sectionTitle: "About Teens Church",
  paragraph1:
    "Teens Church is a vibrant ministry designed specifically for teenagers (ages 12-18). We create a space where teens can explore their faith, ask tough questions, and build authentic relationships with peers and mentors.",
  paragraph2:
    "We understand that the teenage years are filled with questions, challenges, and opportunities for growth. Teens Church is a place where teens can be real about their struggles and victories, and discover how God's love and truth applies to their everyday lives.",
  paragraph3:
    "Through relevant teaching, dynamic worship, and genuine community, we help teenagers develop a faith that's their own—one that will carry them through high school and beyond.",
  image1Url: "",
  image2Url: "",
};

const defaultTeensChurchProgramsList: TeensChurchProgramsContent["programs"] = [
  { icon: "BookOpen", title: "Bible Study", description: "Interactive Bible studies that speak to the real issues teens face today." },
  { icon: "Music", title: "Worship", description: "Dynamic worship experiences designed for the next generation." },
  { icon: "Users", title: "Small Groups", description: "Age-appropriate small groups where teens build authentic relationships." },
  { icon: "Heart", title: "Mentorship", description: "Ongoing mentorship and discipleship to help teens grow in faith." },
];

export const defaultTeensChurchPrograms: TeensChurchProgramsContent = {
  sectionTitle: "What We Do",
  programs: defaultTeensChurchProgramsList,
};

const defaultTeensChurchMeetingsList: TeensChurchMeetingsContent["meetings"] = [
  { day: "Sunday", time: "11:00 AM - 12:30 PM", location: "Teens Room", description: "Main service with worship, teaching, and small groups", imageUrl: "" },
  { day: "Wednesday", time: "7:00 PM - 8:30 PM", location: "Teens Room", description: "Mid-week Bible study and discipleship", imageUrl: "" },
  { day: "Friday", time: "6:00 PM - 9:00 PM", location: "Various Locations", description: "Fun events, outreach, and social activities", imageUrl: "" },
];

export const defaultTeensChurchMeetings: TeensChurchMeetingsContent = {
  sectionTitle: "When We Meet",
  meetings: defaultTeensChurchMeetingsList,
};

export const defaultKChurchHero: KChurchHeroContent = {
  title: "K-Church",
  subtitle:
    "Fun, faith, and growth for every child. A safe and exciting place where kids can discover Jesus and build lasting friendships.",
  backgroundImageUrl: "",
  primaryCta: "Join Us",
  secondaryCta: "Learn More",
  secondaryCtaLink: "#about",
};

export const defaultKChurchAbout: KChurchAboutContent = {
  sectionTitle: "About K-Church",
  paragraph1:
    "K-Church is our children's ministry designed to help kids discover Jesus in a fun, safe, and engaging environment. We believe that children are not just the future of the church—they are vital members of God's family right now.",
  paragraph2:
    "Our goal is to partner with parents in raising children who love God, serve others, and make a difference in their world. Through age-appropriate teaching, creative activities, and meaningful relationships, we help kids grow in faith and character.",
  paragraph3:
    "From toddlers to pre-teens, every child has a place to belong, learn, and grow in their relationship with Jesus.",
  image1Url: "",
  image2Url: "",
};

const defaultKChurchProgramsList: KChurchProgramsContent["programs"] = [
  { icon: "BookOpen", title: "Bible Stories", description: "Engaging Bible lessons that help children understand God's love and truth." },
  { icon: "Heart", title: "Worship & Praise", description: "Fun, age-appropriate worship that helps kids connect with God." },
  { icon: "Users", title: "Small Groups", description: "Age-specific groups where kids build friendships and grow together." },
  { icon: "Calendar", title: "Special Events", description: "Holiday celebrations, VBS, and exciting events throughout the year." },
];

export const defaultKChurchPrograms: KChurchProgramsContent = {
  sectionTitle: "What We Do",
  programs: defaultKChurchProgramsList,
};

const defaultKChurchAgeGroupsList: KChurchAgeGroupsContent["groups"] = [
  { age: "Ages 2-5", title: "Little Kids", description: "Play-based learning and foundational Bible stories" },
  { age: "Ages 6-8", title: "Elementary", description: "Interactive lessons and beginning to explore faith" },
  { age: "Ages 9-11", title: "Pre-Teens", description: "Deeper Bible study and preparing for teen years" },
];

export const defaultKChurchAgeGroups: KChurchAgeGroupsContent = {
  sectionTitle: "Age Groups",
  groups: defaultKChurchAgeGroupsList,
};

export const defaultChildrensMinistryHero: ChildrensMinistryHeroContent = {
  title: "Children's Ministry",
  subtitle:
    "A place where every child belongs. We help kids discover Jesus through fun, age-appropriate teaching and lasting friendships.",
  backgroundImageUrl: "",
  primaryCta: "Join Us",
  secondaryCta: "Learn More",
  secondaryCtaLink: "#about",
};

export const defaultChildrensMinistryAbout: ChildrensMinistryAboutContent = {
  sectionTitle: "About Children's Ministry",
  paragraph1:
    "Our Children's Ministry exists to help kids know Jesus and grow in their faith. We create a safe, engaging environment where children from toddlers to pre-teens can learn God's Word and build meaningful relationships.",
  paragraph2:
    "We partner with families to raise children who love God and serve others. Through creative teaching, worship, and small groups, we help every child discover their place in God's family.",
  paragraph3:
    "Whatever their age or stage, every child has a place to belong and grow in their relationship with Jesus.",
  image1Url: "",
  image2Url: "",
};

const defaultChildrensMinistryProgramsList: ChildrensMinistryProgramsContent["programs"] = [
  { icon: "BookOpen", title: "Bible Stories", description: "Engaging Bible lessons that help children understand God's love and truth." },
  { icon: "Heart", title: "Worship & Praise", description: "Fun, age-appropriate worship that helps kids connect with God." },
  { icon: "Users", title: "Small Groups", description: "Age-specific groups where kids build friendships and grow together." },
  { icon: "Calendar", title: "Special Events", description: "Holiday celebrations, VBS, and exciting events throughout the year." },
];

export const defaultChildrensMinistryPrograms: ChildrensMinistryProgramsContent = {
  sectionTitle: "What We Do",
  programs: defaultChildrensMinistryProgramsList,
};

const defaultChildrensMinistryAgeGroupsList: ChildrensMinistryAgeGroupsContent["groups"] = [
  { age: "Ages 2-5", title: "Little Kids", description: "Play-based learning and foundational Bible stories" },
  { age: "Ages 6-8", title: "Elementary", description: "Interactive lessons and beginning to explore faith" },
  { age: "Ages 9-11", title: "Pre-Teens", description: "Deeper Bible study and preparing for teen years" },
];

export const defaultChildrensMinistryAgeGroups: ChildrensMinistryAgeGroupsContent = {
  sectionTitle: "Age Groups",
  groups: defaultChildrensMinistryAgeGroupsList,
};

export const defaultLcLiveHero: LcLiveHeroContent = {
  title: "LC Live",
  subtitle:
    "Our Wednesday service—streamed live. Gather in homes, workplaces, open spaces or anywhere you are and watch together online.",
  backgroundImageUrl: "",
  primaryCta: "Watch Live",
  secondaryCta: "Host a Gathering",
};

const defaultLcLiveGatherTypesList: LcLiveGatherTypeItem[] = [
  {
    title: "In Your Home",
    description: "Gather family, flatmates or friends and watch together",
    examples: ["Living rooms", "Family dinners", "Small groups at home"],
  },
  {
    title: "At Work",
    description: "Connect with colleagues for midweek worship",
    examples: ["Office break rooms", "Lunch-hour watch", "After-work gatherings"],
  },
  {
    title: "Open Spaces",
    description: "Take the service anywhere—parks, cafés, anywhere you are",
    examples: ["Parks & outdoors", "Cafés & venues", "Wherever you gather"],
  },
];

export const defaultLcLiveGatherTypes: LcLiveGatherTypesContent = {
  sectionTitle: "Where We Gather",
  sectionSubtitle:
    "LC Live happens wherever people gather to watch—homes, workplaces, open spaces and more",
  types: defaultLcLiveGatherTypesList,
};

export const defaultLcLiveGallery: LcLiveGalleryContent = {
  image1Url: "",
  image1Alt: "People gathered for LC Live",
  image2Url: "",
  image2Alt: "Family watching LC Live together",
  image3Url: "",
  image3Alt: "Wednesday service stream",
};

const defaultLcLiveBenefitsList: LcLiveBenefitItem[] = [
  { icon: "Calendar", title: "Midweek Reset", description: "Break up your week with worship, word and community—every Wednesday." },
  { icon: "Wifi", title: "Church Online", description: "The same service, streamed live. Join from anywhere with an internet connection." },
  { icon: "Users", title: "Gather Anywhere", description: "Homes, workplaces, open spaces—wherever people gather, LC Live is there." },
  { icon: "Heart", title: "Same Heart, One Service", description: "One Wednesday service, one church, happening in countless places at once." },
];

export const defaultLcLiveBenefits: LcLiveBenefitsContent = {
  sectionTitle: "Why LC Live?",
  sectionSubtitle: "Midweek worship and word—wherever you are",
  benefits: defaultLcLiveBenefitsList,
};

export const defaultLcLiveVisualBreak: LcLiveVisualBreakContent = {
  imageUrl: "",
  headline: "Church Where You Are",
  subline: "One Wednesday service. Streamed live. Gather anywhere and watch together.",
};

const defaultLcLiveHowToJoinSteps: LcLiveHowToJoinStepItem[] = [
  { step: "1", title: "Tune In Wednesdays", description: "LC Live streams every Wednesday. Check our schedule and set a reminder so you don't miss it." },
  { step: "2", title: "Gather Your People", description: "Invite family, friends, colleagues or neighbours—whoever you want to watch with, in person or online." },
  { step: "3", title: "Watch Online", description: "Join the stream on our website or platform. One click and you're in—from home, work or anywhere." },
  { step: "4", title: "Experience Together", description: "Worship, listen to the word and connect. Same service, happening in countless places at once." },
];

export const defaultLcLiveHowToJoin: LcLiveHowToJoinContent = {
  sectionTitle: "How to Join",
  steps: defaultLcLiveHowToJoinSteps,
  ctaText: "Watch LC Live",
  ctaLink: "",
};

export const defaultLiveHero: LiveHeroContent = {
  title: "Watch Live",
  subtitle:
    "Join us on YouTube for Sunday Service, LC Live, and Stir Up prayer meetings. Watch live or catch up anytime.",
  ctaText: "Go to YouTube Channel",
  ctaLink: "https://www.youtube.com/@bishopisaacotiboateng",
  backgroundImageUrl: "",
};

const defaultLiveStreamsList: LiveStreamItem[] = [
  {
    title: "Sunday Service",
    description:
      "Join us live every Sunday for worship, the Word, and fellowship. Stream our main service from anywhere.",
    ctaLabel: "Watch Sunday Service",
    link: "https://www.youtube.com/@bishopisaacotiboateng",
  },
  {
    title: "LC Live",
    description:
      "Our Wednesday service—streamed live. Gather in homes, workplaces, or anywhere and watch together online.",
    ctaLabel: "Watch LC Live",
    link: "https://www.youtube.com/@bishopisaacotiboateng",
  },
  {
    title: "Stir Up",
    description:
      "Our prayer meetings. Come together to seek God, stir up faith, and pray for one another and our world.",
    ctaLabel: "Watch Stir Up",
    link: "https://www.youtube.com/@bishopisaacotiboateng",
  },
];

export const defaultLiveStreams: LiveStreamsContent = {
  sectionTitle: "What we stream",
  sectionSubtitle: "Tune in live or watch replays on our YouTube channel.",
  streams: defaultLiveStreamsList,
};

export const defaultThreeOneSixHero: ThreeOneSixHeroContent = {
  title: "3one6",
  subtitle:
    "A record label dedicated to gospel hip hop and rap. Like Maverick City or Elevation Worship, but with the energy and authenticity of rap music.",
  ctaText: "Listen Now",
  videoUrl: "/3one6.mp4",
};

const defaultThreeOneSixPlatforms: ThreeOneSixPlatformItem[] = [
  { label: "iTunes", url: "https://music.apple.com" },
  { label: "Spotify", url: "https://open.spotify.com" },
  { label: "YouTube", url: "https://www.youtube.com" },
  { label: "Google Play", url: "https://play.google.com/store/music" },
  { label: "SoundCloud", url: "https://soundcloud.com" },
];

export const defaultThreeOneSixListenNow: ThreeOneSixListenNowContent = {
  sectionTitle: "LISTEN NOW AT:",
  platforms: defaultThreeOneSixPlatforms,
};

const defaultThreeOneSixReleasesList: ThreeOneSixReleaseItem[] = [
  {
    title: "Kingdom Come",
    artist: "3one6 Collective",
    featuring: "Noah Smith, Elsie Mae",
    type: "Album",
    year: "2024",
    imageUrl: "/worship-team-playing-music-on-church-stage.jpg",
  },
  {
    title: "Faith Over Fear",
    artist: "Marcus Green",
    featuring: "Sarah Johnson",
    type: "Single",
    year: "2024",
    imageUrl: "/youth-group-teenagers-in-church-fellowship.jpg",
  },
  {
    title: "Victory Anthem",
    artist: "3one6 Collective",
    featuring: "David Williams, Grace Thompson",
    type: "EP",
    year: "2023",
    imageUrl: "/church-worship-service-with-people-raising-hands-i.jpg",
  },
  {
    title: "Higher Ground",
    artist: "Elsie Mae",
    featuring: "Noah Smith",
    type: "Single",
    year: "2024",
    imageUrl: "/happy-family-at-church-event-together.jpg",
  },
  {
    title: "Glory Rising",
    artist: "3one6 Collective",
    featuring: "Marcus Green, Sarah Johnson",
    type: "Album",
    year: "2024",
    imageUrl: "/people-praying-together-in-church.jpg",
  },
  {
    title: "Street Gospel",
    artist: "David Williams",
    featuring: "Grace Thompson",
    type: "EP",
    year: "2023",
    imageUrl: "/volunteers-serving-food-at-community-outreach-even.jpg",
  },
];

export const defaultThreeOneSixReleases: ThreeOneSixReleasesContent = {
  sectionTitle: "New Releases",
  viewAllText: "View All",
  viewAllLink: "",
  releases: defaultThreeOneSixReleasesList,
};

export const defaultThreeOneSixNowPlaying: ThreeOneSixNowPlayingContent = {
  label: "Now Playing",
  trackTitle: "Kingdom Come",
  artistName: "3one6 Collective",
};

const defaultThreeOneSixArtistsList: ThreeOneSixArtistItem[] = [
  { name: "Noah Smith", role: "Singer", imageUrl: "" },
  { name: "Elsie Mae", role: "Rapper", imageUrl: "" },
  { name: "Marcus Green", role: "Producer", imageUrl: "" },
  { name: "Sarah Johnson", role: "Songwriter", imageUrl: "" },
  { name: "David Williams", role: "Rapper", imageUrl: "" },
  { name: "Grace Thompson", role: "Singer", imageUrl: "" },
];

export const defaultThreeOneSixArtists: ThreeOneSixArtistsContent = {
  sectionTitle: "Featured Artists",
  artists: defaultThreeOneSixArtistsList,
};

export const defaultThreeOneSixInYourCity: ThreeOneSixInYourCityContent = {
  title: "3one6",
  subtitle: "In your city",
  body:
    "Experience the power of gospel hip hop live. We bring our ministry and music to cities across the nation, connecting faith with beats that move the soul.",
  ctaText: "Join Now",
  videoUrl: "/this_year.mp4",
};

const defaultThreeOneSixMerchList: ThreeOneSixMerchItem[] = [
  { name: "3one6 Hoodie", price: "$45.00", imageUrl: "" },
  { name: "Faith Over Fear Tee", price: "$25.00", imageUrl: "" },
  { name: "Vinyl Album", price: "$30.00", imageUrl: "/3one6.png" },
  { name: "3one6 Cap", price: "$20.00", imageUrl: "" },
  { name: "Kingdom Come CD", price: "$15.00", imageUrl: "/3one6.png" },
  { name: "3one6 Tote Bag", price: "$18.00", imageUrl: "" },
];

export const defaultThreeOneSixMerch: ThreeOneSixMerchContent = {
  sectionTitle: "Upcoming Merch",
  viewAllText: "View All",
  viewAllLink: "",
  items: defaultThreeOneSixMerchList,
  productIds: [],
};

export const defaultThreeOneSixFaithStreets: ThreeOneSixFaithStreetsContent = {
  title: "3one6",
  subtitle: "Faith in the Streets",
  body:
    "Bringing gospel hip hop to every corner. Our music bridges the gap between the sanctuary and the streets with authentic faith and powerful beats.",
  ctaText: "Discover",
  ctaLink: "",
  imageUrl: "/church-worship-service-with-people-raising-hands-i.jpg",
};

export const defaultMerchHero: MerchHeroContent = {
  title: "LEC Merch Store",
  subtitle:
    "Support the church while representing Love Economy Church with our exclusive merchandise.",
  backgroundImageUrl: "/happy-family-at-church-event-together.jpg",
};

export const defaultMerchFeaturedProducts: MerchFeaturedProductsContent = {
  showAll: true,
  productIds: [],
};

export const defaultLetomHero: LetomHeroContent = {
  title: "LETOM",
  subtitle:
    "Reaching out to high schools and teens with the message of God's love, purpose, and transformation.",
  videoUrl: "/letom.mov",
  backgroundImageUrl: "/youth-group-teenagers-in-church-fellowship.jpg",
  primaryCta: "Get Involved",
  primaryCtaLink: "",
  secondaryCta: "Partner With Us",
  secondaryCtaLink: "",
};

export const defaultLetomAbout: LetomAboutContent = {
  sectionTitle: "About LETOM",
  paragraph1:
    "LETOM is our dedicated ministry for outreaches to high schools and teenagers. We believe that the teenage years are crucial for spiritual formation and that high school campuses are mission fields where the Gospel can transform lives.",
  paragraph2:
    "Our mission is to bring the message of hope, purpose, and God's love to high school students through creative outreaches, impactful conferences, and genuine relationships. We partner with schools to create safe spaces where teens can explore faith, ask questions, and encounter Jesus.",
  paragraph3:
    "Through LETOM, we empower teenagers to discover their identity in Christ and to live out their faith boldly in their schools and communities.",
  image1Url: "/youth-group-teenagers-in-church-fellowship.jpg",
  image2Url: "/youth-group-at-winter-retreat-camp.jpg",
};

const defaultLetomProgramsList: LetomProgramItem[] = [
  {
    icon: "School",
    title: "High School Outreach",
    description:
      "Bringing the message of hope and purpose to high school students across the region.",
  },
  {
    icon: "Users",
    title: "Teen Conferences",
    description:
      "Powerful conferences designed to inspire and equip teenagers for their journey of faith.",
  },
  {
    icon: "Heart",
    title: "School Partnerships",
    description:
      "Building relationships with schools to create opportunities for spiritual growth.",
  },
];

export const defaultLetomPrograms: LetomProgramsContent = {
  sectionTitle: "Our Outreach Programs",
  programs: defaultLetomProgramsList,
};

const defaultLetomEventsList: LetomEventItem[] = [
  { date: "March 15, 2024", location: "Accra High School", title: "Spring Outreach Program", imageUrl: "/youth-group-teenagers-in-church-fellowship.jpg" },
  { date: "April 20, 2024", location: "Tema Secondary School", title: "Teen Leadership Conference", imageUrl: "" },
  { date: "May 10, 2024", location: "Kumasi Academy", title: "Youth Worship Night", imageUrl: "" },
];

export const defaultLetomEvents: LetomEventsContent = {
  sectionTitle: "Upcoming Outreaches",
  events: defaultLetomEventsList,
};

export const defaultLetomGetInvolved: LetomGetInvolvedContent = {
  sectionTitle: "Get Involved",
  subtitle:
    "Are you a high school interested in hosting an outreach, or an individual wanting to volunteer? We'd love to connect with you.",
  forSchoolsTitle: "For High Schools",
  forSchoolsBody:
    "Interested in having LETOM visit your school? We'd love to partner with you to bring hope and encouragement to your students.",
  forSchoolsCta: "Contact Us",
  forSchoolsCtaLink: "",
  forVolunteersTitle: "For Volunteers",
  forVolunteersBody:
    "Join our team of passionate volunteers who are committed to reaching the next generation with the Gospel.",
  forVolunteersCta: "Volunteer",
  forVolunteersCtaLink: "",
};

export const defaults = {
  hero: defaultHero,
  welcome: defaultWelcome,
  visit: defaultVisit,
  visitHero: defaultVisitHero,
  latestSermon: defaultLatestSermon,
  ministries: defaultMinistries,
  footer: defaultFooter,
  header: defaultHeader,
  site: defaultSite,
  aboutHero: defaultAboutHero,
  aboutStory: defaultAboutStory,
  aboutMissionVision: defaultAboutMissionVision,
  aboutMessage: defaultAboutMessage,
  aboutCultures: defaultAboutCultures,
  aboutCoreValues: defaultAboutCoreValues,
  aboutServiceTimes: defaultAboutServiceTimes,
  aboutCta: defaultAboutCta,
  giveHero: defaultGiveHero,
  giveWaysToGive: defaultGiveWaysToGive,
  giveImpact: defaultGiveImpact,
  giveCommit: defaultGiveCommit,
  giveCta: defaultGiveCta,
  serveHero: defaultServeHero,
  serveDepartments: defaultServeDepartments,
  serveCta: defaultServeCta,
  eventsFeatured: defaultEventsFeatured,
  teensChurchHero: defaultTeensChurchHero,
  teensChurchAbout: defaultTeensChurchAbout,
  teensChurchPrograms: defaultTeensChurchPrograms,
  teensChurchMeetings: defaultTeensChurchMeetings,
  kChurchHero: defaultKChurchHero,
  kChurchAbout: defaultKChurchAbout,
  kChurchPrograms: defaultKChurchPrograms,
  kChurchAgeGroups: defaultKChurchAgeGroups,
  childrensMinistryHero: defaultChildrensMinistryHero,
  childrensMinistryAbout: defaultChildrensMinistryAbout,
  childrensMinistryPrograms: defaultChildrensMinistryPrograms,
  childrensMinistryAgeGroups: defaultChildrensMinistryAgeGroups,
  lcLiveHero: defaultLcLiveHero,
  lcLiveGatherTypes: defaultLcLiveGatherTypes,
  lcLiveGallery: defaultLcLiveGallery,
  lcLiveBenefits: defaultLcLiveBenefits,
  lcLiveVisualBreak: defaultLcLiveVisualBreak,
  lcLiveHowToJoin: defaultLcLiveHowToJoin,
  liveHero: defaultLiveHero,
  liveStreams: defaultLiveStreams,
  threeOneSixHero: defaultThreeOneSixHero,
  threeOneSixListenNow: defaultThreeOneSixListenNow,
  threeOneSixReleases: defaultThreeOneSixReleases,
  threeOneSixNowPlaying: defaultThreeOneSixNowPlaying,
  threeOneSixArtists: defaultThreeOneSixArtists,
  threeOneSixInYourCity: defaultThreeOneSixInYourCity,
  threeOneSixMerch: defaultThreeOneSixMerch,
  threeOneSixFaithStreets: defaultThreeOneSixFaithStreets,
  merchHero: defaultMerchHero,
  merchFeaturedProducts: defaultMerchFeaturedProducts,
  letomHero: defaultLetomHero,
  letomAbout: defaultLetomAbout,
  letomPrograms: defaultLetomPrograms,
  letomEvents: defaultLetomEvents,
  letomGetInvolved: defaultLetomGetInvolved,
} as const;
