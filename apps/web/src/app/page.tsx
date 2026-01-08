import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import HeroSection from "./sections/hero";
import FeaturesSection from "./sections/features";
import HowItWorksSection from "./sections/how-it-works";
import CtaSection from "./sections/cta";
import OverviewSection from "./sections/overview";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <OverviewSection />
      <CtaSection />
      <Footer />
    </>
  );
}
