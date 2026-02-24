import type { AdminPageId } from "@/lib/admin-pages";
import { isValidPageId } from "@/lib/admin-pages";
import { AdminPageSectionsClient } from "./admin-page-sections-client";

const VALID_PAGE_IDS: AdminPageId[] = ["home", "about", "site", "give", "serve", "events", "visitPage"];

export function generateStaticParams() {
  return VALID_PAGE_IDS.map((page) => ({ page }));
}

export default function AdminPageSectionsPage({
  params,
}: {
  params: { page: string };
}) {
  if (!isValidPageId(params.page)) {
    return (
      <div>
        <p className="text-red-400">Unknown page.</p>
      </div>
    );
  }

  return <AdminPageSectionsClient pageId={params.page as AdminPageId} />;
}
