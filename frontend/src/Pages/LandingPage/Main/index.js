import LandingPageHeroSection from "./heroSection";
import LandingPageFeature from "./feature";
import FAQSection from "./faq";

export default function LandingPageMain() {
  return (
    <div className="relative z-10 w-full bg-black">
      <LandingPageHeroSection />
      <LandingPageFeature />
      <FAQSection/>
    </div>
  );
}
