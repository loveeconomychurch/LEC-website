"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/components/admin/auth-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, ArrowLeft } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) {
      router.replace("/admin/login");
      return;
    }
  }, [user, loading, isLoginPage, router]);

  // When on any admin route (except login), make the site non-scrollable
  useEffect(() => {
    if (isLoginPage) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [pathname, isLoginPage]);

  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col overflow-hidden overscroll-none">
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-semibold text-lg flex items-center gap-2 hover:text-neutral-300"
          >
            <LayoutDashboard className="h-5 w-5" />
            CMS Admin
          </Link>
          <Link
            href="/"
            className="text-sm text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            View site
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">{user?.email}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-400 hover:text-white"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sign out
          </Button>
        </div>
      </header>
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-none p-0">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
