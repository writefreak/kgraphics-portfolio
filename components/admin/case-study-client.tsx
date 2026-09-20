"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Star,
  Loader2,
  Check,
  Pencil,
  Trash2,
  ImageOff,
} from "lucide-react";
import { deleteCaseStudy } from "@/app/(admin)/case-studies/actions";

type CaseStudyRow = {
  id: string;
  title: string;
  slug: string;
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

  function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 font-sans text-ink min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ink/10 mb-6">
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
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden rounded-lg border border-ink/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink/5 text-left text-xs font-semibold text-ink/50">
                  <th className="px-4 py-3 w-16">Cover</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-ink/10 hover:bg-ink/2 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {row.cover_image_url ? (
                        <img
                          src={row.cover_image_url}
                          alt=""
                          className="w-12 h-8 object-cover rounded-md border border-ink/10"
                        />
                      ) : (
                        <div className="w-12 h-8 rounded-md border border-dashed border-ink/15 flex items-center justify-center text-ink/20">
                          <ImageOff size={14} />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{row.title}</p>
                      <p className="text-xs text-ink/40">/{row.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          row.published
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-ink/5 text-ink/50"
                        }`}
                      >
                        {row.published && <Check size={11} />}
                        {row.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {row.is_featured && (
                        <Star size={14} className="fill-ink text-ink" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink/60 text-xs">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/case-studies/${row.id}`}
                          className="p-1.5 rounded-md text-ink/50 hover:text-ink hover:bg-ink/5 transition-all"
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
                          className={`p-1.5 rounded-md transition-all ${
                            confirmId === row.id
                              ? "bg-red-500 text-white"
                              : "text-ink/50 hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          {deletingId === row.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {rows.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-ink/10 bg-white p-3 flex gap-3"
              >
                {row.cover_image_url ? (
                  <img
                    src={row.cover_image_url}
                    alt=""
                    className="w-20 h-20 object-cover rounded-xl border border-ink/10 shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl border border-dashed border-ink/15 flex items-center justify-center text-ink/20 shrink-0">
                    <ImageOff size={18} />
                  </div>
                )}

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm text-ink truncate">
                        {row.title}
                      </p>
                      {row.is_featured && (
                        <Star
                          size={13}
                          className="fill-ink text-ink shrink-0 mt-0.5"
                        />
                      )}
                    </div>
                    <p className="text-xs text-ink/40 truncate">/{row.slug}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        row.published
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-ink/5 text-ink/50"
                      }`}
                    >
                      {row.published && <Check size={10} />}
                      {row.published ? "Published" : "Draft"}
                    </span>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/case-studies/${row.id}`}
                        className="p-1.5 rounded-md text-ink/50 hover:text-ink hover:bg-ink/5 transition-all"
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
                        className={`p-1.5 rounded-md transition-all ${
                          confirmId === row.id
                            ? "bg-red-500 text-white"
                            : "text-ink/50 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        {deletingId === row.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
