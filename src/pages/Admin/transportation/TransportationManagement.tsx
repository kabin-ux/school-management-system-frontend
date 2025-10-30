import { useMemo, useState } from 'react';
import { Bus } from 'lucide-react';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import type { Transportation } from '../../../types/admin-transportation.types';
import { TransportationStats } from '../../../components/Admin/transportation/TransportationStats';
import TransportationFilter from '../../../components/Admin/transportation/TransportationFilters';
import TransportationGrid from '../../../components/Admin/transportation/TransporationGrid';
import AddTransportationModal from '../../../components/Admin/transportation/AddTransportationModal';
import EditTransportationModal from '../../../components/Admin/transportation/EditTransporationModal';
import { useAllTransportation, useCreateTransportation, useDeleteTransportation, useTransportationDashboardData, useUpdateTransportation } from '../../../hooks/useTransportation';

export default function TransportationManagement() {
    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const { data: transportations = [], isLoading: loading } = useAllTransportation();
    const { data: transportationDashboardData = { totalVehicles: 0, totalDrivers: 0, totalRoutes: 0 } } = useTransportationDashboardData();

    const addTransportationMutation = useCreateTransportation();
    const updateTransportationMutation = useUpdateTransportation();
    const deleteTransportationMutation = useDeleteTransportation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransportation, setSelectedTransportation] = useState<Transportation | null>(null);

    // Filtered list
    const filteredTransportations = useMemo(() => {
        return transportations.filter((t: Transportation) => {
            const matchesStatus =
                selectedStatus === "All" || t.status === selectedStatus;
            const matchesSearch =
                t.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.driverName.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [transportations, searchTerm, selectedStatus]);

    const handleAddTransportation = async (transportationData: any) => {
        addTransportationMutation.mutate(transportationData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditTransportation = (transportation: Transportation) => {
        setIsEditModalOpen(true);
        setSelectedTransportation(transportation);
    }

    const handleUpdateTransportation = async (id: string, updates: any) => {
        updateTransportationMutation.mutate({ id, updates }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteTransportation = async (transportationId: string) => {
        deleteTransportationMutation.mutate(transportationId);
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
                        {/* Header */}
                        <div className="flex justify-between transportations-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Transportation Management</h1>
                                <p className="text-gray-600 mt-1">Organize and manage Transportation efficiently</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 h-full rounded-lg hover:bg-blue-700 transition-colors font-medium flex transportations-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Bus className="w-4 h-4" />
                                Add Transportation
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <TransportationStats
                            transportationDashboardData={transportationDashboardData}
                        />

                        {/* Filters */}
                        <TransportationFilter
                            searchTerm={searchTerm}
                            selectedStatus={selectedStatus}
                            onSearchChange={setSearchTerm}
                            onStatusChange={setSelectedStatus}
                        />

                        {/* Teacher Grid */}
                        <TransportationGrid
                            transportations={filteredTransportations}
                            onEdit={handleEditTransportation}
                            onDelete={handleDeleteTransportation}
                        />

                        <AddTransportationModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddTransportation}
                            isLoading={loading}
                        />

                        <EditTransportationModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedTransportation(null);
                            }}
                            onSubmit={handleUpdateTransportation}
                            transportation={selectedTransportation}
                            isLoading={loading}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}