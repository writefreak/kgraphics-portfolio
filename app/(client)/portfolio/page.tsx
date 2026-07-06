import Header from "@/components/shared/Header";
import { Container, SectionLabel } from "@/components/Container";
import PortfolioFeed from "@/components/portfolio/portfolio-feed";
const PORTFOLIO_ITEMS = [
  {
    id: "1",
    name: "Bolu Couture Flyer Design",
    category: "Print & Digital",
    image: "/1.jpg",
  },
  {
    id: "2",
    name: "Jiggy's Glam Social Media Set",
    category: "Social",
    image: "/2.jpg",
  },
  {
    id: "3",
    name: "Why Wait Promo Post",
    category: "Social",
    image: "/3.jpg",
  },
  {
    id: "4",
    name: "Happy Valentine's Day Post",
    category: "Social",
    image: "/4.jpg",
  },
  {
    id: "5",
    name: "Morara Hair Therapy Business Flyer",
    category: "Print & Digital",
    image: "/5.jpg",
  },
  {
    id: "6",
    name: "Global Innovation Hub Brand Identity",
    category: "Branding",
    image: "/6.jpg",
  },
  {
    id: "7",
    name: "TalkWithChi Ladies Hangout Flyer",
    category: "Print & Digital",
    image: "/7.jpg",
  },
  {
    id: "8",
    name: "Olaoye2026 Save The Date Flyer",
    category: "Print & Digital",
    image: "/8.jpg",
  },
  {
    id: "9",
    name: "Morara Hair Therapy Product Packaging",
    category: "Branding",
    image: "/9.jpg",
  },
  {
    id: "10",
    name: "Roged Exchange Flyer",
    category: "Print & Digital",
    image: "/10.jpg",
  },
  {
    id: "11",
    name: "David Anthony Birthday Flyer",
    category: "Print & Digital",
    image: "/11.jpg",
  },
  {
    id: "12",
    name: "StyledByKennyl Business Flyer",
    category: "Print & Digital",
    image: "/12.jpg",
  },
  {
    id: "13",
    name: "Beauty J Empire Flyer",
    category: "Print & Digital",
    image: "/13.jpg",
  },
  {
    id: "14",
    name: "Smadecable Brand Identity",
    category: "Branding",
    image: "/14.jpg",
  },
  {
    id: "15",
    name: "Gem Fashion Brand Identity",
    category: "Branding",
    image: "/15.jpg",
  },
];
export default function page() {
  return (
    <>
      <main className="pt-40">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              What Our Valued Clients Are Saying About Us
            </h2>
          </div>
        </div>

        <PortfolioFeed items={PORTFOLIO_ITEMS} />
      </main>
    </>
  );
}
