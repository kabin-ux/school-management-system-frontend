import { MapPin, User, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SchoolHeaderProps {
  schoolName: string;
  schoolCode: string;
  address: string;
  principal: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
  memberSince: string;
}

export default function SchoolHeader({
  schoolName,
  schoolCode,
  address,
  principal,
  email,
  phone,
  status,
  createdDate,
  memberSince
}: SchoolHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/super-admin/partner-schools`)
  }
  return (
   <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 flex-1">
  {/* Top row: Back button and main content */}
  <div className="flex justify-between items-start">
    {/* Left column: School info */}
    <div className="flex items-start gap-4">
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors mt-1"
        onClick={handleBack}
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">{schoolName}</h1>
        <p className="text-gray-600 mb-4">School Code: {schoolCode}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>Principal: {principal}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Right column: Status and dates */}
    <div className="text-right">
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
      <div className="mt-4 text-sm text-gray-600">
        <p>Created: {createdDate}</p>
        <p>Member since: {memberSince}</p>
      </div>
    </div>
  </div>
</div>

  );
}