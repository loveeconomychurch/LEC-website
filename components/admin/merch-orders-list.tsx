"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getMerchOrders, updateMerchOrderStatus } from "@/lib/merch";
import type { MerchOrder } from "@/lib/types/merch";
import { ChevronDown, ShoppingBag } from "lucide-react";

const STATUS_OPTIONS: MerchOrder["status"][] = ["pending", "confirmed", "shipped", "cancelled"];

export function MerchOrdersList() {
  const [orders, setOrders] = useState<MerchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const list = await getMerchOrders();
      setOrders(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (orderId: string, status: MerchOrder["status"]) => {
    await updateMerchOrderStatus(orderId, status);
    await load();
  };

  if (loading) {
    return (
      <div className="p-3">
        <p className="text-neutral-500 text-sm">Loading orders…</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-3">
        <p className="text-neutral-500 text-sm">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-3">
      <h3 className="text-sm font-medium text-white">Orders</h3>
      <ul className="space-y-2">
        {orders.map((order) => {
          const isExpanded = expandedId === order.id;
          return (
            <li
              key={order.id}
              className="rounded-lg border border-neutral-700 bg-neutral-800/50 overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-neutral-800"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <ShoppingBag className="h-4 w-4 text-neutral-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{order.customer.name}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(order.createdAt).toLocaleString()} · ${order.total.toFixed(2)}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded capitalize ${
                    order.status === "pending"
                      ? "bg-amber-900/50 text-amber-300"
                      : order.status === "confirmed"
                        ? "bg-blue-900/50 text-blue-300"
                        : order.status === "shipped"
                          ? "bg-green-900/50 text-green-300"
                          : "bg-neutral-700 text-neutral-400"
                  }`}
                >
                  {order.status}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-neutral-500 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {isExpanded && (
                <div className="border-t border-neutral-700 p-3 space-y-3 text-sm">
                  <div>
                    <p className="text-neutral-500 text-xs uppercase mb-1">Customer</p>
                    <p className="text-white">{order.customer.name}</p>
                    <p className="text-neutral-400">{order.customer.email}</p>
                    <p className="text-neutral-400">{order.customer.phone}</p>
                    <p className="text-neutral-400 whitespace-pre-wrap">{order.customer.address}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-xs uppercase mb-1">Items</p>
                    <ul className="space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-neutral-300">
                          {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                    <p className="font-medium text-white mt-1">Total: ${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-xs uppercase mb-2">Status</p>
                    <div className="flex flex-wrap gap-1">
                      {STATUS_OPTIONS.map((status) => (
                        <Button
                          key={status}
                          type="button"
                          size="sm"
                          variant={order.status === status ? "default" : "outline"}
                          className={
                            order.status === status
                              ? "bg-neutral-600 text-white"
                              : "border-neutral-600 text-neutral-400"
                          }
                          onClick={() => handleStatusChange(order.id, status)}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
