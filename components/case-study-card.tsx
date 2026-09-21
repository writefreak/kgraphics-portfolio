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
}

export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className={cn(
        "group flex flex-col w-full overflow-hidden  transition-all duration-300 cursor-pointer",
        className,
      )}
    >
      {/* Cover Image Box */}
      <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden ">
        {study.coverImageUrl ? (
          <img
            src={study.coverImageUrl}
            alt={study.title}
            draggable={false}
            className="h-full w-full rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:rounded-2xl group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-600">
            No Cover Image
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div className="flex flex-col gap-2">
        {/* <span className="text-[11px] font-medium tracking-wide text-neutral-400">
          {new Date(study.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span> */}

        <h2 className="font-display pt-4 text-lg sm:text-xl font-bold text-ink leading-snug transition-colors group-hover:text-accent truncate line-clamp-1">
          {study.title}
        </h2>

        {study.excerpt && (
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {study.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export default CaseStudyCard;
