"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getMerchProducts,
  getMerchOrders,
  getMerchCategories,
} from "@/lib/merch";
import { PAGES_TAB_PAGE_IDS, type AdminMainTabId } from "@/lib/admin-pages";
import type { MerchOrder, MerchProduct } from "@/lib/types/merch";
import {
  LayoutDashboard,
  FileText,
  ExternalLink,
  Package,
  ShoppingBag,
  Tag,
  DollarSign,
  Loader2,
  AlertCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react";

interface AdminOverviewDashboardProps {
  onSelectTab?: (tab: AdminMainTabId) => void;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function AdminOverviewDashboard({ onSelectTab }: AdminOverviewDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    productCount: number;
    activeProductCount: number;
    categoryCount: number;
    orderCount: number;
    pendingOrderCount: number;
    totalRevenue: number;
    ordersThisMonth: number;
    revenueThisMonth: number;
  } | null>(null);
  const [recentOrders, setRecentOrders] = useState<MerchOrder[]>([]);
  const [recentProducts, setRecentProducts] = useState<MerchProduct[]>([]);
  const [topProducts, setTopProducts] = useState<{ productId: string; name: string; quantity: number }[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [products, orders, categories] = await Promise.all([
        getMerchProducts(),
        getMerchOrders(),
        getMerchCategories(),
      ]);
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const activeCount = products.filter((p) => p.active).length;
      const pendingCount = orders.filter((o) => o.status === "pending").length;
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      const ordersThisMonth = orders.filter((o) => o.createdAt >= startOfMonth).length;
      const revenueThisMonth = orders
        .filter((o) => o.createdAt >= startOfMonth)
        .reduce((sum, o) => sum + o.total, 0);

      setStats({
        productCount: products.length,
        activeProductCount: activeCount,
        categoryCount: categories.length,
        orderCount: orders.length,
        pendingOrderCount: pendingCount,
        totalRevenue,
        ordersThisMonth,
        revenueThisMonth,
      });
      setRecentOrders(orders.slice(0, 5));

      const byUpdated = [...products].sort(
        (a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
      );
      setRecentProducts(byUpdated.slice(0, 5));

      const soldMap = new Map<string, { name: string; quantity: number }>();
      for (const order of orders) {
        for (const item of order.items) {
          const cur = soldMap.get(item.productId);
          const name = item.name || "Unknown";
          if (cur) {
            cur.quantity += item.quantity;
          } else {
            soldMap.set(item.productId, { name, quantity: item.quantity });
          }
        }
      }
      const top = [...soldMap.entries()]
        .map(([productId, { name, quantity }]) => ({ productId, name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
      setTopProducts(top);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load stats");
      setStats(null);
      setRecentOrders([]);
      setRecentProducts([]);
      setTopProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pageCount = PAGES_TAB_PAGE_IDS.length;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6 sm:p-8 border-b border-neutral-800 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-neutral-400" />
          Admin Overview
        </h1>
        <p className="text-neutral-400 mt-2 text-sm sm:text-base">
          At a glance metrics and quick access to manage your site.
        </p>
      </div>

      {/* Stats */}
      <div className="p-6 sm:p-8">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
          At a glance
        </h2>
        {loading ? (
          <div className="flex items-center gap-3 py-8 text-neutral-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading metrics…</span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-200">Could not load some metrics</p>
              <p className="text-sm text-amber-300/80 mt-1">{error}</p>
              <button
                type="button"
                onClick={load}
                className="mt-2 text-sm font-medium text-amber-300 hover:text-amber-200 underline"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onSelectTab?.("pages")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-left hover:bg-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Pages</span>
                </div>
                <p className="text-2xl font-bold text-white">{pageCount}</p>
                <p className="text-xs text-neutral-500 mt-0.5">CMS pages</p>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("ecommerce")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-left hover:bg-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <Package className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Products</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats?.productCount ?? "—"}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {stats ? `${stats.activeProductCount} active` : "—"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("ecommerce")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-left hover:bg-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <Tag className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Categories</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats?.categoryCount ?? "—"}</p>
                <p className="text-xs text-neutral-500 mt-0.5">Product categories</p>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("ecommerce")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-left hover:bg-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Orders</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats?.orderCount ?? "—"}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {stats ? `${stats.pendingOrderCount} pending` : "—"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("ecommerce")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-left hover:bg-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Revenue</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats != null ? formatCurrency(stats.totalRevenue) : "—"}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">All time</p>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("ecommerce")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-left hover:bg-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">This month</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats != null ? formatCurrency(stats.revenueThisMonth) : "—"}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {stats ? `${stats.ordersThisMonth} orders` : "—"}
                </p>
              </button>
            </div>

            {/* Recent orders */}
            {recentOrders.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                    Recent orders
                  </h2>
                  <button
                    type="button"
                    onClick={() => onSelectTab?.("ecommerce")}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    View all →
                  </button>
                </div>
                <div className="rounded-xl border border-neutral-800 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-900/50">
                        <th className="text-left py-3 px-4 font-medium text-neutral-400">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-400">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-400">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/30"
                        >
                          <td className="py-3 px-4 text-white font-medium">{order.customer.name || order.customer.email || "—"}</td>
                          <td className="py-3 px-4 text-neutral-300">{formatCurrency(order.total)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                                order.status === "pending"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : order.status === "shipped"
                                    ? "bg-green-500/20 text-green-400"
                                    : order.status === "confirmed"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-neutral-600/30 text-neutral-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-neutral-500">{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recent products */}
            {recentProducts.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                    Recent products
                  </h2>
                  <button
                    type="button"
                    onClick={() => onSelectTab?.("ecommerce")}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    Manage products →
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {recentProducts.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3 flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg bg-neutral-800 shrink-0 overflow-hidden">
                        {p.image ? (
                          <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-neutral-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{p.name}</p>
                        <p className="text-xs text-neutral-500">{formatCurrency(p.price)} · {formatDate(p.updatedAt || p.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top selling products */}
            {topProducts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Top selling products
                </h2>
                <div className="rounded-xl border border-neutral-800 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-900/50">
                        <th className="text-left py-3 px-4 font-medium text-neutral-400">Product</th>
                        <th className="text-right py-3 px-4 font-medium text-neutral-400">Units sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map(({ productId, name, quantity }) => (
                        <tr key={productId} className="border-b border-neutral-800/50 last:border-0">
                          <td className="py-3 px-4 text-white font-medium">{name}</td>
                          <td className="py-3 px-4 text-right text-neutral-300">{quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Page analytics – placeholder (no visit data in app) */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Page analytics
              </h2>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 sm:p-5 flex items-start gap-3">
                <BarChart3 className="h-6 w-6 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Most visited pages</p>
                  <p className="text-sm text-neutral-400 mt-1">
                    View traffic and top pages in your Vercel project dashboard (Analytics) or connect Google Analytics for detailed insights.
                  </p>
                  <Link
                    href="https://vercel.com/docs/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Vercel Analytics docs
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-6 sm:px-8 pb-8 pt-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View live site
        </Link>
      </div>
    </div>
  );
}
