import { Trash2, Edit, Layers, Clock, Calendar } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import type { Section } from '../section/AddSectionModal';

interface ClassSectionsProps {
    sections: Section[];
    onEdit: (section: Section) => void;
    onDelete: (transportationId: string) => void;
}

export default function ClassSections({ sections, onEdit, onDelete }: ClassSectionsProps) {
    return (
        <div>
            {!sections || sections.length === 0 ? (
                <div className="flex justify-center items-center">
                    <EmptyState
                        title="No Sections Found"
                        description="There are currently no sections. Click the button above to add a new section."
                        icon={<Layers className="w-14 h-14 text-gray-400" />}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                            <div>
                                {/* Header Info */}
                                <div className="flex flex-col items-center text-center mb-4">
                                    <Layers className="w-12 h-12 text-blue-500 mb-3" />
                                    <h3 className="font-semibold text-gray-900">Section {section.section_name}</h3>
                                    {/* <p className="text-sm text-gray-500 mb-2">Class : {section.class_id}</p> */}
                                </div>

                                {/* Details */}
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Created: {section.createdAt
                                            ? new Date(section.createdAt).toLocaleDateString()
                                            : "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Updated:{section.updatedAt
                                            ? new Date(section.updatedAt).toLocaleDateString()
                                            : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex justify-center gap-3">
                                <button
                                    onClick={() => onEdit(section)}
                                    className="p-2 rounded hover:bg-gray-100 transition"
                                >
                                    <Edit className="text-blue-500 hover:text-blue-700" />
                                </button>
                                <button
                                    onClick={() => onDelete(section.id)}
                                    className="p-2 rounded hover:bg-gray-100 transition"
                                >
                                    <Trash2 className="text-red-500 hover:text-red-700" />
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
