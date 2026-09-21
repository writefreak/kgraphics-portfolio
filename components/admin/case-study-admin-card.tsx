import Link from "next/link";
import { cn } from "@/lib/utils";

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

export function CaseStudyAdminCard({
  study,
  className,
  description,
  showExcerpt = true,
}: CaseStudyCardProps) {
  // Fall back to description prop if study.excerpt is null/undefined
  const contentExcerpt = study?.excerpt || description;

  return (
    <Link
      href={`/case-study/${study.slug}`}
      className={cn(
        "group flex flex-col w-full shadow-xs border bg-white border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
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
        <h2 className="font-display text-base font-bold text-ink leading-snug transition-colors group-hover:text-accent line-clamp-1 truncate">
          {study.title}
        </h2>

        {showExcerpt && (
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {contentExcerpt ? contentExcerpt : "No excerpt provided."}
          </p>
        )}
      </div>
    </Link>
  );
}

export default CaseStudyAdminCard;
