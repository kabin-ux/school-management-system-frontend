import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardHeader } from "../../../../components/SuperAdmin/layout/DashboardHeader";
import { Sidebar } from "../../../../components/SuperAdmin/layout/Sidebar";
import FinancialOverview from "../../../../components/SuperAdmin/partnerschools/FinancialOverview";
import SchoolHeader from "../../../../components/SuperAdmin/partnerschools/SchoolHeader";
import SchoolPlan from "../../../../components/SuperAdmin/partnerschools/SchoolPlan";
import { SchoolStats } from "../../../../components/SuperAdmin/partnerschools/SchoolStats";
import { SupportTickets } from "../../../../components/SuperAdmin/partnerschools/SupportTickets";
import SystemInformation from "../../../../components/SuperAdmin/partnerschools/SystemInformation";
import Loading from "../../../../common/Loading";
import { EditSchoolModal } from "../../../../components/SuperAdmin/partnerschools/EditSchoolModal";
import { useDeleteSchool, useSchoolDetails, useUpdateSchool } from "../../../../hooks/useSchools";
import type { SchoolDataForm } from "../../../../types/partner-school.types";
import { useSupportTicketsBySchool } from "../../../../hooks/useSupportTickets";

export default function PartnerSchoolDetails() {
    const { id } = useParams<{ id: string }>(); // expects URL like /super-admin/partner-schools/:id

    const { data: currentSchool, isLoading: loading, isError: error } = useSchoolDetails(id ? id : '');
    const { data: supportTickets = [] } = useSupportTicketsBySchool(id ? id : '')
    const updateSchoolMutation = useUpdateSchool();
    const deleteSchoolMutation = useDeleteSchool();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (loading) return <Loading />

    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!currentSchool) return <p className="p-6">No school data found.</p>;

    const handleEditSchool = () => {
        setIsEditModalOpen(true);
    };

    const handleUpdateSschool = (updates: SchoolDataForm, id: any) => {
        updateSchoolMutation.mutate({ id, updates }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }
    console.log(id)

    const handleRemoveSchool = (id: string) => {
        console.log("id school", id)
        deleteSchoolMutation.mutate(id)
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />
                <div className="max-w-7xl mx-auto">
                    {/* School Header */}
                    <SchoolHeader
                        schoolName={currentSchool.name}
                        schoolCode={currentSchool.school_code}
                        address={currentSchool.address}
                        principal={currentSchool.principal_name}
                        email={currentSchool.email}
                        phone={currentSchool.phone}
                        status={currentSchool.status}
                        createdDate={new Date(currentSchool.createdAt).toLocaleDateString()}
                        memberSince={currentSchool.established_year}
                    />

                    {/* School Plan */}
                    <SchoolPlan
                        currentPlan={currentSchool.currentPlan}
                        subscriptionStart={currentSchool.subscriptionStart}
                        subscriptionEnd={currentSchool.subscriptionEnd}
                        accountStatus={currentSchool.accountStatus}
                    />

                    {/* School Statistics */}
                    <SchoolStats
                        schoolData={currentSchool}
                    />

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Financial Overview - spans 2 columns */}
                        <div className="lg:col-span-2">
                            <FinancialOverview />
                            <SupportTickets
                                supportTickets={supportTickets}
                            />
                        </div>

                        {/* System Information - spans 1 column */}
                        <div>
                            <SystemInformation
                                school={currentSchool}
                                onEditSchool={handleEditSchool}
                                onDeleteSchool={handleRemoveSchool}
                            />
                        </div>

                        <EditSchoolModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                            }}
                            onSubmit={handleUpdateSschool}
                            school={currentSchool}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
