"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquareText,
  Image as ImageIcon,
  Star,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie } from "recharts";
import type { Review, CategoryCount } from "@/lib/types";
import { updateReviewStatus } from "@/app/(admin)/user-reviews/actions";

const categoryConfig = {
  count: { label: "Designs" },
} satisfies ChartConfig;

interface DashboardClientProps {
  initialReviews: Review[];
  totalDesigns: number;
  featuredCount: number;
  categoryCounts: CategoryCount[];
}

export function DashboardClient({
  initialReviews,
  totalDesigns,
  featuredCount,
  categoryCounts,
}: DashboardClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");
  const avgRating =
    approved.length > 0
      ? (
          approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
        ).toFixed(1)
      : "—";

  const recentActivity = [...reviews]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  async function handleStatusChange(
    id: string,
    status: "approved" | "rejected",
  ) {
    const previous = reviews;
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setPendingIds((prev) => new Set(prev).add(id));

    try {
      await updateReviewStatus(id, status);
    } catch {
      setReviews(previous);
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  const stats = [
    {
      label: "Needs Attention",
      value: pending.length,
      icon: MessageSquareText,
      highlight: pending.length > 0,
    },
    { label: "Avg. Rating", value: avgRating, icon: Star },
    { label: "Total Designs", value: totalDesigns, icon: ImageIcon },
    { label: "Featured Pieces", value: featuredCount, icon: Star },
  ];

  return (
    <div className="space-y-6 ">
      <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={stat.highlight ? "border-amber-300" : ""}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs md:text-sm">
                {stat.label}
              </CardDescription>
              <stat.icon
                className={`h-4 w-4 ${stat.highlight ? "text-amber-500" : "text-ink/40"}`}
              />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-ink">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Needs Your Attention</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {pending.length > 0
                  ? `${pending.length} review${pending.length > 1 ? "s" : ""} waiting on you`
                  : "You're all caught up"}
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link
                href="/user-reviews"
                className="flex items-center gap-1 text-xs md:text-sm"
              >
                View all <ArrowRight size={14} />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.length === 0 && (
              <p className="py-6 text-center text-xs md:text-sm text-ink/40">
                No pending reviews right now.
              </p>
            )}
            {pending.map((review) => (
              <div
                key={review.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-line p-3"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-mist text-xs text-ink">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-ink">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            className={
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-ink/20"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink/60">
                      {review.comment}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    disabled={pendingIds.has(review.id)}
                    onClick={() => handleStatusChange(review.id, "approved")}
                    aria-label="Approve"
                  >
                    <Check size={14} className="text-emerald-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    disabled={pendingIds.has(review.id)}
                    onClick={() => handleStatusChange(review.id, "rejected")}
                    aria-label="Reject"
                  >
                    <X size={14} className="text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work by Category</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              What you&apos;ve been designing most
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={categoryConfig}
              className="mx-auto h-[220px] w-full max-w-[220px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={categoryCounts}
                  dataKey="count"
                  nameKey="category"
                  innerRadius={55}
                  strokeWidth={4}
                />
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {categoryCounts.map((c) => (
                <div
                  key={c.category}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: c.fill }}
                    />
                    <span className="text-ink/70 text-xs md:text-sm">
                      {c.category}
                    </span>
                  </div>
                  <span className="font-medium text-ink text-xs md:text-sm">
                    {c.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Latest reviews as they come in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((review) => (
            <div
              key={review.id}
              className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-mist text-xs text-ink">
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-ink">{review.name}</p>
                  <p className="text-xs text-ink/50">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  review.status === "approved"
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    : review.status === "pending"
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                }
              >
                {review.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
