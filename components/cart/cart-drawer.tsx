"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCart } from "./cart-context";

export function CartDrawer() {
  const ctx = useCart();
  if (!ctx) return null;

  const {
    cart,
    isCartOpen,
    closeCart,
    openCheckout,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  } = ctx;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl overflow-y-auto flex flex-col"
          >
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Shopping Cart</h2>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 min-h-0 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-neutral-600 text-center py-6 sm:py-8 text-sm sm:text-base">
                  Your cart is empty
                </p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 sm:gap-4 bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-neutral-200 rounded-lg flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1.5 sm:p-2"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      </Button>
                    </div>
                  ))}

                  <div className="border-t border-neutral-200 pt-3 sm:pt-4 mt-3 sm:mt-4 shrink-0">
                    <div className="flex justify-between text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4">
                      <span>Total:</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <Button
                      style={{ backgroundColor: "#1762B9" }}
                      className="w-full text-white hover:opacity-90 rounded-full"
                      onClick={() => {
                        closeCart();
                        openCheckout();
                      }}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
