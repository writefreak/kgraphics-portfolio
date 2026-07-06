// components/admin/admin-header.tsx
"use client";

import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

function getGreeting(hour: number) {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export function AdminHeader() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const greeting = now ? getGreeting(now.getHours()) : "";
  const dateStr = now
    ? now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";
  const timeStr = now
    ? now.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <header className="sticky p-4 top-0 z-20 flex shrink-0 justify-between items-center gap-2 border-b border-line bg-paper px-4">
      {/* <Separator orientation="vertical" className="h-4" /> */}
      <span className="text-sm font-medium text-ink/70">
        {greeting ? (
          <div className="">
            <div className="flex flex-col gap-3">
              <span className="font-bold font-display text-ink text-xl md:text-3xl">
                Hello Welcome👋
              </span>
              {/* <span>{greeting}</span> */}
            </div>

            <div className="md:text-sm text-xs">
              {dateStr}
              <span className="text-ink/40"> · </span>
              {timeStr}
            </div>
          </div>
        ) : (
          "K-Graphics Admin"
        )}
      </span>
      <SidebarTrigger className="md:hidden" />
    </header>
  );
}
