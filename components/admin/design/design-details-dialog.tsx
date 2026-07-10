"use client";

import { Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Design } from "@/lib/types";

interface DesignDetailsDialogProps {
  design: Design | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DesignDetailsDialog({
  design,
  open,
  onOpenChange,
}: DesignDetailsDialogProps) {
  if (!design) return null;

  return (
    <div className="px-4">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex md:max-h-[85vh] max-w-lg flex-col overflow-hidden rounded-2xl p-0"
        >
          <div className="flex-1 overflow-y-auto">
            <div className="relative w-full bg-black/5">
              <img
                src={design.imageUrl}
                alt={design.imageAlt}
                className="max-h-[55vh] w-full object-contain"
              />
            </div>

            <div className="space-y-3 p-5">
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="font-display text-lg font-bold text-ink">
                  {design.title}
                </DialogTitle>
                <p className="text-sm text-ink/60">{design.category}</p>
              </DialogHeader>

              {design.caption && (
                <p className="text-sm leading-relaxed text-ink/70">
                  {design.caption}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-ink/50">
                {design.featured && (
                  <span className="flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-400/20 px-2.5 py-1 text-[11px] font-medium text-amber-500 backdrop-blur-md">
                    <Star size={12} className="fill-current" />
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
