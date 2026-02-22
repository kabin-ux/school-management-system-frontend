import { useState, useMemo } from "react";
import { Send, Filter } from "lucide-react";
import { type NotificationFormData } from "../../../types/Notification";
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
    const [classFilter, setClassFilter] = useState<string>("all");
    const [sectionFilter, setSectionFilter] = useState<string>("all");

    // Extract unique class/section names for the dropdowns
    const { classes, sections } = useMemo(() => {
        const classSet = new Set<string>();
        const sectionSet = new Set<string>();

        students.forEach((s) => {
            // Fix: Access name/section_name safely and convert to string
            const className = s.class?.name;
            const sectionName = s.section?.section_name;

            if (className) classSet.add(String(className));
            if (sectionName) sectionSet.add(String(sectionName));
        });

        return {
            classes: Array.from(classSet).sort(),
            sections: Array.from(sectionSet).sort(),
        };
    }, [students]);

    // Filtering logic
    const filteredStudents = useMemo(() => {
        return students.filter((s) => {
            const sClassName = String(s.class?.name || s.class);
            const sSectionName = String(s.section?.section_name || s.section);

            const matchClass = classFilter === "all" || sClassName === classFilter;
            const matchSection = sectionFilter === "all" || sSectionName === sectionFilter;
            return matchClass && matchSection;
        });
    }, [students, classFilter, sectionFilter]);

    const handleInputChange = (field: keyof NotificationFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleRecipient = (id: string) => {
        setFormData((prev) => {
            const recipients = prev.recipients ?? [];
            const exists = recipients.includes(id);
            return {
                ...prev,
                recipients: exists ? recipients.filter((r) => r !== id) : [...recipients, id],
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
        onCreateNotice(formData, () => setFormData(initialState));
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Create New Notice</h2>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notice Title</label>
                        <input
                            type="text"
                            placeholder="Enter notice title"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select
                            value={formData.notice_for}
                            onChange={(e) => handleInputChange("notice_for", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="all">All Users</option>
                            <option value="someone">Someone</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                    <div className="relative">
                        <textarea
                            placeholder="Enter message..."
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                            {formData.message.length}/280
                        </div>
                    </div>
                </div>

                {formData.notice_for === "someone" && (
                    <div className="space-y-4 pt-6">
                        <div className="flex items-center gap-2 text-gray-900 mb-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Filter Students</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Class</label>
                                <select
                                    value={classFilter}
                                    onChange={(e) => setClassFilter(e.target.value)}
                                    className="w-full text-sm border-gray-300 rounded-md"
                                >
                                    <option value="all">All Classes</option>
                                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Section</label>
                                <select
                                    value={sectionFilter}
                                    onChange={(e) => setSectionFilter(e.target.value)}
                                    className="w-full text-sm border-gray-300 rounded-md"
                                >
                                    <option value="all">All Sections</option>
                                    {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Students ({filteredStudents.length})
                                </label>
                                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2">
                                    {filteredStudents.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No matching students.</p>
                                    ) : (
                                        filteredStudents.map((student) => {
                                            const id = String(student.email);
                                            return (
                                                <label key={id} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer p-1 rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.recipients?.includes(id)}
                                                        onChange={() => toggleRecipient(id)}
                                                        className="w-4 h-4 text-blue-600 rounded"
                                                    />
                                                    <span>
                                                        {student.firstName} {student.lastName}
                                                        <span className="text-xs text-gray-400 ml-1">
                                                            ({String(student.class?.name || 'N/A')} - {String(student.section?.section_name || 'N/A')})
                                                        </span>
                                                    </span>
                                                </label>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Teachers</label>
                                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2">
                                    {teachers.map((teacher) => {
                                        const id = String(teacher.email);
                                        return (
                                            <label key={id} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer p-1 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.recipients?.includes(id)}
                                                    onChange={() => toggleRecipient(id)}
                                                    className="w-4 h-4 text-blue-600 rounded"
                                                />
                                                <span>{teacher.firstName} {teacher.lastName}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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