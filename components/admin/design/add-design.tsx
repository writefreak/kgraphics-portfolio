// components/admin/designs/add-design-dialog.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Upload, X, ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Design } from "@/lib/types";
import { createDesign } from "@/app/(admin)/designs/actions";

interface AddDesignDialogProps {
  onAdd: (design: Design) => void;
  existingCategories: string[];
}

export function AddDesignDialog({
  onAdd,
  existingCategories,
}: AddDesignDialogProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [clientName, setClientName] = useState("");
  const [behanceUrl, setBehanceUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setAddingCustom(false);
    setImageFile(null);
    setImagePreview(null);
    setDesc("");
    setClientName("");
    setBehanceUrl("");
    setDragActive(false);
    setError(null);
  };

  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => {
        setMounted(false);
        reset();
      }, 250);
      return () => clearTimeout(timeout);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!showSuccess) return;
    const timeout = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timeout);
  }, [showSuccess]);

  const handleFileSelect = (file: File | null) => {
    if (file && !file.type.startsWith("image/")) return;
    setImageFile(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files?.[0] ?? null);
  };

  const finalCategory = addingCustom ? customCategory.trim() : category.trim();
  const canSubmit = title.trim() && imageFile && finalCategory && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit || !imageFile) return;

    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", title.trim());
      formData.append("category", finalCategory);
      formData.append("caption", desc.trim());
      formData.append("clientName", clientName.trim());
      formData.append("behanceUrl", behanceUrl.trim());

      const design = await createDesign(formData);
      onAdd(design);
      close();
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Couldn't add that design. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex justify-center md:justify-start items-center gap-2 rounded-2xl bg-ink px-5 md:px-6 py-3 text-xs md:text-sm font-semibold text-paper transition-colors hover:bg-accent"
      >
        <Plus size={16} />
        Add Design
      </button>

      {showSuccess && (
        <div className="fixed top-5 right-5 z-[60] flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-paper shadow-lg animate-in fade-in slide-in-from-top-2">
          <Check size={16} className="text-emerald-400" />
          Design added successfully
        </div>
      )}

      {mounted && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            onClick={close}
            className={cn(
              "absolute inset-0 bg-black/50 transition-opacity duration-250",
              open ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-design-title"
            className={cn(
              "absolute inset-y-0 right-0 flex h-full w-full flex-col bg-paper shadow-2xl",
              "sm:max-w-xl lg:max-w-3xl",
              "transition-transform duration-250 ease-out",
              open ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div>
                <h2
                  id="add-design-title"
                  className="font-display text-xl font-bold text-ink"
                >
                  Add a design
                </h2>
                <p className="mt-1 text-sm text-ink/60">
                  Add a new piece to your portfolio. You can edit or feature it
                  later.
                </p>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-mist hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {error && (
                <div className="mb-6 rounded-card bg-red-50 border border-red-200 px-4 py-2 text-xs md:text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                {/* Image upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-ink">Image</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] ?? null)
                    }
                  />

                  {imagePreview ? (
                    <div className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-line shadow-sm">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/50 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
                          aria-label="Replace image"
                        >
                          <Upload size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFileSelect(null)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-red-500 hover:text-white"
                          aria-label="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleDrop}
                      className={cn(
                        "flex aspect-4/5 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors",
                        dragActive
                          ? "border-ink bg-ink/5"
                          : "border-line text-ink/40 hover:border-ink/30 hover:bg-mist/50",
                      )}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist">
                        <ImageIcon size={20} className="text-ink/40" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-ink/70">
                          Click or drag to upload
                        </p>
                        <p className="mt-0.5 text-xs text-ink/40">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </button>
                  )}
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-ink">
                      Title
                    </label>
                    <Input
                      placeholder="e.g. Global Innovation Hub Brand Identity"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-ink">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {existingCategories.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCategory(c);
                            setAddingCustom(false);
                          }}
                          className={cn(
                            "rounded-full border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm",
                            !addingCustom && category === c
                              ? "border-ink bg-ink text-paper"
                              : "border-line text-ink/60 hover:border-ink/40 hover:text-ink",
                          )}
                        >
                          {c}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setAddingCustom(true);
                          setCategory("");
                        }}
                        className={cn(
                          "rounded-full border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm",
                          addingCustom
                            ? "border-ink bg-ink text-paper"
                            : "border-dashed border-line text-ink/60 hover:border-ink/40 hover:text-ink",
                        )}
                      >
                        + Custom
                      </button>
                    </div>

                    {addingCustom && (
                      <Input
                        autoFocus
                        placeholder="New category name"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="mt-1 h-11"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-ink">
                        Client name{" "}
                        <span className="text-ink/40">(optional)</span>
                      </label>
                      <Input
                        placeholder="e.g. Acme Inc."
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-ink">
                        Behance URL{" "}
                        <span className="text-ink/40">(optional)</span>
                      </label>
                      <Input
                        type="url"
                        placeholder="https://behance.net/gallery/..."
                        value={behanceUrl}
                        onChange={(e) => setBehanceUrl(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <label className="text-sm font-medium text-ink">
                      Description
                    </label>
                    <textarea
                      placeholder="Optional description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={6}
                      className="flex-1 resize-none border border-ink rounded-2xl p-4"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-2 border-t border-line px-6 py-4">
              <Button variant="ghost" onClick={close} disabled={submitting}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="bg-ink text-paper hover:bg-ink/90"
              >
                {submitting ? "Adding..." : "Add Design"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
