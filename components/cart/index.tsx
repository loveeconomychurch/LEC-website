"use client";

import { CartProvider } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { CheckoutDrawer } from "./checkout-drawer";

export { CartProvider, CartDrawer, CheckoutDrawer };
export { useCart } from "./cart-context";
export type { CartItem } from "./cart-context";

/** Wraps children with cart provider and renders cart + checkout drawers. */
export function CartWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CheckoutDrawer />
    </CartProvider>
  );
}
