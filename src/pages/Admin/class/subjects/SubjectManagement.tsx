import { useEffect, useState } from "react";
import {getClassDetails } from "../../../../features/classSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast from "react-hot-toast";
import { Sidebar } from "../../../../components/Admin/layout/Sidebar";
import { AdminDashboardHeader } from "../../../../components/Admin/layout/DashboardHeader";
import { useParams } from "react-router-dom";
import { SubjectHeader } from "../../../../components/Admin/class/subject/SubjectHeader";
import { SubjectStats } from "../../../../components/Admin/class/subject/SubjectStats";
import { SubjectTable } from "../../../../components/Admin/class/subject/SubjectTable";
import { addSubject, deleteSubject,  getAllSubjectsByClass, updateSubject, type Subject } from "../../../../features/subjectSlice";
import { AddSubjectModal } from "../../../../components/Admin/class/subject/AddSubjectModal";


const SubjectManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const dispatch = useAppDispatch();
    const { classDetails } = useAppSelector(state => state.class)
    const { subjectsByClass, loading } = useAppSelector(state => state.subject)

    const { id } = useParams<{ id: string }>()
    const classId: string = id ?? "";
    console.log(classId)

    useEffect(() => {
        dispatch(getClassDetails(classId))
        dispatch(getAllSubjectsByClass(classId))
    }, [dispatch])

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

    const handleEditSubject = (section: Subject) => {
        setIsEditModalOpen(true);
        setSelectedSubject(section)
    }

    const handleUpdateSubject = async (subjectData: any) => {
        try {
            const res = await dispatch(updateSubject(subjectData))
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SubjectManagement;