"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Design } from "@/lib/types";
import { AddDesignDialog } from "./add-design";
import { DesignDetailsDialog } from "./design-details-dialog";
import { DesignCard } from "@/components/admin/design/design-card";
import { deleteDesign, toggleFeatured } from "@/app/(admin)/designs/actions";

interface DesignsPageClientProps {
  initialDesigns: Design[];
}

export function DesignsPageClient({ initialDesigns }: DesignsPageClientProps) {
  const [designs, setDesigns] = useState<Design[]>(initialDesigns);
  const [category, setCategory] = useState("All");
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(initialDesigns.map((d) => d.category))),
    ],
    [initialDesigns],
  );

  const filtered = useMemo(
    () =>
      category === "All"
        ? designs
        : designs.filter((d) => d.category === category),
    [designs, category],
  );

  const selectedDesign = useMemo(
    () => designs.find((d) => d.id === selectedDesignId) ?? null,
    [designs, selectedDesignId],
  );

  const handleAdd = (design: Design) => {
    setDesigns((prev) => [design, ...prev]);
  };

  const handleDelete = async (id: string) => {
    const previous = designs;
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    setError(null);

    try {
      await deleteDesign(id);
    } catch {
      setDesigns(previous);
      setError("Couldn't delete that design. Try again.");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const previous = designs;
    const target = designs.find((d) => d.id === id);
    if (!target) return;

    setDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, featured: !d.featured } : d)),
    );
    setError(null);

    try {
      await toggleFeatured(id, !target.featured);
    } catch {
      setDesigns(previous);
      setError("Couldn't update featured status. Try again.");
    }
  };

  const handleEdit = (id: string) => {
    // TODO: wire up an edit dialog once the API for updating a design exists
    console.log("edit", id);
  };

  return (
    <div className="space-y-6 md:pt-10 pt-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display md:text-xl font-bold text-ink">
            Your Designs
          </h1>
          <p className="mt-1 text-xs md:text-sm text-ink/60">
            Manage your portfolio pieces.
          </p>
        </div>
        <AddDesignDialog
          onAdd={handleAdd}
          existingCategories={categories.filter((c) => c !== "All")}
        />
      </div>

      {error && (
        <div className="rounded-card bg-red-50 border border-red-200 px-4 py-2 text-xs md:text-sm text-red-600">
          {error}
        </div>
      )}

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onToggleFeatured={handleToggleFeatured}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={(id) => setSelectedDesignId(id)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-ink/40">
            No designs in this category.
          </p>
        )}
      </div>

      <DesignDetailsDialog
        design={selectedDesign}
        open={selectedDesignId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedDesignId(null);
        }}
      />
    </div>
  );
}
