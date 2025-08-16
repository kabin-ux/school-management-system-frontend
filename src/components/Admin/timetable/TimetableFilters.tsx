
interface TimetableFiltersProps {
  selectedClass: string;
  selectedSection: string;
  selectedSubject: string;
  onClassChange: (value: string) => void;
  onSectionChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
}

export default function TimetableFilters({
  selectedClass,
  selectedSection,
  selectedSubject,
  onClassChange,
  onSectionChange,
  onSubjectChange
}: TimetableFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class :</label>
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 8">Grade 8</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section :</label>
          <select
            value={selectedSection}
            onChange={(e) => onSectionChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject Filter :</label>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All Subject">All Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
          </select>
        </div>
      </div>

      <div className="bg-purple-100 rounded-lg p-3">
        <p className="text-purple-800 text-sm">
          <span className="font-medium">Current Selection :</span> Grade 10 - Section A
          <span className="float-right text-purple-600 cursor-pointer">Click on time slots to add/edit subjects</span>
        </p>
      </div>
    </div>
  );
}