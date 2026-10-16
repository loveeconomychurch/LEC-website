"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  isWebsiteEditor: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isWebsiteEditor, setIsWebsiteEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setLoading(true);
      setUser(u);
      setIsWebsiteEditor(false);

      if (!u) {
        setLoading(false);
        return;
      }

      try {
        const roles = await getDoc(doc(db, "user-roles", u.uid));
        setIsWebsiteEditor(
          roles.exists() && roles.data().websiteEditor === true
        );
      } catch (error) {
        console.error("[admin] Unable to verify administrator access", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const roles = await getDoc(doc(db, "user-roles", credential.user.uid));
    if (!roles.exists() || roles.data().websiteEditor !== true) {
      await firebaseSignOut(auth);
      throw new Error("This account does not have website editor access.");
    }
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isWebsiteEditor, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
