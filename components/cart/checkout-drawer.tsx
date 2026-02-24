"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, X } from "lucide-react";
import { createMerchOrder } from "@/lib/merch";
import { useCart } from "./cart-context";

export function CheckoutDrawer() {
  const ctx = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!ctx) return null;

  const {
    cart,
    isCheckoutOpen,
    closeCheckout,
    getCartTotal,
    clearCart,
  } = ctx;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);
    try {
      await createMerchOrder({
        customer: form,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: getCartTotal(),
      });
      clearCart();
      setForm({ name: "", email: "", phone: "", address: "" });
      closeCheckout();
      alert("Thank you for your order! We'll contact you soon.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[102]"
            onClick={closeCheckout}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 z-[103] shadow-2xl overflow-y-auto flex flex-col"
          >
            <div className="p-4 sm:p-6 border-b border-neutral-700 flex items-center justify-between shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Checkout</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCheckout}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4 flex-1 min-h-0 overflow-y-auto"
            >
              <div>
                <label htmlFor="checkout-name" className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <Input
                  id="checkout-name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-neutral-800 border-neutral-600 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="checkout-email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <Input
                  id="checkout-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-neutral-800 border-neutral-600 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-sm font-semibold text-white mb-2">
                  Phone
                </label>
                <Input
                  id="checkout-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-neutral-800 border-neutral-600 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-sm font-semibold text-white mb-2">
                  Shipping Address
                </label>
                <Textarea
                  id="checkout-address"
                  placeholder="Enter your shipping address"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full min-h-[100px] bg-neutral-800 border-neutral-600 text-white"
                  required
                />
              </div>

              <div className="border-t border-neutral-700 pt-4">
                <div className="flex justify-between text-base sm:text-lg font-semibold text-white mb-4">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <Button
                  type="submit"
                  disabled={submitting || cart.length === 0}
                  style={{ backgroundColor: "#1762B9" }}
                  className="w-full text-white hover:opacity-90 font-bold py-4 sm:py-6 text-base sm:text-lg rounded-full"
                >
                  {submitting ? "Submitting…" : "Complete Order"}
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
