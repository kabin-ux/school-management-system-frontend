import { DashboardHeader } from "../../../../components/SuperAdmin/layout/DashboardHeader";
import { Sidebar } from "../../../../components/SuperAdmin/layout/Sidebar";
import FinancialOverview from "../../../../components/SuperAdmin/partnerschools/FinancialOverview";
import SchoolHeader from "../../../../components/SuperAdmin/partnerschools/SchoolHeader";
import SchoolPlan from "../../../../components/SuperAdmin/partnerschools/SchoolPlan";
import SchoolStats from "../../../../components/SuperAdmin/partnerschools/SchoolStats";
import SupportTickets from "../../../../components/SuperAdmin/partnerschools/SupportTickets";
import SystemInformation from "../../../../components/SuperAdmin/partnerschools/SystemInformation";


export default function PartnerSchoolDetails() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />      <div className="max-w-7xl mx-auto">
                    {/* School Header */}
                    <SchoolHeader
                        schoolName="Shree Lumbini School"
                        schoolCode="S-2024-001"
                        address="123 Education Street, Kathmandu, Nepal"
                        principal="Dr. Rajesh Kumar Sharma"
                        email="principal@shreelumbini.school.edu.np"
                        phone="+977-1-4521678"
                        status="Active"
                        createdDate="March 15, 2024"
                        memberSince="1 year"
                    />

                    {/* School Plan */}
                    <SchoolPlan
                        currentPlan="Premium"
                        subscriptionStart="March 15, 2024"
                        subscriptionEnd="March 15, 2025"
                        accountStatus="All systems operational"
                    />

                    {/* School Statistics */}
                    <SchoolStats />

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Financial Overview - spans 2 columns */}
                        <div className="lg:col-span-2">
                            <FinancialOverview />
                            <SupportTickets />
                        </div>

                        {/* System Information - spans 1 column */}
                        <div>
                            <SystemInformation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}