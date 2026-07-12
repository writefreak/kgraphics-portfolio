"use client";

import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Trash2, Loader2, Download } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import type { BrandStory } from "@/lib/types";
import {
  deleteBrandStory,
  uploadBrandStory,
} from "@/app/(admin)/brand-story/actions";

interface BrandStoryClientProps {
  initialBrandStory: BrandStory | null;
}

export function BrandStoryClient({ initialBrandStory }: BrandStoryClientProps) {
  const [brandStory, setBrandStory] = useState(initialBrandStory);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("File must be a PDF.");
      e.target.value = "";
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      try {
        await uploadBrandStory(formData);
        setBrandStory({
          id: crypto.randomUUID(),
          fileName: file.name,
          fileUrl: "",
          fileSize: file.size,
          uploadedAt: new Date(),
        });
        window.location.reload();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Delete the current brand story PDF? This can't be undone."))
      return;

    startTransition(async () => {
      try {
        await deleteBrandStory();
        setBrandStory(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed.");
      }
    });
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger()}
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          Brand Story
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-3 text-sm text-ink/65">
          Upload the PDF that tells K-Graphics&apos; story. Uploading a new file
          replaces the current one.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          {brandStory ? (
            <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-mist/40 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-paper">
                <FileText size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {brandStory.fileName}
                </p>
                <p className="mt-0.5 text-xs text-ink/55">
                  {formatSize(brandStory.fileSize)} · Uploaded{" "}
                  {new Date(brandStory.uploadedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={brandStory.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View PDF"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  aria-label="Delete PDF"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-red-500 hover:text-red-500 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-ink/20 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-ink/40">
                <FileText size={20} />
              </div>
              <p className="mt-4 text-sm text-ink/55">
                No brand story PDF uploaded yet.
              </p>
            </div>
          )}

          {error && (
            <p className="mt-3 text-xs font-medium text-red-500">{error}</p>
          )}

          <label className="group mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent">
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload
                size={16}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            )}
            {brandStory ? "Replace PDF" : "Upload PDF"}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={isPending}
              className="hidden"
            />
          </label>
        </motion.div>
      </motion.div>
    </div>
  );
}
