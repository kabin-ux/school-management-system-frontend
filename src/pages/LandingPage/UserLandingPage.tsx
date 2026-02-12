import AboutGurukulSetu from "../../components/LandingPage/AboutGurukulSetu";
import BuiltForEveryone from "../../components/LandingPage/BuiltForEveryone";
import ComprehensiveFeatures from "../../components/LandingPage/ComprehensiveFeatures";
import DownloadCTA from "../../components/LandingPage/DownloadSection";
import FAQ from "../../components/LandingPage/FAQSection";
import Footer from "../../components/LandingPage/FinalCTASection";
import Header from "../../components/LandingPage/Header";
import RealSuccessStories from "../../components/LandingPage/RealSuccessStories";
import RequestDemo from "../../components/LandingPage/RequestDemo";
import UnifiedEcosystem from "../../components/LandingPage/UnifiedEcosystem";
import UserHeroSection from "../../components/LandingPage/UserHeroSection";

function UserLandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <UserHeroSection />
            <BuiltForEveryone />
            <AboutGurukulSetu />
            <DownloadCTA />
            <UnifiedEcosystem />
            <ComprehensiveFeatures />
            <FAQ />
            <RealSuccessStories />
            <RequestDemo />
            <Footer />
        </div>
    );
}

export default UserLandingPage;