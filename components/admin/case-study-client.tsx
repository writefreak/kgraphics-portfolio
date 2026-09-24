"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Star, Loader2, Check, Pencil, Trash2 } from "lucide-react";
import { deleteCaseStudy } from "@/app/(admin)/case-studies/actions";
import CaseStudyAdminCard from "./case-study-admin-card";

type CaseStudyRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  is_featured: boolean;
  created_at: string;
};

export function CaseStudiesPageClient({
  initialCaseStudies,
}: {
  initialCaseStudies: CaseStudyRow[];
}) {
  const [rows, setRows] = useState<CaseStudyRow[]>(initialCaseStudies);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteCaseStudy(id);
      setRows((r) => r.filter((row) => row.id !== id));
      setConfirmId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
    setDeletingId(null);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 font-sans text-ink min-h-screen">
      <div className="flex flex-wrap mdL items-center justify-between gap-3 pb-4 border-b border-ink/10 mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
          Case Studies
        </h1>
        <Link
          href="/case-studies/new"
          className="bg-ink hover:bg-ink/80 text-white text-xs font-semibold px-3 py-2 rounded-md transition-all flex items-center gap-1.5"
        >
          <Plus size={14} />
          New Case Study
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-500">
          {error}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2 text-ink/40">
          <span className="text-sm font-medium">No case studies yet.</span>
          <Link
            href="/case-studies/new"
            className="text-xs font-semibold text-ink underline underline-offset-2"
          >
            Create your first one
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((row) => (
            <div key={row.id} className="relative group/card">
              {/* Admin Overlay Controls */}
              <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                      row.published
                        ? "bg-emerald-500/90 text-white"
                        : "bg-neutral-900/80 text-white/80"
                    }`}
                  >
                    {row.published && <Check size={11} />}
                    {row.published ? "Published" : "Draft"}
                  </span>

                  {row.is_featured && (
                    <span className="p-1 rounded-full bg-amber-500/90 text-white backdrop-blur-md shadow-xs">
                      <Star size={12} className="fill-white" />
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-xs border border-gray-200/50 pointer-events-auto">
                  <Link
                    href={`/case-studies/${row.id}`}
                    className="p-1.5 rounded-lg text-ink/70 hover:text-ink hover:bg-gray-100 transition-all"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      confirmId === row.id
                        ? handleDelete(row.id)
                        : setConfirmId(row.id)
                    }
                    disabled={deletingId === row.id}
                    className={`p-1.5 rounded-lg transition-all ${
                      confirmId === row.id
                        ? "bg-red-500 text-white"
                        : "text-ink/70 hover:text-red-500 hover:bg-red-50"
                    }`}
                    title={
                      confirmId === row.id
                        ? "Click again to confirm delete"
                        : "Delete"
                    }
                  >
                    {deletingId === row.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Exact Card UI Component */}
              <CaseStudyAdminCard
                showExcerpt={true}
                study={{
                  id: row.id,
                  title: row.title,
                  slug: row.slug,
                  excerpt: row.excerpt,
                  coverImageUrl: row.cover_image_url,
                  createdAt: new Date(row.created_at),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
