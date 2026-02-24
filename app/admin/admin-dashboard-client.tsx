"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ADMIN_PAGES,
  PREVIEW_URL_BY_PAGE,
  getPageById,
  PAGES_TAB_PAGE_IDS,
  type AdminPageId,
  type AdminMainTabId,
} from "@/lib/admin-pages";
import type { ContentSectionId } from "@/lib/types/cms";
import { AdminContentClient } from "@/app/admin/content/[section]/admin-content-client";
import type { MerchAdminTab } from "@/components/admin/merch-admin";
import { MerchOverviewDashboard } from "@/components/admin/merch-overview-dashboard";
import { MerchCategoriesEditor } from "@/components/admin/merch-categories-editor";
import { MerchProductsList } from "@/components/admin/merch-products-list";
import { MerchOrdersList } from "@/components/admin/merch-orders-list";
import { AdminOverviewDashboard } from "@/components/admin/admin-overview-dashboard";
import {
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Settings,
  Tag,
  Package,
  ShoppingBag,
} from "lucide-react";

const MAIN_TABS: { id: AdminMainTabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "ecommerce", label: "Ecommerce", icon: ShoppingCart },
  { id: "site", label: "Site settings", icon: Settings },
];

const ECOMMERCE_TABS: { id: MerchAdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
];

type PreviewViewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_OPTIONS: { id: PreviewViewport; label: string; icon: typeof Monitor; width: string }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { id: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
];

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
  liveHero: "",
  liveStreams: "",
  threeOneSixHero: "",
  threeOneSixListenNow: "",
  threeOneSixReleases: "",
  threeOneSixNowPlaying: "",
  threeOneSixArtists: "",
  threeOneSixInYourCity: "",
  threeOneSixMerch: "",
  threeOneSixFaithStreets: "",
  merchHero: "Merch Hero",
  merchFeaturedProducts: "Featured Products",
  letomHero: "LETOM Hero",
  letomAbout: "LETOM About",
  letomPrograms: "LETOM Outreach Programs",
  letomEvents: "LETOM Upcoming Events",
  letomGetInvolved: "LETOM Get Involved",
};

const SITE_PAGE = getPageById("site");

export function AdminDashboardClient() {
  const [mainTab, setMainTab] = useState<AdminMainTabId>("overview");
  const [selectedPageId, setSelectedPageId] = useState<AdminPageId | null>(null);
  const [editorSectionId, setEditorSectionId] = useState<ContentSectionId | null>(null);
  const [ecommerceTab, setEcommerceTab] = useState<MerchAdminTab>("overview");
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isPages = mainTab === "pages";
  const isEcommerce = mainTab === "ecommerce";
  const isSite = mainTab === "site";
  const previewUrl =
    isPages && selectedPageId !== null ? PREVIEW_URL_BY_PAGE[selectedPageId] : null;

  const refreshPreview = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.location.reload();
    }
  }, []);

  const openEditor = (sectionId: ContentSectionId) => {
    setEditorSectionId((current) => (current === sectionId ? null : sectionId));
  };

  const scrollToSectionAndHighlight = useCallback(
    (sectionId: ContentSectionId | null) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage(
        { type: "cms-scroll-to-section", sectionId },
        typeof window !== "undefined" ? window.location.origin : "*"
      );
    },
    []
  );

  useEffect(() => {
    scrollToSectionAndHighlight(editorSectionId);
  }, [editorSectionId, scrollToSectionAndHighlight]);

  const handleIframeLoad = useCallback(() => {
    if (editorSectionId) scrollToSectionAndHighlight(editorSectionId);
  }, [editorSectionId, scrollToSectionAndHighlight]);

  const selectPage = (pageId: AdminPageId) => {
    setSelectedPageId(pageId);
    setEditorSectionId(null);
  };

  const goToMain = () => {
    setMainTab("overview");
    setSelectedPageId(null);
    setEditorSectionId(null);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden overscroll-contain">
      {/* Sidebar: when Overview, show main tabs only; when Pages/Ecommerce/Site, show Back + that tab's content */}
      <aside className="flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-neutral-800 bg-neutral-900/50 min-h-0">
        {editorSectionId ? (
          <>
            <div className="p-3 border-b border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={() => setEditorSectionId(null)}
                className="text-sm text-neutral-400 hover:text-white inline-flex items-center gap-1.5 w-full text-left"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                Back to sections
              </button>
            </div>
            <div className="p-3 border-b border-neutral-800 shrink-0">
              <p className="text-sm font-medium text-white">
                Edit: {SECTION_LABELS[editorSectionId]}
              </p>
            </div>
            <div className="scrollbar-hide flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3">
              <AdminContentClient
                section={editorSectionId}
                onSaved={refreshPreview}
                hideBreadcrumbs
              />
            </div>
          </>
        ) : mainTab === "pages" ? (
          <>
            <div className="p-3 border-b border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={goToMain}
                className="text-sm text-neutral-400 hover:text-white inline-flex items-center gap-1.5 w-full text-left"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                Back to main
              </button>
            </div>
            {selectedPageId ? (
              <>
                <div className="p-3 border-b border-neutral-800 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedPageId(null)}
                    className="text-sm text-neutral-400 hover:text-white inline-flex items-center gap-1.5 w-full text-left"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                    Back to pages
                  </button>
                </div>
                <div className="p-3 border-b border-neutral-800">
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                    {getPageById(selectedPageId)?.label ?? "Sections"}
                  </p>
                </div>
                <nav className="flex-1 min-h-0 overflow-y-auto p-2">
                  {getPageById(selectedPageId)?.sections.map((section) => {
                    const SecIcon = section.icon;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => openEditor(section.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                      >
                        <SecIcon className="h-4 w-4 shrink-0" />
                        {section.label}
                      </button>
                    );
                  }) ?? null}
                </nav>
              </>
            ) : (
              <>
                <div className="p-3 border-b border-neutral-800">
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                    Pages
                  </p>
                </div>
                <nav className="flex-1 min-h-0 overflow-y-auto p-2">
                  {PAGES_TAB_PAGE_IDS.map((pageId) => {
                    const page = getPageById(pageId);
                    if (!page) return null;
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => selectPage(page.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium">{page.label}</span>
                        <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
                      </button>
                    );
                  })}
                </nav>
              </>
            )}
          </>
        ) : mainTab === "ecommerce" ? (
          <>
            <div className="p-3 border-b border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={goToMain}
                className="text-sm text-neutral-400 hover:text-white inline-flex items-center gap-1.5 w-full text-left"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                Back to main
              </button>
            </div>
            <div className="p-3 border-b border-neutral-800">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                Ecommerce
              </p>
            </div>
            <nav className="flex-1 min-h-0 overflow-y-auto p-2">
              {ECOMMERCE_TABS.map(({ id, label, icon: Icon }) => {
                const isSelected = ecommerceTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setEcommerceTab(id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-neutral-700 text-white"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </button>
                );
              })}
            </nav>
          </>
        ) : mainTab === "site" && SITE_PAGE ? (
          <>
            <div className="p-3 border-b border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={goToMain}
                className="text-sm text-neutral-400 hover:text-white inline-flex items-center gap-1.5 w-full text-left"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                Back to main
              </button>
            </div>
            <div className="p-3 border-b border-neutral-800">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                Site settings
              </p>
            </div>
            <nav className="flex-1 min-h-0 overflow-y-auto p-2">
              {SITE_PAGE.sections.map((section) => {
                const SecIcon = section.icon;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => openEditor(section.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                  >
                    <SecIcon className="h-4 w-4 shrink-0" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </>
        ) : (
          <>
            <div className="p-2 border-b border-neutral-800 shrink-0">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2 mb-1">
                Main
              </p>
              {MAIN_TABS.map(({ id, label, icon: Icon }) => {
                const isSelected = mainTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMainTab(id);
                      if (id !== "pages") setSelectedPageId(null);
                      if (id !== "site") setEditorSectionId(null);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-neutral-700 text-white"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
                  </button>
                );
              })}
            </div>
            <div className="flex-1 min-h-0" />
          </>
        )}
      </aside>

      {/* Main: overview, iframe preview, ecommerce UI, or site settings */}
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-neutral-950 overscroll-contain">
        {mainTab === "overview" ? (
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-neutral-900/50">
            <AdminOverviewDashboard onSelectTab={setMainTab} />
          </div>
        ) : mainTab === "ecommerce" ? (
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-neutral-900/50">
            {ecommerceTab === "overview" && (
              <MerchOverviewDashboard onSelectTab={setEcommerceTab} />
            )}
            {ecommerceTab === "categories" && <MerchCategoriesEditor />}
            {ecommerceTab === "products" && <MerchProductsList onSaved={refreshPreview} />}
            {ecommerceTab === "orders" && <MerchOrdersList />}
          </div>
        ) : mainTab === "site" ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-6 sm:p-8 border-b border-neutral-800 shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                <Settings className="h-8 w-8 text-neutral-400" />
                Site settings
              </h1>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base">
                {editorSectionId
                  ? `Editing: ${SECTION_LABELS[editorSectionId]}`
                  : "Manage site name, SEO, and footer. Select a section in the sidebar to edit."}
              </p>
            </div>
            {!editorSectionId && (
              <div className="p-6 sm:p-8">
                <p className="text-neutral-500 text-sm">Select a section from the sidebar to get started.</p>
              </div>
            )}
          </div>
        ) : isPages && previewUrl ? (
          <>
            <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-neutral-800 bg-neutral-900/30 shrink-0 flex-wrap">
              <span className="text-sm text-neutral-500 truncate">
                Preview: {previewUrl === "/" ? "Home" : previewUrl}
              </span>
              <div className="flex items-center gap-1">
                {VIEWPORT_OPTIONS.map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPreviewViewport(id)}
                    className={`p-2 rounded-md text-sm transition-colors ${
                      previewViewport === id
                        ? "bg-neutral-700 text-white"
                        : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
                <Link
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 text-sm inline-flex items-center gap-1 shrink-0"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden overscroll-contain flex justify-center bg-neutral-800">
              <div
                className="h-full bg-white shrink-0 transition-[width] duration-200"
                style={{
                  width:
                    previewViewport === "desktop"
                      ? "100%"
                      : VIEWPORT_OPTIONS.find((o) => o.id === previewViewport)?.width ?? "100%",
                }}
              >
                <iframe
                  ref={iframeRef}
                  key={previewUrl}
                  src={previewUrl}
                  title="Site preview"
                  className="h-full w-full border-0 bg-white block"
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </>
        ) : mainTab === "pages" ? (
          <div className="flex-1 flex items-center justify-center text-neutral-500">
            <p className="text-sm">Select a page from the sidebar to preview and edit its sections.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
