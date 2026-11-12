import { QuoteProvider } from "@/context/QuoteContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { ServiceTypes } from "@/components/sections/ServiceTypes";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { VeuBanner } from "@/components/sections/VeuBanner";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

/**
 * Homepage (Phase 1). Each section is a self-contained component reading from /src/data,
 * so future pages (Installation, Projects, About, Contact) can reuse them.
 */
export default function HomePage() {
  return (
    <QuoteProvider>
      <Header />
      <main id="main">
        <Hero />
        <FeaturedPackages />
        <ServiceTypes />
        <ProductShowcase />
        <WhyChooseUs />
        <InstallationProcess />
        <ProjectGallery />
        <VeuBanner />
        <QuoteCTA />
      </main>
      <Footer />
    </QuoteProvider>
  );
}
