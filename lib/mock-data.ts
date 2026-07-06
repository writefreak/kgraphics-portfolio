// lib/mock-data.ts
export type Review = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export type Design = {
  id: string;
  title: string;
  category: string;
  image: string;
  featured: boolean;
  createdAt: string;
};

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Bolu Adekunle",
    rating: 5,
    comment:
      "K-Graphics nailed our brand identity on the first pass. Fast, sharp, professional.",
    status: "approved",
    createdAt: "2026-06-28",
  },
  {
    id: "2",
    name: "Chidinma Okafor",
    rating: 4,
    comment:
      "Great flyer designs for our event series. Minor revision requests were handled same day.",
    status: "approved",
    createdAt: "2026-06-20",
  },
  {
    id: "3",
    name: "Roged Team",
    rating: 5,
    comment:
      "Clean, modern branding that actually matched our vision. Highly recommend.",
    status: "pending",
    createdAt: "2026-07-01",
  },
  {
    id: "4",
    name: "Kenny L.",
    rating: 3,
    comment:
      "Good work overall, turnaround took a little longer than expected.",
    status: "pending",
    createdAt: "2026-07-03",
  },
  {
    id: "5",
    name: "David Anthony",
    rating: 5,
    comment: "Birthday flyer was a huge hit. Will be back for more projects.",
    status: "approved",
    createdAt: "2026-06-15",
  },
  {
    id: "6",
    name: "Smadecable",
    rating: 2,
    comment: "Communication could've been better mid-project.",
    status: "rejected",
    createdAt: "2026-06-10",
  },
];

export const DESIGNS: Design[] = [
  {
    id: "1",
    title: "Global Innovation Hub Brand Identity",
    category: "Branding",
    image: "/6.jpg",
    featured: true,
    createdAt: "2026-05-12",
  },
  {
    id: "2",
    title: "Morara Hair Therapy Business Flyer",
    category: "Print & Digital",
    image: "/5.jpg",
    featured: false,
    createdAt: "2026-05-20",
  },
  {
    id: "3",
    title: "Jiggy's Glam Social Media Set",
    category: "Social",
    image: "/2.jpg",
    featured: true,
    createdAt: "2026-06-01",
  },
  {
    id: "4",
    title: "Morara Hair Therapy Product Packaging",
    category: "Branding",
    image: "/9.jpg",
    featured: false,
    createdAt: "2026-06-08",
  },
  {
    id: "5",
    title: "Gem Fashion Brand Identity",
    category: "Branding",
    image: "/15.jpg",
    featured: true,
    createdAt: "2026-06-18",
  },
  {
    id: "6",
    title: "Beauty J Empire Flyer",
    category: "Print & Digital",
    image: "/13.jpg",
    featured: false,
    createdAt: "2026-06-25",
  },
];

export const MONTHLY_ACTIVITY = [
  { month: "Feb", inquiries: 12, reviews: 3 },
  { month: "Mar", inquiries: 18, reviews: 5 },
  { month: "Apr", inquiries: 15, reviews: 4 },
  { month: "May", inquiries: 24, reviews: 7 },
  { month: "Jun", inquiries: 31, reviews: 9 },
  { month: "Jul", inquiries: 20, reviews: 6 },
];

export const DESIGNS_BY_CATEGORY = [
  { category: "Branding", count: 3, fill: "var(--color-branding)" },
  { category: "Print & Digital", count: 2, fill: "var(--color-print)" },
  { category: "Social", count: 1, fill: "var(--color-social)" },
];
