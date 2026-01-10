import { useState } from "react";
import { Sidebar } from "../../../../components/Admin/layout/Sidebar";
import { AdminDashboardHeader } from "../../../../components/Admin/layout/AdminDashboardHeader";
import { ClassDetailsHeader } from "../../../../components/Admin/class/ClassDetailsHeader";
import { ClassDetailsStats } from "../../../../components/Admin/class/ClassDetailsStats";
import ClassSections from "../../../../components/Admin/class/ClassDetailsOverview";
import { useParams } from "react-router-dom";
import EditSectionModal from "../../../../components/Admin/section/EditSectionModal";
import { useClassDetails } from "../../../../hooks/useClasses";
import { useCreateSection, useDeleteSection, useSectionDashboardData, useSectionsByClass, useUpdateSection } from "../../../../hooks/useSection";
import type { Section } from "../../../../types/class.types";
import AddSectionModal from "../../../../components/Admin/section/AddSectionModal";
import { AssignClassTeacherModal, type AssignClassTeacherForm } from "../../../../components/Admin/class/AssignClassTeacherModal";
import { useAssignClassTeacher, useTeachersByClass } from "../../../../hooks/useTeachers";


const ClassDetails: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const [isAssignClassTeacherModalOpen, setIsAssignClassTeacherModalOpen] = useState(false);
    const assignClassTeacherMutate = useAssignClassTeacher();

    const { id } = useParams<{ id: string }>()
    const classId: string = id ?? "";

    const { data: classDetails = null } = useClassDetails(classId);
    const { data: sections = [] } = useSectionsByClass(classId);
    const { data: sectionDashboardData = { totalSections: 0, totalStudents: 0 } } = useSectionDashboardData(classId);
    const { data: teachers = [], isLoading: loading } = useTeachersByClass(selectedSection?.id ? selectedSection.id : '');

    const createSection = useCreateSection();
    const updateSection = useUpdateSection();
    const deleteSection = useDeleteSection();

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleAddSection = async (sectionData: any) => {
        createSection.mutate(sectionData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditSection = (section: Section) => {
        setIsEditModalOpen(true);
        setSelectedSection(section)
    }

    const handleUpdateSection = async (sectionData: any) => {
        updateSection.mutate(sectionData, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteSection = async (classId: any) => {
        deleteSection.mutate(classId)
    }

    const addClassTeacher = (section: Section) => {
        setSelectedSection(section)
        setIsAssignClassTeacherModalOpen(true);
    };

    const handleAssignClassTeacher = async (data: AssignClassTeacherForm) => {
        assignClassTeacherMutate.mutate(data, {
            onSuccess: () => setIsAssignClassTeacherModalOpen(false)
        })
    }

    return (
        <div className="flex h-full bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <AdminDashboardHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">

                        <ClassDetailsHeader
                            className={classDetails?.name}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onAdd={openModal}
                        />
                        <ClassDetailsStats
                            sectionDashboardData={sectionDashboardData}
                        />
                        <ClassSections
                            sections={sections}
                            onAssignClassTeacher={addClassTeacher}
                            onEdit={handleEditSection}
                            onDelete={handleDeleteSection}
                        />

                        <AddSectionModal
                            classId={classId}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddSection}
                        />

                        <EditSectionModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedSection(null);
                            }}
                            onSubmit={handleUpdateSection}
                            section={selectedSection}
                        />

                        <AssignClassTeacherModal
                            isOpen={isAssignClassTeacherModalOpen}
                            onClose={() => setIsAssignClassTeacherModalOpen(false)}
                            sectionId={selectedSection?.id}
                            onSubmit={handleAssignClassTeacher}
                            isLoading={loading}
                            teachers={teachers}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClassDetails;