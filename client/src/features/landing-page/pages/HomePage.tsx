import AboutSection from "../components/AboutSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";

export function HomePage() {
  return (
    <main className="bg-neutral-50">
      <HeroSection />
      <div className="w-full px-4 md:px-6 md:pb-16 lg:pb-25">
        <HowItWorksSection />
        <AboutSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
