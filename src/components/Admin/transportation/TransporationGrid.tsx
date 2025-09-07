import { Phone, MapPin, Truck, Users, DollarSign, Trash2, Edit } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import type { Transportation } from '../../../types/admin-transportation.types';

interface TransportationGridProps {
  transportations: Transportation[];
  onEdit: (transportation: Transportation) => void;
  onDelete: (transportationId: string) => void;
}

export default function TransportationGrid({ transportations, onEdit, onDelete }: TransportationGridProps) {
  return (
    <div>
      {!transportations || transportations.length === 0 ? (
        <div className="flex justify-center items-center">
          <EmptyState
            title="No Transportations Found"
            description="There are currently no transportation records. Click the button above to add a new vehicle."
            icon={<Truck className="w-14 h-14 text-gray-400" />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transportations.map((transportation) => (
            <div
              key={transportation.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header Info */}
                <div className="flex flex-col items-center text-center mb-4">
                  <Truck className="w-12 h-12 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-gray-900">{transportation.driverName}</h3>
                  <p className="text-sm text-gray-500 mb-2">{transportation.vehicleNumber}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transportation.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {transportation.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{transportation.driverPhone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {transportation.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>Price: {transportation.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{transportation.last_location || 'Unknown'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => onEdit(transportation)}
                  className="p-2 rounded hover:bg-gray-100 transition"
                >
                  <Edit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button
                  onClick={() => onDelete(transportation.id)}
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
