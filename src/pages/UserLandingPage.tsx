import DownloadSection from "../components/DownloadSection";
import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import Header from "../components/Header";
import ParentAppSection from "../components/ParentAppSection";
import StudentAppSection from "../components/StudentAppSection";
import TeacherAppSection from "../components/TeacherAppSection";
import TestimonialsSection from "../components/TestimonialsSection";
import UserHeroSection from "../components/UserHeroSection";
import WebPlatformSection from "../components/WebPlatformSection";

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