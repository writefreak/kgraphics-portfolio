import Header from "@/components/shared/Header";
import { Container, SectionLabel } from "@/components/Container";
import Footer from "@/components/shared/Footer";

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-36 pb-24 md:pt-44 md:pb-32">
        <Container>
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            The full portfolio is on its way.
          </h1>
          <p className="mt-4 max-w-lg text-ink/60">
            This page is reserved for the complete project archive. Drop the
            full case studies in here when they&apos;re ready.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
