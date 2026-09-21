"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Card, { CardItem } from "./ui/work-card";

type ServiceItem = CardItem & {
  subservices?: string[];
};

const SERVICES: ServiceItem[] = [
  {
    id: "brand-strategy-identity",
    name: "Brand Strategy & Identity",
    category: "",
    desc: "We help businesses establish a clear foundation for who they are and how they want to be perceived. Through strategic thinking and intentional visual design, we translate a brand's purpose, positioning and personality into an identity that feels distinctive, credible and consistent. From developing visual direction and logo systems to defining colour, typography and brand guidelines, every element is created to work together and give the brand a recognisable presence that can grow with it.",
    subservices: [
      "Brand strategy",
      "Brand positioning",
      "Visual direction",
      "Logo systems",
      "Colour systems",
      "Typography",
      "Brand guidelines",
      "Identity applications",
    ],
    image: "/IMG2.jpeg",
  },
  {
    id: "product-packaging-design",
    name: "Product Packaging Design",
    category: "",
    desc: "We design packaging that does more than present a product. It helps communicate what the product represents, creates a memorable first impression and gives the brand a stronger presence on the shelf or in the hands of its customers. From the overall visual direction to typography, imagery, information hierarchy and supporting elements, every detail is considered to create packaging that is functional, attractive and connected to the identity of the brand.",
    subservices: [
      "Product packaging concepts",
      "Packaging layouts",
      "Label design",
      "Box and pouch designs",
      "Visual direction",
      "Branded packaging applications",
    ],
    image: "/IMG1.jpeg",
  },
  {
    id: "digital-product-design",
    name: "Digital Product Design",
    category: "",
    desc: "We design digital products by looking beyond the interface to understand the people, problems and goals behind the product. Our approach brings together research, user flows, information architecture, wireframing and interface design to create experiences that are clear, intuitive and purposeful. From early ideas to interactive prototypes, we focus on making digital products easier to understand, navigate and use while ensuring that the final experience is visually aligned with the brand and its objectives.",
    subservices: [
      "Research",
      "User flows",
      "Information architecture",
      "Wireframing",
      "Interface design",
      "Interactive prototypes",
    ],
    image: "/IMG5.jpeg",
  },
  {
    id: "brand-communication-design",
    name: "Brand Communication Design",
    category: "",
    desc: "We turn ideas, messages and campaigns into visual communication that is clear, compelling and aligned with the brand behind it. Whether the goal is to educate, promote, inform or inspire action, we create designs that help the message reach the audience in a way that feels intentional and engaging. Every piece is designed as part of the wider brand, ensuring that communication remains consistent while still being relevant to its purpose and platform.",
    subservices: [
      "Campaign graphics",
      "Marketing materials",
      "Promotional designs",
      "Flyers",
      "Posters",
      "Brochures",
      "Business materials",
      "Presentation slides",
      "Branded communication assets",
    ],
    image: "/IMG4.jpeg",
  },
  {
    id: "social-media-design",
    name: "Social Media Design",
    category: "",
    desc: "We create social media visuals that help brands show up consistently, communicate effectively and remain recognisable in a crowded digital space. From individual promotional posts to educational carousels and complete content series, our designs are developed with the brand, audience and platform in mind. The goal is not simply to create attractive posts, but to build visual communication that supports the brand's message and encourages people to stop, understand and engage.",
    subservices: [
      "Social media graphics",
      "Carousel designs",
      "Promotional content",
      "Educational posts",
      "Campaign visuals",
      "Announcement designs",
      "Branded templates",
      "Content series",
    ],
    image: "/IMG3.jpeg",
  },
  {
    id: "digital-art",
    name: "Custom Digital Art",
    category: "Illustration",
    desc: "We render personal and passion projects with the same care as client work.",
    subservices: [],
    image: "/2.jpg",
  },
];

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  // Lock scroll + close on Escape while the dialog is open
  useEffect(() => {
    if (!activeService) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveService(null);
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeService]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="pb-24 pt-12 md:pt-12 md:pb-28 border-y border-neutral-100"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="max-w-xl"
        >
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold tracking-tight md:w-full text-ink md:text-4xl"
          >
            Explore Our Wide Range <br className="hidden md:block" /> of
            Creative solutions
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 md:text-sm max-w-sm text-xs text-neutral-600"
          >
            {" "}
            We bring strategy and creativity together to create work that is
            purposeful, distinctive and built around your needs.
          </motion.p>
        </motion.div>
      </Container>

      <div
        ref={trackRef}
        className="pt-14 flex gap-4 md:gap-5 overflow-x-auto mx-6 md:mx-14 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {SERVICES.map((service) => (
          <div
            key={service.id}
            role="button"
            tabIndex={0}
            onClick={() => setActiveService(service)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveService(service);
              }
            }}
            className="cursor-pointer"
          >
            <Card item={service} />
          </div>
        ))}
      </div>

      <Container>
        <div className="mt-6 flex items-center gap-3 justify-end">
          <button
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white hover:border hover:border-ink hover:text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white hover:border hover:border-ink hover:text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {activeService && (
          <motion.div
            key="service-dialog-backdrop"
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveService(null)}
          >
            <motion.div
              key="service-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-dialog-title"
              className="relative w-full max-w-md md:max-w-lg max-h-[85vh] md:max-h-[80vh] overflow-y-auto rounded-t-2xl md:rounded-2xl bg-white shadow-2xl"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveService(null)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-white"
              >
                <X size={16} />
              </button>

              <div className="flex max-h-[40vh] md:max-h-[45vh] w-full items-center justify-center overflow-hidden bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeService.image}
                  alt={activeService.name}
                  className="max-h-[40vh] md:max-h-[45vh] w-full object-contain"
                />
              </div>

              <div className="p-5 md:p-6">
                <h3
                  id="service-dialog-title"
                  className="mt-1.5 font-display text-xl font-bold tracking-tight text-ink md:text-2xl"
                >
                  {activeService.name}
                </h3>

                {activeService.subservices &&
                  activeService.subservices.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {activeService.subservices.map((sub, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded-full bg-ink/30 text-ink border border-neutral-200/80 px-2.5 py-1 text-[11px] font-medium text-neutral-700 tracking-wide"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {activeService.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
