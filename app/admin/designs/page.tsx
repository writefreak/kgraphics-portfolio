// app/(admin)/designs/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Plus, Star, Trash2, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DESIGNS as INITIAL_DESIGNS, type Design } from "@/lib/mock-data";

export default function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>(INITIAL_DESIGNS);
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(INITIAL_DESIGNS.map((d) => d.category))),
    ],
    [],
  );

  const filtered = useMemo(
    () =>
      category === "All"
        ? designs
        : designs.filter((d) => d.category === category),
    [designs, category],
  );

  const removeDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Designs</h1>
          <p className="mt-1 text-sm text-ink/60">
            Manage your portfolio pieces.
          </p>
        </div>
        <Button className="bg-ink text-paper hover:bg-ink/90">
          <Plus size={16} />
          Add Design
        </Button>
      </div>

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
          <Card key={design.id} className="group overflow-hidden p-0">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <img
                src={design.image}
                alt={design.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {design.featured && (
                <Badge className="absolute left-2 top-2 gap-1 bg-ink text-paper">
                  <Star size={10} className="fill-current" />
                  Featured
                </Badge>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={() => removeDesign(design.id)}
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-medium text-ink">
                {design.title}
              </p>
              <p className="text-xs text-ink/50">{design.category}</p>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-ink/40">
            No designs in this category.
          </p>
        )}
      </div>
    </div>
  );
}
