"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getMerchProducts,
  getMerchOrders,
  getMerchCategories,
} from "@/lib/merch";
import type { MerchOrder } from "@/lib/types/merch";
import {
  Package,
  ShoppingBag,
  Tag,
  TrendingUp,
  ArrowRight,
  Loader2,
  ExternalLink,
  Plus,
  AlertCircle,
} from "lucide-react";

import type { MerchAdminTab } from "./merch-admin";

interface MerchOverviewDashboardProps {
  onSelectTab?: (tab: MerchAdminTab) => void;
}

const STATUS_STYLES: Record<MerchOrder["status"], string> = {
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-neutral-600/30 text-neutral-400 border-neutral-500/30",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function MerchOverviewDashboard({ onSelectTab }: MerchOverviewDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    productCount: number;
    activeProductCount: number;
    categoryCount: number;
    orderCount: number;
    pendingOrderCount: number;
    totalRevenue: number;
    recentOrderRevenue: number;
  } | null>(null);
  const [recentOrders, setRecentOrders] = useState<MerchOrder[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [products, orders, categories] = await Promise.all([
        getMerchProducts(),
        getMerchOrders(),
        getMerchCategories(),
      ]);
      const activeCount = products.filter((p) => p.active).length;
      const pendingCount = orders.filter((o) => o.status === "pending").length;
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      const recentRevenue = orders.slice(0, 10).reduce((sum, o) => sum + o.total, 0);

      setStats({
        productCount: products.length,
        activeProductCount: activeCount,
        categoryCount: categories.length,
        orderCount: orders.length,
        pendingOrderCount: pendingCount,
        totalRevenue,
        recentOrderRevenue: recentRevenue,
      });
      setRecentOrders(orders.slice(0, 5));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
      setStats(null);
      setRecentOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-neutral-500" />
        <p className="text-sm text-neutral-500">Loading overview…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-200">Could not load dashboard</p>
            <p className="text-sm text-red-300/80 mt-1">{error}</p>
            <button
              type="button"
              onClick={load}
              className="mt-3 text-sm font-medium text-red-300 hover:text-red-200 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const hasOrders = stats.orderCount > 0;
  const hasProducts = stats.productCount > 0;

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/30 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Ecommerce overview</h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              At a glance: products, orders, and revenue for your merch store.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/merch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View store
            </a>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Stat cards */}
        <section>
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onSelectTab?.("products")}
              className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4 text-left hover:border-neutral-600 hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Products
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">{stats.productCount}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {stats.activeProductCount} visible on store
                  </p>
                </div>
                <div className="rounded-lg bg-neutral-700/80 p-2.5 group-hover:bg-[#1762B9]/20 transition-colors">
                  <Package className="h-5 w-5 text-neutral-400 group-hover:text-[#1762B9]" />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab?.("categories")}
              className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4 text-left hover:border-neutral-600 hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">{stats.categoryCount}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">For product dropdown</p>
                </div>
                <div className="rounded-lg bg-neutral-700/80 p-2.5 group-hover:bg-[#1762B9]/20 transition-colors">
                  <Tag className="h-5 w-5 text-neutral-400 group-hover:text-[#1762B9]" />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab?.("orders")}
              className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4 text-left hover:border-neutral-600 hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Orders
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">{stats.orderCount}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {stats.pendingOrderCount} pending
                  </p>
                </div>
                <div className="rounded-lg bg-neutral-700/80 p-2.5 group-hover:bg-[#1762B9]/20 transition-colors">
                  <ShoppingBag className="h-5 w-5 text-neutral-400 group-hover:text-[#1762B9]" />
                </div>
              </div>
            </button>

            <div className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Total revenue
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Last 10 orders: ${stats.recentOrderRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-neutral-700/80 p-2.5">
                  <TrendingUp className="h-5 w-5 text-neutral-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        {onSelectTab && (
          <section>
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
              Quick actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => onSelectTab("products")}
                className="group flex items-center gap-4 rounded-xl border-2 border-[#1762B9]/40 bg-[#1762B9]/10 p-4 text-left hover:border-[#1762B9] hover:bg-[#1762B9]/20 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1762B9]/20 group-hover:bg-[#1762B9]/30 transition-colors">
                  <Plus className="h-6 w-6 text-[#1762B9]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">Add product</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Create a new product for the store
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#1762B9] opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onSelectTab("categories")}
                className="group flex items-center gap-4 rounded-xl border-2 border-neutral-700 bg-neutral-800/60 p-4 text-left hover:border-neutral-600 hover:bg-neutral-800 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-700/80 group-hover:bg-neutral-600 transition-colors">
                  <Tag className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">Manage categories</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Add or remove product categories
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => onSelectTab("orders")}
                className="group flex items-center gap-4 rounded-xl border-2 border-neutral-700 bg-neutral-800/60 p-4 text-left hover:border-neutral-600 hover:bg-neutral-800 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-700/80 group-hover:bg-neutral-600 transition-colors">
                  <ShoppingBag className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">View all orders</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {stats.pendingOrderCount > 0
                      ? `${stats.pendingOrderCount} pending — review and update status`
                      : "Review order history and status"}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </section>
        )}

        {/* Recent orders */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Recent orders
            </h2>
            {hasOrders && onSelectTab && (
              <button
                type="button"
                onClick={() => onSelectTab("orders")}
                className="text-sm font-medium text-[#1762B9] hover:text-[#4a8fd9] transition-colors"
              >
                View all →
              </button>
            )}
          </div>

          {!hasOrders ? (
            <div className="rounded-xl border border-neutral-700 bg-neutral-800/30 p-8 text-center">
              <ShoppingBag className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-neutral-400">No orders yet</p>
              <p className="text-xs text-neutral-500 mt-1">
                Orders will appear here when customers checkout on the store.
              </p>
              <a
                href="/merch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#1762B9] hover:underline"
              >
                Open store <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="rounded-xl border border-neutral-700 bg-neutral-800/30 p-6 text-center text-sm text-neutral-500">
              No recent orders to show.
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-700 bg-neutral-800/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-700 bg-neutral-800/50">
                      <th className="text-left py-3 px-4 font-medium text-neutral-400">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-400">Date</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-400">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-neutral-700/50 last:border-0 hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium text-white">{order.customer.name}</p>
                          <p className="text-xs text-neutral-500 truncate max-w-[180px]">
                            {order.customer.email}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-neutral-400">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-white">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Empty state when no products */}
        {!hasProducts && (
          <section>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <Package className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-200">No products yet</p>
                  <p className="text-sm text-amber-200/80 mt-0.5">
                    Add products in the Products tab so they appear on your merch store.
                  </p>
                </div>
              </div>
              {onSelectTab && (
                <button
                  type="button"
                  onClick={() => onSelectTab("products")}
                  className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-amber-500/20 border border-amber-500/40 px-4 py-2 text-sm font-medium text-amber-200 hover:bg-amber-500/30 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add product
                </button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
