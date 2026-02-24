"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageById, type AdminPageId } from "@/lib/admin-pages";

export function AdminPageSectionsClient({ pageId }: { pageId: AdminPageId }) {
  const page = getPageById(pageId);
  if (!page) {
    return <p className="text-red-400">Page not found.</p>;
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-2">{page.label}</h1>
      <p className="text-neutral-400 mb-8">
        Edit a section below. Changes are saved to Firebase.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {page.sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.id} href={`/admin/content/${section.id}`}>
              <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-800">
                    <Icon className="h-5 w-5 text-neutral-300" />
                  </div>
                  <CardTitle className="text-lg">{section.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-500">
                    Edit {section.label.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
