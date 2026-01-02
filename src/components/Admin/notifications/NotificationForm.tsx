import { useState } from "react";
import { Send } from "lucide-react";
import { NoticeType, type NotificationFormData } from "../../../types/Notification";
import type { Student } from "../../../types/student.types";
import type { Teacher } from "../../../types/teacher.types";
import toast from "react-hot-toast";

interface NotificationFormProps {
    onCreateNotice: (data: NotificationFormData, onSuccess: () => void) => void;
    students: Student[];
    teachers: Teacher[];
}

const initialState: NotificationFormData = {
    subject: "",
    notice_for: "all",
    message: "",
    type: "announcement",
    recipients: [],
};

export const NotificationForm: React.FC<NotificationFormProps> = ({
    onCreateNotice,
    students,
    teachers,
}) => {
    const [formData, setFormData] = useState<NotificationFormData>(initialState);

    const handleInputChange = (
        field: keyof NotificationFormData,
        value: string | boolean | string[]
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleRecipient = (id: string) => {
        setFormData((prev) => {
            const recipients = prev.recipients ?? [];
            const exists = recipients.includes(id);

            return {
                ...prev,
                recipients: exists
                    ? recipients.filter((r) => r !== id)
                    : [...recipients, id],
            };
        });
    };

    const handleSendNotification = () => {
        if (!formData.subject || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (formData.notice_for === "someone" && formData.recipients?.length === 0) {
            toast.error("Please select at least one recipient.");
            return;
        }

        onCreateNotice(formData, () => {
            setFormData(initialState); // reset after success
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                    Create New Notice
                </h2>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Notification Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notice Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter notice title"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Target Audience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Audience
                        </label>
                        <select
                            value={formData.notice_for}
                            onChange={(e) => handleInputChange("notice_for", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select target</option>
                            <option value="all">All Users</option>
                            <option value="someone">Someone</option>
                        </select>
                    </div>
                </div>

                {/* Message Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message Content
                    </label>
                    <div className="relative">
                        <textarea
                            placeholder="Enter your notification message here..."
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                            {formData.message.length}/280
                        </div>
                    </div>
                </div>

                {/* Notification Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notification Type
                    </label>
                    <div className="flex gap-4">
                        <select
                            value={formData.type}
                            onChange={(e) => handleInputChange("type", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="" disabled>
                                Select notice type
                            </option>
                            {Object.values(NoticeType).map((type) => (
                                <option key={type} value={type}>
                                    {type.replace(/_/g, " ").toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Recipients (multi-select via checkboxes) */}
                {formData.notice_for === "someone" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Students */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Students
                            </label>
                            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2">
                                {students.length === 0 && (
                                    <p className="text-sm text-gray-500">No students found.</p>
                                )}
                                {students.map((student) => {
                                    const id = String(student.email);
                                    const checked = formData.recipients?.includes(id);
                                    return (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-sm text-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleRecipient(id)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                            />
                                            <span>
                                                {student.firstName} {student.lastName}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Teachers */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Teachers
                            </label>
                            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2">
                                {teachers.length === 0 && (
                                    <p className="text-sm text-gray-500">No teachers found.</p>
                                )}
                                {teachers.map((teacher) => {
                                    const id = String(teacher.email);
                                    const checked = formData.recipients?.includes(id);
                                    return (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-sm text-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleRecipient(id)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                            />
                                            <span>
                                                {teacher.firstName} {teacher.lastName}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Send Button */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSendNotification}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Create Notice
                    </button>
                </div>
            </div>
        </div>
    );
};
