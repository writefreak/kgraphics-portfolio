"use client";

import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Trash2,
  Loader2,
  Download,
  CalendarDays,
  HardDrive,
  ArrowDownToLine,
} from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import type { BrandStory } from "@/lib/types";
import {
  deleteBrandStory,
  uploadBrandStory,
  incrementBrandStoryDownload,
} from "@/app/(admin)/brand-story/actions";
import { ConfirmActionButton } from "../ui/confirm-action";

interface BrandStoryClientProps {
  initialBrandStories: BrandStory[];
}

export function BrandStoryClient({
  initialBrandStories,
}: BrandStoryClientProps) {
  const [brandStories, setBrandStories] = useState(initialBrandStories);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File | undefined) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("File must be a PDF.");
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      try {
        await uploadBrandStory(formData);
        window.location.reload();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteBrandStory(id);
        setBrandStories((prev) => prev.filter((b) => b.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed.");
      } finally {
        setDeletingId(null);
      }
    });
  };

  const handleDownloadClick = (id: string) => {
    incrementBrandStoryDownload(id);
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger()}
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl"
        >
          Brand Story
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-md text-sm text-ink/65"
        >
          Upload brand story PDFs. The most recently uploaded one is what shows
          on the public site, older ones stay archived here.
        </motion.p>

        {brandStories.length > 0 ? (
          <motion.div variants={fadeUp} className="mt-8 space-y-4 md:mt-10">
            {brandStories.map((story, i) => (
              <div
                key={story.id}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-mist/40"
              >
                <div className="flex flex-col gap-4 border-b border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-paper md:h-12 md:w-12">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink md:text-base">
                        {story.fileName}
                      </p>
                      <p className="mt-0.5 text-xs text-ink/55">
                        {i === 0 ? "Live on public site" : "Archived"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                    <a
                      href={`${story.fileUrl}?download=${encodeURIComponent(story.fileName)}`}
                      aria-label="Download PDF"
                      onClick={() => handleDownloadClick(story.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent"
                    >
                      <Download size={16} />
                    </a>
                    <ConfirmActionButton
                      onConfirm={() => handleDelete(story.id)}
                      title="Delete this PDF?"
                      description="This removes it permanently. This can't be undone."
                      confirmLabel={
                        isPending && deletingId === story.id
                          ? "Deleting…"
                          : "Delete"
                      }
                      destructive
                      ariaLabel="Delete PDF"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-red-500 hover:text-red-500 disabled:opacity-50"
                      icon={
                        isPending && deletingId === story.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-ink/10">
                  <div className="flex flex-col items-center gap-1.5 p-4 text-center md:p-5">
                    <HardDrive size={16} className="text-ink/40" />
                    <p className="text-sm font-semibold text-ink md:text-base">
                      {formatSize(story.fileSize)}
                    </p>
                    <p className="text-[11px] text-ink/50 md:text-xs">Size</p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-4 text-center md:p-5">
                    <CalendarDays size={16} className="text-ink/40" />
                    <p className="text-sm font-semibold text-ink md:text-base">
                      {new Date(story.uploadedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[11px] text-ink/50 md:text-xs">
                      Uploaded
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-4 text-center md:p-5">
                    <ArrowDownToLine size={16} className="text-ink/40" />
                    <p className="text-sm font-semibold text-ink md:text-base">
                      {story.downloadCount}
                    </p>
                    <p className="text-[11px] text-ink/50 md:text-xs">
                      Download{story.downloadCount === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="mt-8 rounded-2xl border border-dashed border-ink/20 p-10 text-center md:mt-10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-ink/40">
              <FileText size={20} />
            </div>
            <p className="mt-4 text-sm text-ink/55">
              No brand story PDFs uploaded yet.
            </p>
          </motion.div>
        )}

        {error && (
          <motion.p
            variants={fadeUp}
            className="mt-3 text-xs font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}

        <motion.label
          variants={fadeUp}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`group mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
            isDragging
              ? "border-accent bg-accent/5"
              : "border-ink/15 hover:border-ink/30 hover:bg-ink/5"
          }`}
        >
          {isPending && !deletingId ? (
            <Loader2 size={22} className="animate-spin text-ink" />
          ) : (
            <Upload
              size={22}
              className="text-ink/50 transition-transform group-hover:-translate-y-0.5"
            />
          )}
          <span className="text-sm font-semibold text-ink">
            {isPending && !deletingId ? "Uploading…" : "Upload New PDF"}
          </span>
          <span className="text-xs text-ink/50">
            Drag and drop, or click to browse
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isPending}
            className="hidden"
          />
        </motion.label>
      </motion.div>
    </div>
  );
}
