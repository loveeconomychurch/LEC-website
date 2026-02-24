"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type { MerchProduct, MerchOrder, MerchOrderItem } from "./types/merch";

const PRODUCTS_COLLECTION = "merch_products";
const ORDERS_COLLECTION = "merch_orders";
const CONFIG_DOC = "merch_config/categories";
const DEFAULT_CATEGORIES = ["Apparel", "Accessories", "Books"];

function productFromDoc(id: string, data: DocumentData): MerchProduct {
  return {
    id,
    name: data.name ?? "",
    price: typeof data.price === "number" ? data.price : 0,
    image: data.image ?? "",
    category: data.category ?? "",
    description: data.description ?? "",
    order: typeof data.order === "number" ? data.order : 0,
    active: data.active !== false,
    createdAt: data.createdAt ?? "",
    updatedAt: data.updatedAt ?? "",
  };
}

function orderFromDoc(id: string, data: DocumentData): MerchOrder {
  return {
    id,
    customer: {
      name: data.customer?.name ?? "",
      email: data.customer?.email ?? "",
      phone: data.customer?.phone ?? "",
      address: data.customer?.address ?? "",
    },
    items: Array.isArray(data.items) ? data.items : [],
    total: typeof data.total === "number" ? data.total : 0,
    status: ["pending", "confirmed", "shipped", "cancelled"].includes(data.status) ? data.status : "pending",
    createdAt: data.createdAt ?? "",
    updatedAt: data.updatedAt ?? "",
  };
}

/** Fetch all products, ordered by order then name. */
export async function getMerchProducts(): Promise<MerchProduct[]> {
  const ref = collection(db, PRODUCTS_COLLECTION);
  const q = query(ref, orderBy("order", "asc"));
  const snap = await getDocs(q);
  const products = snap.docs.map((d) => productFromDoc(d.id, d.data()));
  products.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  return products;
}

/** Fetch only active products for the storefront. */
export async function getActiveMerchProducts(): Promise<MerchProduct[]> {
  const products = await getMerchProducts();
  return products.filter((p) => p.active);
}

/** Get a single product by id. */
export async function getMerchProduct(id: string): Promise<MerchProduct | null> {
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return productFromDoc(snap.id, snap.data());
}

/** Get products by ids, in the order of the ids array. Missing ids are skipped. */
export async function getMerchProductsByIds(ids: string[]): Promise<MerchProduct[]> {
  if (!ids.length) return [];
  const results = await Promise.all(ids.map((id) => getMerchProduct(id)));
  return results.filter((p): p is MerchProduct => p !== null);
}

/** Create a product. Returns the new product with id. */
export async function createMerchProduct(input: {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  order?: number;
  active?: boolean;
}): Promise<MerchProduct> {
  const ref = collection(db, PRODUCTS_COLLECTION);
  const now = new Date().toISOString();
  const data = {
    name: input.name,
    price: input.price,
    image: input.image ?? "",
    category: input.category ?? "",
    description: input.description ?? "",
    order: typeof input.order === "number" ? input.order : 0,
    active: input.active !== false,
    createdAt: now,
    updatedAt: now,
  };
  const docRef = await addDoc(ref, data);
  return productFromDoc(docRef.id, { ...data, createdAt: data.createdAt, updatedAt: data.updatedAt });
}

/** Update a product. */
export async function updateMerchProduct(
  id: string,
  input: Partial<{
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    order: number;
    active: boolean;
  }>
): Promise<void> {
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  const updates: DocumentData = { ...input, updatedAt: new Date().toISOString() };
  await updateDoc(ref, updates);
}

/** Delete a product. */
export async function deleteMerchProduct(id: string): Promise<void> {
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(ref);
}

/** Fetch all orders, newest first. */
export async function getMerchOrders(): Promise<MerchOrder[]> {
  const ref = collection(db, ORDERS_COLLECTION);
  const snap = await getDocs(ref);
  const orders = snap.docs.map((d) => orderFromDoc(d.id, d.data()));
  orders.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  return orders;
}

/** Get a single order. */
export async function getMerchOrder(id: string): Promise<MerchOrder | null> {
  const ref = doc(db, ORDERS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return orderFromDoc(snap.id, snap.data());
}

/** Create an order (e.g. from checkout). Returns order id. */
export async function createMerchOrder(input: {
  customer: { name: string; email: string; phone: string; address: string };
  items: MerchOrderItem[];
  total: number;
}): Promise<string> {
  const ref = collection(db, ORDERS_COLLECTION);
  const now = new Date().toISOString();
  const data = {
    customer: input.customer,
    items: input.items,
    total: input.total,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  const docRef = await addDoc(ref, data);
  return docRef.id;
}

/** Update order status (admin). */
export async function updateMerchOrderStatus(
  id: string,
  status: MerchOrder["status"]
): Promise<void> {
  const ref = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(ref, { status, updatedAt: new Date().toISOString() });
}

/** Get category list for the store (dropdown, filter). Returns from DB or default. */
export async function getMerchCategories(): Promise<string[]> {
  try {
    const ref = doc(db, "merch_config", "categories");
    const snap = await getDoc(ref);
    if (snap.exists() && Array.isArray(snap.data().categories)) {
      const list = snap.data().categories as string[];
      return list.filter((s) => typeof s === "string" && s.trim().length > 0);
    }
  } catch (e) {
    console.warn("[merch] getMerchCategories error:", e);
  }
  return [...DEFAULT_CATEGORIES];
}

/** Set category list (admin). */
export async function setMerchCategories(categories: string[]): Promise<void> {
  const ref = doc(db, "merch_config", "categories");
  const list = categories.map((s) => s.trim()).filter(Boolean);
  await setDoc(ref, { categories: list, updatedAt: new Date().toISOString() }, { merge: true });
}
