import { useEffect, useMemo, useState } from 'react';
import { Bus } from 'lucide-react';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import toast from 'react-hot-toast';
import type { Transportation } from '../../../types/admin-transportation.types';
import TransportationStats from '../../../components/Admin/transportation/TransportationStats';
import TransportationFilter from '../../../components/Admin/transportation/TransportationFilters';
import TransportationGrid from '../../../components/Admin/transportation/TransporationGrid';
import AddTransportationModal from '../../../components/Admin/transportation/AddTransportationModal';
import { createTransportation, deleteTransportation, getAllTransportation, updateTransportation } from '../../../features/transportationSlice';
import EditTransportationModal from '../../../components/Admin/transportation/EditTransporationModal';

export default function TransportationManagement() {
    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.transportation)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransportation, setSelectedTransportation] = useState<Transportation | null>(null);

    useEffect(() => {
        dispatch(getAllTransportation())
    }, [dispatch])

    // Filtered list
    const filteredTransportations = useMemo(() => {
        return items.filter((t) => {
            const matchesStatus =
                selectedStatus === "All" || t.status === selectedStatus;
            const matchesSearch =
                t.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.driverName.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [items, searchTerm, selectedStatus]);

    const handleAddTransportation = async (transportationData: any) => {
        try {
            console.log(transportationData)
            const res = await dispatch(createTransportation(transportationData))
            if (createTransportation.fulfilled.match(res)) {
                toast.success('Transportation added successfully')
                setIsModalOpen(false)
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to add Transportation'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error adding Transportation')
            console.error('Error adding Transportation', error)
        }
    }

    const handleEditTransportation = (transportation: Transportation) => {
        setIsEditModalOpen(true);
        setSelectedTransportation(transportation);
    }

    const handleUpdateTransportation = (transportationData: any) => {
        try {
            dispatch(updateTransportation(transportationData))
            toast.success('Transportation updated successfully')
        } catch (error) {
            toast.error('Error updating Transportation')
            console.error('Error updating Transportation', error)
        }
    }

    const handleDeleteTransportation = (transportationId: string) => {
        try {
            dispatch(deleteTransportation(transportationId))
            toast.success('Transportation removed successfully')
        } catch (error) {
            toast.error('Error removing Transportation')
            console.error('Error removing Transportation', error)
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
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Transportation Management</h1>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Bus className="w-4 h-4" />
                                Add Transportation
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <TransportationStats />

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
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}