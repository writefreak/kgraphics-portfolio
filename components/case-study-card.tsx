"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

type CaseStudySummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  isFeatured: boolean;
  createdAt: Date;
};

export function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudySummary;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/case-study/${study.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mist">
          {study.coverImageUrl ? (
            <img
              src={study.coverImageUrl}
              alt={study.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink/20">
              <ImageOff size={24} />
            </div>
          )}
          {study.isFeatured && (
            <span className="absolute top-3 left-3 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-ink group-hover:text-ink/70 transition-colors">
          {study.title}
        </h3>
        {study.excerpt && (
          <p className="mt-1.5 text-sm text-ink/60 line-clamp-2">
            {study.excerpt}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
