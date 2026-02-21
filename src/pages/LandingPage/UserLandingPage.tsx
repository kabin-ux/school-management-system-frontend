import { useEffect } from "react";
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
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1); // remove #
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Small delay to allow the page to render
        }
    }, []);
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