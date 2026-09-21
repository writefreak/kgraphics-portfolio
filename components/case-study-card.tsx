import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface CaseStudyItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  createdAt: Date;
}

interface CaseStudyCardProps {
  study: CaseStudyItem;
  className?: string;
}

export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className={cn(
        "group flex flex-col w-full shadow-xs border border-gray-100 rounded-2xl overflow-hidden  transition-all duration-300 cursor-pointer",
        className,
      )}
    >
      {/* Cover Image Box */}
      <div className="relative aspect-16/10 w-full rounded-t-2xl overflow-hidden">
        {study.coverImageUrl ? (
          <img
            src={study.coverImageUrl}
            alt={study.title}
            draggable={false}
            className="h-full w-full rounded-t-2xl object-cover transition-transform duration-500 ease-out group-hover:rounded-2xl group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-600">
            No Cover Image
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div className="flex flex-col gap-1 p-4">
        <h2 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug transition-colors group-hover:text-accent truncate line-clamp-1">
          {study.title}
        </h2>

        {study.excerpt && (
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {study.excerpt}
          </p>
        )}

        {/* <div className="flex">
          <button className="group inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent">
            Read More
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div> */}
      </div>
    </Link>
  );
}

export default CaseStudyCard;
