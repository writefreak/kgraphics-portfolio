"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  UploadCloud,
  X,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Star,
  Loader2,
  Check,
} from "lucide-react";
import {
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  uploadCaseStudyImage,
} from "../actions";

type Section = {
  heading: string;
  body: string;
  image_url: string;
};

const emptySection = (): Section => ({ heading: "", body: "", image_url: "" });

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function CaseStudyEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const coverInputRef = useRef<HTMLInputElement>(null);
  const sectionInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    cover_image_url: "",
    sections: [emptySection()],
    published: false,
    is_featured: false,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingSection, setUploadingSection] = useState<number | null>(null);

  useEffect(() => {
    if (!isNew) fetchCaseStudy();
  }, [isNew, id]);

  function autoResize(e: React.FormEvent<HTMLTextAreaElement>) {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  }

  async function fetchCaseStudy() {
    setLoading(true);
    setError(null);
    try {
      const data = await getCaseStudy(id);
      if (!data) {
        setError("Case study not found.");
      } else {
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          cover_image_url: data.coverImageUrl ?? "",
          sections:
            Array.isArray(data.sections) && data.sections.length
              ? (data.sections as Section[]).map((s) => ({
                  heading: s.heading ?? "",
                  body: s.body ?? "",
                  image_url: s.image_url ?? "",
                }))
              : [emptySection()],
          published: data.published ?? false,
          is_featured: data.isFeatured ?? false,
        });
        setSlugTouched(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    }
    setLoading(false);
  }

  function handleTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  }

  async function handleCoverSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, WEBP, or GIF image.");
      return;
    }

    setUploadingCover(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadCaseStudyImage(formData);
      setForm((f) => ({ ...f, cover_image_url: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingCover(false);
    }
  }

  function removeCoverImage() {
    setForm((f) => ({ ...f, cover_image_url: "" }));
    if (coverInputRef.current) coverInputRef.current.value = "";
  }

  async function handleSectionImageSelect(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, WEBP, or GIF image.");
      return;
    }

    setUploadingSection(index);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadCaseStudyImage(formData);
      updateSection(index, "image_url", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingSection(null);
    }
  }

  function updateSection(index: number, field: keyof Section, value: string) {
    setForm((f) => {
      const sections = f.sections.map((s, i) =>
        i === index ? { ...s, [field]: value } : s,
      );
      return { ...f, sections };
    });
  }

  function addSection() {
    setForm((f) => ({ ...f, sections: [...f.sections, emptySection()] }));
  }

  function removeSection(index: number) {
    setForm((f) => ({
      ...f,
      sections: f.sections.filter((_, i) => i !== index),
    }));
  }

  function moveSection(index: number, direction: number) {
    setForm((f) => {
      const next = [...f.sections];
      const target = index + direction;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, sections: next };
    });
  }

  async function handleSubmit() {
    if (!form.title.trim() || !form.slug.trim()) return;
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      coverImageUrl: form.cover_image_url || null,
      sections: form.sections.filter((s) => s.body.trim().length > 0),
      published: form.published,
      isFeatured: form.is_featured,
    };

    try {
      if (isNew) {
        const created = await createCaseStudy(payload);
        setSaving(false);
        router.push(`/case-studies/${created.id}`);
      } else {
        await updateCaseStudy(id, payload);
        setSaving(false);
        router.push("/case-studies");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteCaseStudy(id);
      router.push("/case-studies");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-ink/40 font-sans">
        <Loader2 className="animate-spin w-5 h-5 text-ink/60" />
        <span className="text-xs font-medium">Loading content...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 font-sans text-ink min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-ink/10 mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/case-studies"
            className="p-1.5 -ml-1.5 rounded-lg text-ink/60 hover:text-ink hover:bg-ink/5 transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            Add Case Study
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap md:ml-auto">
          <button
            type="button"
            onClick={() =>
              setForm((f) => ({ ...f, is_featured: !f.is_featured }))
            }
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 border ${
              form.is_featured
                ? "border-ink bg-ink/10 text-ink"
                : "border-ink/15 text-ink/60 hover:text-ink"
            }`}
          >
            <Star size={13} className={form.is_featured ? "fill-ink" : ""} />
            Featured
          </button>

          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 border ${
              form.published
                ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                : "border-ink/15 text-ink/60 hover:text-ink"
            }`}
          >
            <Check size={13} />
            {form.published ? "Published" : "Draft"}
          </button>

          {!isNew && (
            <button
              type="button"
              onClick={() =>
                deleteConfirm ? handleDelete() : setDeleteConfirm(true)
              }
              disabled={deleting}
              className={`p-1.5 rounded-md text-xs transition-all border ${
                deleteConfirm
                  ? "bg-red-500 text-white border-red-500"
                  : "border-ink/15 text-ink/40 hover:text-red-500 hover:border-red-200"
              }`}
            >
              {deleting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !form.title.trim() || !form.slug.trim()}
            className="bg-ink hover:bg-ink/80 disabled:opacity-40 text-white text-xs font-semibold px-3 py-1 rounded-md transition-all flex items-center gap-1"
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-500 flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Cover Image */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink/50">Cover Image</label>
          {form.cover_image_url ? (
            <div className="relative rounded-lg overflow-hidden aspect-21/9 w-full border border-ink/10">
              <img
                src={form.cover_image_url}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-2 right-2 p-1 rounded bg-black/60 hover:bg-black text-white transition-all"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              disabled={uploadingCover}
              className="w-full py-4 rounded-lg border border-dashed border-ink/20 hover:border-ink/40 transition-all flex items-center justify-center gap-2 text-ink/50 text-xs"
            >
              {uploadingCover ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  <UploadCloud size={14} />
                  <span>Upload cover image</span>
                </>
              )}
            </button>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={handleCoverSelect}
            className="hidden"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink/50">Title</label>
          <textarea
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            onInput={autoResize}
            placeholder="Case study title..."
            rows={1}
            className="w-full bg-transparent text-lg sm:text-xl font-display font-semibold text-ink placeholder:text-ink/20 outline-none resize-none overflow-hidden border-b border-ink/10 pb-1 focus:border-ink/30"
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink/50">URL Slug</label>
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm((f) => ({ ...f, slug: e.target.value }));
            }}
            placeholder="case-study-url-slug"
            className="w-full bg-transparent text-xs text-ink/80 outline-none border-b border-ink/10 pb-1 focus:border-ink/30"
          />
        </div>

        {/* Excerpt */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink/50">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm((f) => ({ ...f, excerpt: e.target.value }))
            }
            onInput={autoResize}
            placeholder="Brief excerpt or description..."
            rows={1}
            className="w-full bg-transparent text-xs sm:text-sm text-ink/80 placeholder:text-ink/20 outline-none resize-none overflow-hidden border-b border-ink/10 pb-1 focus:border-ink/30 leading-relaxed"
          />
        </div>

        {/* Body Blocks */}
        <div className="flex flex-col gap-4 pt-2">
          {form.sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-3 rounded-lg border border-ink/10 bg-white/50 focus-within:border-ink/30 transition-all"
            >
              <div className="flex items-center justify-between pb-1">
                <label className="text-xs font-medium text-ink/50">
                  Block {index + 1}
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    className="p-1 text-ink/30 hover:text-ink disabled:opacity-10"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === form.sections.length - 1}
                    className="p-1 text-ink/30 hover:text-ink disabled:opacity-10"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    disabled={form.sections.length === 1}
                    className="p-1 text-ink/30 hover:text-red-500 disabled:opacity-10"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <input
                value={section.heading}
                onChange={(e) =>
                  updateSection(index, "heading", e.target.value)
                }
                placeholder="Section heading (optional)"
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-ink placeholder:text-ink/20 outline-none border-b border-ink/10 pb-1"
              />

              <textarea
                value={section.body}
                onChange={(e) => updateSection(index, "body", e.target.value)}
                onInput={autoResize}
                placeholder="Section body text..."
                rows={2}
                className="w-full bg-transparent text-xs sm:text-sm text-ink/80 placeholder:text-ink/20 outline-none resize-none overflow-hidden leading-relaxed pt-1"
              />

              {section.image_url ? (
                <div className="relative rounded-lg overflow-hidden w-full border border-ink/10">
                  <img
                    src={section.image_url}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => updateSection(index, "image_url", "")}
                    className="absolute top-2 right-2 p-1 rounded bg-black/60 hover:bg-black text-white transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => sectionInputRefs.current[index]?.click()}
                  disabled={uploadingSection === index}
                  className="w-full py-3 rounded-lg border border-dashed border-ink/20 hover:border-ink/40 transition-all flex items-center justify-center gap-2 text-ink/50 text-xs"
                >
                  {uploadingSection === index ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <UploadCloud size={14} />
                      <span>Add screenshot to this block</span>
                    </>
                  )}
                </button>
              )}
              <input
                ref={(el) => {
                  sectionInputRefs.current[index] = el;
                }}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                onChange={(e) => handleSectionImageSelect(index, e)}
                className="hidden"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="w-full py-2.5 border border-dashed border-ink/20 hover:border-ink/40 rounded-lg text-xs font-medium text-ink/60 hover:text-ink flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus size={14} />
            Add Section Block
          </button>
        </div>
      </div>
    </div>
  );
}
