import Contact from "@/components/Contact";
import { Footer } from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Contact />
      <Footer />
    </>
  );
}
