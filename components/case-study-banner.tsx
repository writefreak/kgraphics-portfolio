"use client";

import React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar } from "lucide-react";

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  createdAt: Date;
}

interface CaseStudyHeroBannerProps {
  caseStudies: CaseStudy[];
}

export function CaseStudyHeroBanner({ caseStudies }: CaseStudyHeroBannerProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {caseStudies.map((study) => (
            <CarouselItem
              key={study.id}
              className="relative flex h-[430px] md:h-[550px] items-center overflow-hidden"
            >
              {/* Background Cover Image */}
              {study.coverImageUrl && (
                <img
                  src={study.coverImageUrl}
                  alt={study.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Overlay Content */}
              {/* <div className="relative z-20 flex flex-col justify-end h-full w-full p-6 md:p-14 pb-12 md:pb-16 max-w-4xl gap-4"> */}
              {/* <h1 className="font-display text-2xl md:text-5xl font-extrabold text-white leading-tight line-clamp-2 truncate">
                  {study.title}
                </h1>

                {study.excerpt && (
                  <p className="text-xs md:text-base text-neutral-300 line-clamp-2 max-w-2xl font-normal leading-relaxed">
                    {study.excerpt}
                  </p>
                )} */}

              {/* <div className="pt-2">
                  <button className="flex md:w-52 w-48 md:items-center md:justify-center border bg-white/10 backdrop-blur-md border-white/40 text-white font-medium px-8 py-4 rounded-2xl hover:border-blue hover:text-blue transition-colors duration-200 text-sm">
                    <Link
                      href={`/case-study/${study.slug}`}
                      className="flex items-center gap-1"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </button>
                </div> */}
              {/* </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation Controls */}
        {/* <div className="hidden md:block">
          <CarouselPrevious className="left-6 z-30 border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-white/20 hover:text-white" />
          <CarouselNext className="right-6 z-30 border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-white/20 hover:text-white" />
        </div> */}
      </Carousel>
    </div>
  );
}

export default CaseStudyHeroBanner;
