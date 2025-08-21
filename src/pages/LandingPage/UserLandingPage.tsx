import DownloadSection from "../../components/LandingPage/DownloadSection";
import FAQSection from "../../components/LandingPage/FAQSection";
import FinalCTASection from "../../components/LandingPage/FinalCTASection";
import Header from "../../components/LandingPage/Header";
import ParentAppSection from "../../components/LandingPage/ParentAppSection";
import StudentAppSection from "../../components/LandingPage/StudentAppSection";
import TeacherAppSection from "../../components/LandingPage/TeacherAppSection";
import TestimonialsSection from "../../components/LandingPage/TestimonialsSection";
import UserHeroSection from "../../components/LandingPage/UserHeroSection";
import WebPlatformSection from "../../components/LandingPage/WebPlatformSection";

function UserLandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <UserHeroSection />
            <WebPlatformSection />
            <DownloadSection />
            <StudentAppSection />
            <TeacherAppSection />
            <ParentAppSection />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTASection />
        </div>
    );
}

export default UserLandingPage;