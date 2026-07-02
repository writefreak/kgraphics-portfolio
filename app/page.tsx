import Header from "@/components/shared/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import BrandStory from "@/components/BrandStory";
import Contact from "@/components/Contact";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Reviews />
        <BrandStory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
