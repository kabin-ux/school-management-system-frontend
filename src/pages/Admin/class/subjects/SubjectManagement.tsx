import { useState } from "react";
import { Sidebar } from "../../../../components/Admin/layout/Sidebar";
import { AdminDashboardHeader } from "../../../../components/Admin/layout/AdminDashboardHeader";
import { useParams } from "react-router-dom";
import { SubjectHeader } from "../../../../components/Admin/class/subject/SubjectHeader";
import { SubjectStats } from "../../../../components/Admin/class/subject/SubjectStats";
import { SubjectTable } from "../../../../components/Admin/class/subject/SubjectTable";
import { AddSubjectModal } from "../../../../components/Admin/class/subject/AddSubjectModal";
import { AssignTeacherModal, type AssignTeacherForm } from "../../../../components/Admin/class/subject/AssignTeacherModal";
import EditSubjectModal from "../../../../components/Admin/class/subject/EditSubjectModal";
import type { Subject, SubjectForm } from "../../../../types/class.types";
import { useClassDetails } from "../../../../hooks/useClasses";
import { useAddSubject, useAssignSubjectToTeacher, useDeleteSubject, useSubjectDashboardData, useSubjectsByClass, useUpdateSubject } from "../../../../hooks/useSubjects";
import { useTeachers } from "../../../../hooks/useTeachers";


const SubjectManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);

    const { id } = useParams<{ id: string }>()
    const classId: string = id ?? "";

    const { data: teachers = [] } = useTeachers();
    const { data: classDetails } = useClassDetails(classId);
    const { data: subjectsByClass = [], isLoading: loading } = useSubjectsByClass(classId);
    const { data: subjectDashboardData = { totalSubjects: 0, totalTeacher: 0 } } = useSubjectDashboardData(classId);

    const addSubjectMutation = useAddSubject();
    const updateSubjectMutation = useUpdateSubject();
    const deleteSubjectMutation = useDeleteSubject();
    const assignTeacherMutation = useAssignSubjectToTeacher();

    const filteredTeachers = (teachers ?? []).filter(
        (teacher) => teacher?.subjects?.length === 0
    );

    console.log("filterd teacher", filteredTeachers)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleAddSubject = async (subjectData: any) => {
        addSubjectMutation.mutate(subjectData, {
            onSuccess: () => setIsModalOpen(false),
        });
    }

    const handleEditSubject = (subject: Subject) => {
        setIsEditModalOpen(true);
        setSelectedSubject(subject)
    }

    const handleUpdateSubject = async (id: string, updates: SubjectForm) => {
        updateSubjectMutation.mutate({ id, updates }, {
            onSuccess: () => setIsEditModalOpen(false),
        });
    }

    const handleDeleteSubject = async (classId: any) => {
        deleteSubjectMutation.mutate(classId);
    }

    const assignTeacher = (subject: Subject) => {
        setSelectedSubject(subject)
        setIsAssignTeacherModalOpen(true)
    }

    const handleAssignTeacher = async (data: AssignTeacherForm) => {
        assignTeacherMutation.mutate(data);
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

                        <SubjectHeader
                            className={classDetails?.name}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onAdd={openModal}
                        />
                        <SubjectStats
                            subjectDashboardData={subjectDashboardData}
                        />
                        <SubjectTable
                            subjects={subjectsByClass} // subjectsByClass is undefined, the component receives an empty array.
                            onAssignTeacher={assignTeacher}
                            onEdit={handleEditSubject}
                            onDelete={handleDeleteSubject}
                        />

                        <AddSubjectModal
                            classId={classId}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddSubject}
                            isLoading={loading}
                        />

                        <EditSubjectModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedSubject(null);
                            }}
                            onSubmit={handleUpdateSubject}
                            subject={selectedSubject}
                        />

                        <AssignTeacherModal
                            isOpen={isAssignTeacherModalOpen}
                            onClose={() => setIsAssignTeacherModalOpen(false)}
                            subjectId={selectedSubject?.id}
                            onSubmit={handleAssignTeacher}
                            isLoading={loading}
                            teachers={filteredTeachers}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SubjectManagement;