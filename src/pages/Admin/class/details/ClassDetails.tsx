import { useEffect, useState } from "react";
import { createSection, deleteSection, getSectionsByClass, updateSection } from "../../../../features/sectionSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast from "react-hot-toast";
import { Sidebar } from "../../../../components/Admin/layout/Sidebar";
import { AdminDashboardHeader } from "../../../../components/Admin/layout/DashboardHeader";
import { ClassDetailsHeader } from "../../../../components/Admin/class/ClassDetailsHeader";
import { ClassDetailsStats } from "../../../../components/Admin/class/ClassDetailsStats";
import ClassSections from "../../../../components/Admin/class/ClassDetailsOverview";
import { useParams } from "react-router-dom";
import AddSectionModal, { type Section } from "../../../../components/Admin/section/AddSectionModal";
import EditSectionModal from "../../../../components/Admin/section/EditSectionModal";
import { useClassDetails } from "../../../../hooks/useClasses";


const ClassDetails: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>()
    const classId: string = id ?? "";
    
    const { data: classDetails } = useClassDetails(classId);
    const { sections } = useAppSelector(state => state.section)



    useEffect(() => {
        dispatch(getSectionsByClass(classId))
    }, [dispatch])

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleAddSection = async (sectionData: any) => {
        try {
            const res = await dispatch(createSection(sectionData))
            if (createSection.fulfilled.match(res)) {
                toast.success('Section added successfully')
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error adding Section'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error adding Section')
            console.error('Error adding Section', error)
        }
    }

    const handleEditSection = (section: Section) => {
        setIsEditModalOpen(true);
        setSelectedSection(section)
    }

    const handleUpdateSection = async (sectionData: any) => {
        try {
            const res = await dispatch(updateSection(sectionData))
            if (updateSection.fulfilled.match(res)) {
                toast.success('Section updated successfully')
            } else {
                toast.error('Error updating section')
            }
        } catch (error) {
            toast.error('Error updating section')
            console.error('Error updating section', error)
        }
    }

    const handleDeleteSection = async (classId: any) => {
        try {
            const res = await dispatch(deleteSection(classId))
            if (deleteSection.fulfilled.match(res)) {
                toast.success('Section deleted successfully')
            } else {
                toast.error('Error deleting section')
            }
        } catch (error) {
            toast.error('Error deleting section')
            console.error('Error deleting section', error)
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

                        <ClassDetailsHeader
                            className={classDetails?.name}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onAdd={openModal}
                        />
                        <ClassDetailsStats />
                        <ClassSections
                            sections={sections}
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClassDetails;