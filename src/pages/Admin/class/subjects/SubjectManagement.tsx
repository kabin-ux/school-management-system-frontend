import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast from "react-hot-toast";
import { Sidebar } from "../../../../components/Admin/layout/Sidebar";
import { AdminDashboardHeader } from "../../../../components/Admin/layout/DashboardHeader";
import { useParams } from "react-router-dom";
import { SubjectHeader } from "../../../../components/Admin/class/subject/SubjectHeader";
import { SubjectStats } from "../../../../components/Admin/class/subject/SubjectStats";
import { SubjectTable } from "../../../../components/Admin/class/subject/SubjectTable";
import { addSubject, assignSubjectsToTeacher, deleteSubject, getAllSubjectsByClass, updateSubject } from "../../../../features/subjectSlice";
import { AddSubjectModal } from "../../../../components/Admin/class/subject/AddSubjectModal";
import { getAllTeachers } from "../../../../features/teacherSlice";
import { AssignTeacherModal, type AssignTeacherForm } from "../../../../components/Admin/class/subject/AssignTeacherModal";
import EditSubjectModal from "../../../../components/Admin/class/subject/EditSubjectModal";
import type { Subject, SubjectForm } from "../../../../types/class.types";
import { useClassDetails } from "../../../../hooks/useClasses";


const SubjectManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);


    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>()
    const classId: string = id ?? "";
    console.log(classId)

    const { data: classDetails } = useClassDetails(classId);
    const { subjectsByClass, loading } = useAppSelector(state => state.subject)
    const { teachers } = useAppSelector(state => state.teacher)



    useEffect(() => {
        dispatch(getClassDetails(classId))
        dispatch(getAllSubjectsByClass(classId))
        dispatch(getAllTeachers())
    }, [dispatch])

    const filteredTeachers = teachers?.filter((teacher) => teacher?.subjects?.length === 0);

    console.log("filterd teacher", filteredTeachers)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleAddSubject = async (subjectData: any) => {
        try {
            const res = await dispatch(addSubject(subjectData))
            if (addSubject.fulfilled.match(res)) {
                toast.success('Subject added successfully')
                setIsModalOpen(false);
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error adding Subject'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error adding Subject')
            console.error('Error adding Subject', error)
        }
    }

    const handleEditSubject = (subject: Subject) => {
        setIsEditModalOpen(true);
        setSelectedSubject(subject)
    }

    const handleUpdateSubject = async (id: string, updates: SubjectForm) => {
        try {
            console.log("subjecdata", updates)
            const res = await dispatch(updateSubject({ id, updates }))
            if (updateSubject.fulfilled.match(res)) {
                toast.success('Subject updated successfully')
            } else {
                toast.error('Error updating Subject')
            }
        } catch (error) {
            toast.error('Error updating Subject')
            console.error('Error updating Subject', error)
        }
    }

    const handleDeleteSubject = async (classId: any) => {
        try {
            const res = await dispatch(deleteSubject(classId))
            if (deleteSubject.fulfilled.match(res)) {
                toast.success('Subject deleted successfully')
            } else {
                toast.error('Error deleting subject')
            }
        } catch (error) {
            toast.error('Error deleting subject')
            console.error('Error deleting subject', error)
        }
    }

    const assignTeacher = (subject: Subject) => {
        setSelectedSubject(subject)
        setIsAssignTeacherModalOpen(true)
    }

    const handleAssignTeacher = async (data: AssignTeacherForm) => {
        try {
            const res = await dispatch(assignSubjectsToTeacher(data))
            if (assignSubjectsToTeacher.fulfilled.match(res)) {
                toast.success('Teacher assigned to subject successfully')
            } else {
                toast.error('Error assigning Teacher')
            }
        } catch (error) {
            toast.error('Error assigning Teacher')
            console.error('Error assigning Teacher', error)
        }
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
                        <SubjectStats />
                        <SubjectTable
                            subjects={subjectsByClass}
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
                            teachers={teachers}
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