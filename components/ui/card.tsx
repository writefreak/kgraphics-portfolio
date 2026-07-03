import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./badge";

export interface CardItem {
  id: string;
  name: string;
  category: string;
  image: string;
  desc: string;
}

interface WorkCardProps {
  item: CardItem;
  className?: string;
  onClick?: () => void;
}

const WorkCard = ({ item, className, onClick }: WorkCardProps) => {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative h-80 w-56 shrink-0 snap-start overflow-hidden rounded-2xl shadow-md md:w-68",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <img
        src={item.image}
        alt={item.name}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="bg-black/60 p-6 flex flex-col gap-2 md:gap-3 text-white backdrop-blur-sm">
          <h2 className="font-display text-[17px] line-clamp-1 font-bold text-white leading-snug">
            {item.name}
          </h2>
          <p className="text-xs  text-white/80 line-clamp-2">{item.desc}</p>
          {/* <div className="mb-3 flex items-center justify-between">
            <div className="flex h-7 w-7 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-white/15 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={13} color="white" />
            </div>
          </div> */}
        </div>
      </div>
    </article>
  );
};

export default WorkCard;
