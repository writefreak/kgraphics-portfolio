// components/admin/AdminSidebar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareText,
  Image as ImageIcon,
  LogOut,
  X,
  Loader2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ConfirmActionButton } from "../ui/confirm-action";

const MENU = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "User Reviews",
    url: "/user-reviews",
    icon: MessageSquareText,
  },
  { title: "Designs", url: "/designs", icon: ImageIcon },
];

const SIDEBAR_STYLE = {
  "--sidebar": "var(--ink)",
  "--sidebar-foreground": "var(--paper)",
  "--sidebar-accent": "rgba(255,255,255,0.08)",
  "--sidebar-accent-foreground": "var(--paper)",
  "--sidebar-border": "rgba(255,255,255,0.1)",
} as React.CSSProperties;

function MenuLink({
  item,
  isActive,
  onNavigate,
}: {
  item: (typeof MENU)[number];
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={cn(
          "transition-colors duration-150",
          "hover:bg-white/10 hover:text-paper hover:[&_svg]:text-paper",
          isActive
            ? "bg-white/10 text-paper font-medium [&_svg]:text-paper"
            : "text-paper/60 [&_svg]:text-paper/60",
        )}
      >
        <Link href={item.url} onClick={onNavigate}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function LogoutButton({
  onLogout,
  loading,
}: {
  onLogout: () => void;
  loading: boolean;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <ConfirmActionButton
          onConfirm={onLogout}
          title="Log out?"
          description="You'll need to sign in again to access the admin panel."
          confirmLabel={loading ? "Logging out…" : "Logout"}
          destructive
          ariaLabel="Logout"
          className="w-full h-auto justify-start gap-2 rounded-md px-2 py-2 text-sm font-medium text-red-400/80 hover:!bg-red-500/10 hover:!text-red-400 [&_svg]:text-red-400/80 hover:[&_svg]:text-red-400 transition-colors duration-150 disabled:opacity-60"
          icon={
            <>
              {loading ? <Loader2 className="animate-spin" /> : <LogOut />}
              <span>{loading ? "Logging out…" : "Logout"}</span>
            </>
          }
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AdminSidebar() {
  const { signOut } = useClerk();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut({ redirectUrl: "/login" });
    } catch {
      setLoggingOut(false);
    }
  };
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const closeMobile = () => setOpenMobile(false);

  if (isMobile) {
    return (
      <>
        {/* Backdrop — click to close, never blocks interaction when hidden */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200",
            openMobile
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          onClick={closeMobile}
          aria-hidden="true"
        />

        {/* Sliding panel — capped width, not full screen */}
        <div
          style={SIDEBAR_STYLE}
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[80%] max-w-[280px]",
            "bg-[var(--sidebar)] text-[var(--sidebar-foreground)]",
            "border-r border-[var(--sidebar-border)]",
            "flex flex-col",
            "transition-transform duration-200 ease-out",
            openMobile ? "translate-x-0" : "-translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-10">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2"
              onClick={closeMobile}
            >
              <img
                src="/kemiwhite.png"
                alt="K-Graphics"
                className="h-8 w-8 object-cover rounded-md"
              />
              <span className="font-display text-sm font-bold text-paper">
                K-Graphics Admin
              </span>
            </Link>
            <button
              onClick={closeMobile}
              className="p-1.5 rounded-md text-paper/60 hover:bg-white/10 hover:text-paper transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 px-4 pt-5 overflow-y-auto">
            <p className="text-sm font-bold font-display py-2 text-paper/60">
              Main Menu
            </p>
            <SidebarMenu className="flex flex-col pt-10 md:gap-1 gap-3">
              {MENU.map((item) => (
                <MenuLink
                  key={item.url}
                  item={item}
                  isActive={pathname === item.url}
                  onNavigate={closeMobile}
                />
              ))}
            </SidebarMenu>
          </div>

          <div className="px-4 pb-4">
            <LogoutButton onLogout={handleLogout} loading={loggingOut} />
          </div>
        </div>
      </>
    );
  }

  return (
    <Sidebar collapsible="icon" style={SIDEBAR_STYLE}>
      <SidebarHeader className="px-4 md:px-6 py-12">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img
            src="/kemiwhite.png"
            alt="K-Graphics"
            className="h-8 w-8 object-cover rounded-md"
          />
          <span className="font-display text-sm font-bold text-paper group-data-[collapsible=icon]:hidden">
            K-Graphics Admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 px-4 md:px-6">
        <SidebarGroup className="pt-10">
          <SidebarGroupLabel className="text-sm md:text-base font-bold font-display py-5 text-paper/60">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-5 pt-10">
              {MENU.map((item) => (
                <MenuLink
                  key={item.url}
                  item={item}
                  isActive={pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-4">
        <LogoutButton onLogout={handleLogout} loading={loggingOut} />
      </SidebarFooter>
    </Sidebar>
  );
}
