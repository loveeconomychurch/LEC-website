"use client";

import { useState } from "react";
import { MerchOverviewDashboard } from "./merch-overview-dashboard";
import { MerchCategoriesEditor } from "./merch-categories-editor";
import { MerchProductsList } from "./merch-products-list";
import { MerchOrdersList } from "./merch-orders-list";
import {
  LayoutDashboard,
  Tag,
  Package,
  ShoppingBag,
} from "lucide-react";

export type MerchAdminTab = "overview" | "categories" | "products" | "orders";

const TABS: { id: MerchAdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
];

export function MerchAdmin({ onSaved }: { onSaved?: () => void }) {
  const [tab, setTab] = useState<MerchAdminTab>("overview");

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="flex border-b border-neutral-800 shrink-0 flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === id
                ? "text-white border-b-2 border-[#1762B9] bg-neutral-800/50"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {tab === "overview" && (
          <MerchOverviewDashboard onSelectTab={setTab} />
        )}
        {tab === "categories" && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
            <p className="text-sm text-neutral-500 mb-4">
              Categories are used in the product dropdown when adding or editing products. Add or remove categories below.
            </p>
            <div className="rounded-lg border border-neutral-700 bg-neutral-800/30 p-4 max-w-xl">
              <MerchCategoriesEditor />
            </div>
          </div>
        )}
        {tab === "products" && <MerchProductsList onSaved={onSaved} />}
        {tab === "orders" && <MerchOrdersList />}
      </div>
    </div>
  );
}
