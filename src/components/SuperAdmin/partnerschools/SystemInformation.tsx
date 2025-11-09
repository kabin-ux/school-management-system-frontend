import type { SchoolData } from "../../../types/partner-school.types";

interface SystemInformationProps {
  school: SchoolData;
  onEditSchool: () => void;
  onDeleteSchool: (id: string) => void;
}

export default function SystemInformation({ school, onEditSchool, onDeleteSchool }: SystemInformationProps) {


  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Actions</h3>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          onClick={onEditSchool}
        >
          Reset Schools Information
        </button>
        <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          onClick={() => onDeleteSchool(school.id)}
        >
          Remove School From Partnered Schools
        </button>
      </div>
    </div>
  );
}