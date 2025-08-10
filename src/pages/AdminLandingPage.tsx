import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WebPortalSection from "../components/WebPortalSection";


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