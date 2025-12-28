import toast from "react-hot-toast";
import { AdminDashboardHeader } from "../../../components/Admin/layout/AdminDashboardHeader";
import { Sidebar } from "../../../components/Admin/layout/Sidebar";
import { NotificationForm } from "../../../components/Admin/notifications/NotificationForm";
import { NotificationLog } from "../../../components/Admin/notifications/NotificationLog";
import { useSchoolNotices, useDeleteMySchoolNotice, useSendNoticeForStudent } from "../../../hooks/useNotification";
import { useStudentsBySchool } from "../../../hooks/useStudents";
import { useTeachers } from "../../../hooks/useTeachers";
import type { NotificationFormData } from "../../../types/Notification";

export default function NotificationsCenter() {
    const { data: students = [] } = useStudentsBySchool();
    const { data: teachers = [] } = useTeachers();

    const { data: notices = [] } = useSchoolNotices();
    console.log(notices)

    const createNoticeMutation = useSendNoticeForStudent();
    const deleteNoticeMutation = useDeleteMySchoolNotice();

    const handleCreateNotice = (
        noticeData: NotificationFormData,
        onSuccess: () => void
    ) => {
        createNoticeMutation.mutate(
            { payload: noticeData },
            {
                onSuccess: () => {
                    toast.success("Notice sent successfully");
                    onSuccess(); // ✅ clears the form
                },
            }
        );
    };

    const handleDeleteNotice = (id: string) => {
        deleteNoticeMutation.mutate(
            id, // <-- wrap in payload
            {
                onSuccess: () => toast.success("Notice removed successfully"),
            }
        );
    };

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
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Notifications Center
                                </h1>
                                <p className="text-gray-600">
                                    Manage all communications sent to teachers and student
                                </p>
                            </div>
                        </div>

                        <NotificationForm
                            students={students}
                            teachers={teachers}
                            onCreateNotice={handleCreateNotice}
                        />
                        <NotificationLog
                            notices={notices}
                            onDeleteNotice={handleDeleteNotice}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
