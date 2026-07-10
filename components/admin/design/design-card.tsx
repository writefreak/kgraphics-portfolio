// components/admin/designs/design-card.tsx
"use client";

import { Star, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfirmActionButton } from "@/components/ui/confirm-action";
import { Design } from "@/lib/types";

interface DesignCardProps {
  design: Design;
  onToggleFeatured: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export function DesignCard({
  design,
  onToggleFeatured,
  onDelete,
  onEdit,
  onView,
}: DesignCardProps) {
  return (
    <article
      onClick={() => onView(design.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(design.id);
        }
      }}
      className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden rounded-2xl shadow-md outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <img
        src={design.imageUrl}
        alt={design.title}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Top actions: feature toggle + edit, always visible so featured state is discoverable */}
      <div
        className="absolute inset-x-2 top-2 flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmActionButton
          onConfirm={() => onToggleFeatured(design.id)}
          title={
            design.featured ? "Unfeature this design?" : "Feature this design?"
          }
          description={
            design.featured
              ? `"${design.title}" will no longer appear in the featured section.`
              : `"${design.title}" will be highlighted in the featured section.`
          }
          confirmLabel={design.featured ? "Unfeature" : "Feature"}
          icon={
            <Star size={13} className={cn(design.featured && "fill-current")} />
          }
          ariaLabel={design.featured ? "Unfeature design" : "Feature design"}
          className={cn(
            "h-7 gap-1 rounded-full border px-2.5 text-[11px] font-medium",
            "border-white/20 bg-white/10 text-white backdrop-blur-md",
            "hover:bg-white/20",
            design.featured &&
              "bg-amber-400/20 border-amber-300/40 text-amber-200",
          )}
        />
      </div>

      {/* Glassmorphism info + action panel */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 border-t border-white/10 bg-black/40 p-3 backdrop-blur-md sm:p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-white sm:text-sm">
            {design.title}
          </p>
          <p className="truncate text-[11px] text-white/70 sm:text-xs">
            {design.category}
          </p>
        </div>

        <div
          className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit(design.id)}
            aria-label="Edit design"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 sm:h-8 sm:w-8"
          >
            <Pencil size={13} />
          </button>

          <ConfirmActionButton
            onConfirm={() => onDelete(design.id)}
            title="Delete this design?"
            description={`"${design.title}" will be permanently removed. This can't be undone.`}
            confirmLabel="Delete"
            destructive
            icon={<Trash2 size={13} />}
            ariaLabel="Delete design"
            className="h-7 w-7 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-red-500/20 hover:text-red-300 sm:h-8 sm:w-8"
          />
        </div>
      </div>
    </article>
  );
}
