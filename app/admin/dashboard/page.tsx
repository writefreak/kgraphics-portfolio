// app/(admin)/dashboard/page.tsx
"use client";

import {
  TrendingUp,
  MessageSquareText,
  Image as ImageIcon,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";
import {
  REVIEWS,
  DESIGNS,
  MONTHLY_ACTIVITY,
  DESIGNS_BY_CATEGORY,
} from "@/lib/mock-data";

const activityConfig = {
  inquiries: { label: "Inquiries", color: "var(--accent)" },
  reviews: { label: "Reviews", color: "var(--ink)" },
} satisfies ChartConfig;

const categoryConfig = {
  count: { label: "Designs" },
  branding: { label: "Branding", color: "var(--ink)" },
  print: { label: "Print & Digital", color: "var(--accent)" },
  social: { label: "Social", color: "#94a3b8" },
} satisfies ChartConfig;

export default function DashboardPage() {
  const pendingReviews = REVIEWS.filter((r) => r.status === "pending").length;
  const avgRating = (
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  ).toFixed(1);

  const stats = [
    { label: "Total Designs", value: DESIGNS.length, icon: ImageIcon },
    { label: "Total Reviews", value: REVIEWS.length, icon: MessageSquareText },
    { label: "Pending Reviews", value: pendingReviews, icon: Star },
    { label: "Avg. Rating", value: avgRating, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">
          Overview of your studio's activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon className="h-4 w-4 text-ink/40" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-ink">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Activity area chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>
              Inquiries and reviews over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={activityConfig}
              className="h-[280px] w-full"
            >
              <AreaChart data={MONTHLY_ACTIVITY}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="inquiries"
                  type="monotone"
                  fill="var(--color-inquiries)"
                  fillOpacity={0.15}
                  stroke="var(--color-inquiries)"
                  strokeWidth={2}
                />
                <Area
                  dataKey="reviews"
                  type="monotone"
                  fill="var(--color-reviews)"
                  fillOpacity={0.1}
                  stroke="var(--color-reviews)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Designs by category donut */}
        <Card>
          <CardHeader>
            <CardTitle>Designs by Category</CardTitle>
            <CardDescription>Distribution across services</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={categoryConfig}
              className="mx-auto h-[280px] w-full max-w-[280px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={DESIGNS_BY_CATEGORY}
                  dataKey="count"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={4}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Reviews bar chart */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews Submitted</CardTitle>
          <CardDescription>Per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={activityConfig} className="h-[220px] w-full">
            <BarChart data={MONTHLY_ACTIVITY}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="reviews" fill="var(--color-reviews)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
