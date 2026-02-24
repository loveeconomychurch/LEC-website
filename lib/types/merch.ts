export interface MerchProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  /** Sort order (lower = first). */
  order: number;
  /** If false, product is hidden from the store. */
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MerchOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface MerchOrder {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: MerchOrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export type MerchProductInput = Omit<MerchProduct, "id" | "createdAt" | "updatedAt">;
