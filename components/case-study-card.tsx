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
  description?: string;
  showExcerpt?: boolean;
}

export function CaseStudyCard({
  study,
  className,
  description,
  showExcerpt = true,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className={cn(
        "group flex flex-col w-full shadow-xs border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
        className,
      )}
    >
      {/* Cover Image Box */}
      <div className="relative aspect-16/8 p-2 w-full rounded-2xl overflow-hidden">
        {study.coverImageUrl ? (
          <img
            src={study.coverImageUrl}
            alt={study.title}
            draggable={false}
            className="h-full w-full rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-600">
            No Cover Image
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div className="flex flex-col gap-1 p-4">
        <h2 className="font-display min-w-0 max-w-sm truncate line-clamp-1 text-base sm:text-lg font-bold text-ink leading-snug transition-colors group-hover:text-accent">
          {study.title}
        </h2>

        {showExcerpt && study.excerpt && (
          <p className="text-xs sm:text-[12px] text-neutral-400 line-clamp-2 leading-relaxed">
            {study.excerpt} {description ? `|| ${description}` : ""}
          </p>
        )}
      </div>

      {/* <div className="flex justify-end">
        <div className="rounded-full h-10 w-10 border bg-ink text-white border-gray-100 flex items-center justify-center">
          <ArrowUpRight strokeWidth={1.5} />
        </div>
      </div> */}
    </Link>
  );
}

export default CaseStudyCard;
