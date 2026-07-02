"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { ThemeSwitch } from "./ui/theme-switch";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

const links = [
  { desc: "Home" },
  { desc: "About" },
  { desc: "Services" },
  { desc: "Reviews" },
  { desc: "Portfolio" },
];

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    const phone = "2349030260393";
    const message =
      "Hi K-Graphics, I have a project in mind and I would like to bring it to life with your help.";
    const encoded = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phone}?text=${encoded}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 px-4 pt-5 md:px-14 md:pt-7 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Desktop pill nav */}
      <div className="hidden md:flex border border-gray-200 dark:border dark:border-white/10 not-dark:bg-white/80 dark:bg-white/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl backdrop-blur-md shadow-md md:w-[800px] p-1 px-2 rounded-2xl items-center justify-between">
        <Link href="/" className="h-12 w-12 pb-1">
          <img
            src="/kemilogo.png"
            alt=""
            className="object-cover h-full w-full dark:hidden"
          />
          <img
            src="/kgraphicslite.png"
            alt=""
            className="object-cover h-full w-full hidden dark:block"
          />
        </Link>
        <div className="flex gap-10">
          {links.map((l, index) => (
            <div key={index} className="group relative">
              <a
                href={`#${l.desc.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(l.desc);
                }}
                className="font-montserrat text-sm text-neutral-800 dark:text-white/70 dark:hover:text-white relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[#030142] dark:after:bg-white/60 after:scale-x-0 after:opacity-0 group-hover:after:opacity-100 group-hover:after:scale-x-100 after:transition-all after:duration-300 cursor-pointer transition-colors duration-200"
              >
                {l.desc}
              </a>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleClick}
            className="rounded-2xl py-3 px-4 text-white text-sm bg-[#030142] hover:bg-[#030142] hover:-translate-y-1 hover:text-white transition-all duration-500 dark:text-white/80 dark:border-0 dark:bg-[#498cff] dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/60"
          >
            Let's Connect
          </button>
        </div>
      </div>

      {/* Mobile bar */}
      <div className="flex md:hidden w-full items-center justify-between border border-gray-200 dark:border dark:border-white/10 not-dark:bg-white/80 dark:bg-white/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl backdrop-blur-md shadow-md p-2 pl-3 rounded-full">
        <Link href="/" className="h-10 w-10">
          <img
            src="/kemilogo.png"
            alt=""
            className="object-cover h-full w-full dark:hidden"
          />
          <img
            src="/kgraphicslite.png"
            alt=""
            className="object-cover h-full w-full hidden dark:block"
          />
        </Link>

        <div className="flex items-center gap-2">
          {/* <ThemeSwitch /> */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="h-10 w-10 flex items-center justify-center rounded-full text-[#030142] dark:border-white/20 dark:text-white/80 transition-colors duration-200"
              >
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-screen h-screen max-w-none sm:max-w-none bg-white dark:bg-[#030142] border-none p-0 flex flex-col"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
                {links.map((l, index) => (
                  <SheetClose asChild key={index}>
                    <a
                      href={`#${l.desc.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileOpen(false);
                        scrollToSection(l.desc);
                      }}
                      className="font-montserrat text-2xl font-medium text-neutral-800 dark:text-white/80 hover:text-[#030142] dark:hover:text-white cursor-pointer transition-colors duration-200"
                    >
                      {l.desc}
                    </a>
                  </SheetClose>
                ))}

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleClick();
                  }}
                  className={`bg-transparent rounded-2xl text-[#030142] border-2 hover:bg-[#030142] mt-4 px-8 py-5 text-base`}
                >
                  Let's Connect
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
