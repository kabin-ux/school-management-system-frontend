import FAQSection from "../../components/LandingPage/FAQSection";
import FinalCTASection from "../../components/LandingPage/FinalCTASection";
import Header from "../../components/LandingPage/Header";
import HeroSection from "../../components/LandingPage/HeroSection";
import TestimonialsSection from "../../components/LandingPage/TestimonialsSection";
import WebPortalSection from "../../components/LandingPage/WebPortalSection";


function AdminLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <WebPortalSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

export default AdminLandingPage;