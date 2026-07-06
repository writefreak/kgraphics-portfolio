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
        </div>
      </div>
    </article>
  );
};

export default WorkCard;
