import { Banknote } from 'lucide-react';
import { useFeeSalary } from '../../../hooks/useFeeSalary';
import type { Teacher } from '../../../types/fee-salary.types';
import { FilterSection } from '../../../components/Accountant/feesandsalary/FilterSection';
import { StudentDetailView } from '../../../components/Accountant/feesandsalary/StudentDetailView';
import { DataTable } from '../../../components/Accountant/feesandsalary/DataTable';
import { AccountantDashboardHeader } from '../../../components/Accountant/layout/DashboardHeader';
import { Sidebar } from '../../../components/Accountant/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { addFeesStructure, deleteFeesStructure, getMySchoolFeesStructures, updateFeesStructure } from '../../../features/feesSlice';
import { getAllClassesBySchool } from '../../../features/classSlice';
import { getAllTransportation } from '../../../features/transportationSlice';
import { AddFeeStructureModal, type FeeStructureForm } from '../../../components/Accountant/feesandsalary/AddFeeStructureModal';
import toast from 'react-hot-toast';
import EditFeeStructureModal from '../../../components/Accountant/feesandsalary/EditFeeStructureModal';

export default function FeeAndSalaryPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedFeeStructure, setSelectedFeeStructure] = useState<FeeStructureForm | null>(null);

    const dispatch = useAppDispatch();
    const { mySchoolFeeStructures } = useAppSelector(state => state.fees);
    const { classes } = useAppSelector(state => state.class);
    const { items } = useAppSelector(state => state.transportation);

    useEffect(() => {
        dispatch(getMySchoolFeesStructures())
        dispatch(getAllClassesBySchool())
        dispatch(getAllTransportation())
    }, [dispatch])

    const {
        activeView,
        selectedStudent,
        activeTab,
        filters,
        paymentAmount,
        paymentType,
        feeCategory,
        additionalNotes,
        handleViewChange,
        handleTabChange,
        handleFilterChange,
        setPaymentAmount,
        setPaymentType,
        setFeeCategory,
        setAdditionalNotes,
        resetPaymentForm,
        setSelectedStudent
    } = useFeeSalary();


    const teachers: Teacher[] = [
        { id: 'TC-001', name: 'Ramesh Prasad', department: 'Science', lastPaid: 'Jan 3,2025', totalSalary: 'Rs 50,000', dueAmount: 'Rs 0', status: 'Paid' },
        { id: 'TC-002', name: 'Ramesh Prasad', department: 'Management', lastPaid: 'Jan 3,2025', totalSalary: 'Rs 50,000', dueAmount: 'Rs 30,000', status: 'Unpaid' },
        // ... more teachers
    ];

    const handleSubmitPayment = () => {
        console.log('Submitting payment:', { paymentAmount, paymentType, feeCategory, additionalNotes });
        // Add payment submission logic
        resetPaymentForm();
    };


    const handleEditFeeStructureData = (feeStructure: FeeStructureForm) => {
        setIsEditModalOpen(true);
        setSelectedFeeStructure(feeStructure);
    }

    const handleUpdateFeeStructure = async (feeStructureData: any) => {
        try {
            const res = await dispatch(updateFeesStructure(feeStructureData))
            if (updateFeesStructure.fulfilled.match(res)) {
                toast.success('Fee Structure updated successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to update fee structure'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error updating Fee Structure')
            console.error('Error updating Fee Structure', error)
        }
    }

    const handleDeleteFeeStructureData = async (feeStructureId: string) => {
        try {
            const res = await dispatch(deleteFeesStructure(feeStructureId))
            if (deleteFeesStructure.fulfilled.match(res)) {
                toast.success('Fee Structure removed successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to remove fee structure'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error removing Fee Structure')
            console.error('Error removing Fee Structure', error)
        }
    }

    const handleCreateFeeStructure = async (feeData: FeeStructureForm) => {
        try {
            console.log(feeData)
            const res = await dispatch(addFeesStructure(feeData))
            if (addFeesStructure.fulfilled.match(res)) {
                toast.success('Fee Structure added successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to add fee structure'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error adding Fee Structure')
            console.error('Error adding Fee Structure', error)
        }
    }

    if (selectedStudent) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Fee and Salary</h1>
                        <p className="text-gray-600 mt-1">Manage student fees, staff salary, payments, and receipts</p>
                    </div>
                    <button
                        onClick={() => setSelectedStudent(null)}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        ← Back to List
                    </button>
                </div>

                <FilterSection
                    activeView={activeView}
                    filters={filters}
                    onViewChange={handleViewChange}
                    onFilterChange={handleFilterChange}
                />

                <StudentDetailView
                    activeTab={activeTab}
                    paymentAmount={paymentAmount}
                    paymentType={paymentType}
                    feeCategory={feeCategory}
                    additionalNotes={additionalNotes}
                    onTabChange={handleTabChange}
                    onPaymentAmountChange={setPaymentAmount}
                    onPaymentTypeChange={setPaymentType}
                    onFeeCategoryChange={setFeeCategory}
                    onAdditionalNotesChange={setAdditionalNotes}
                    onSubmitPayment={handleSubmitPayment}
                    onClearPayment={resetPaymentForm}
                />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <AccountantDashboardHeader />
                {/* Scrollable Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Fee and Salary</h1>
                            <p className="text-gray-600 mt-1">Manage student fees, staff salary, payments, and receipts</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Banknote className="h-4 w-4 mr-2" />
                            Create Fee Structure
                        </button>
                        {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download report
                        </button> */}
                    </div>

                    <FilterSection
                        activeView={activeView}
                        filters={filters}
                        onViewChange={handleViewChange}
                        onFilterChange={handleFilterChange}
                    />

                    <DataTable
                        activeView={activeView}
                        students={mySchoolFeeStructures}
                        teachers={teachers}
                        // onRowClick={handleStudentSelect}
                        onEdit={handleEditFeeStructureData}
                        onDelete={handleDeleteFeeStructureData}
                    />

                    <AddFeeStructureModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateFeeStructure}
                        classes={classes}
                        items={items}
                    />

                    <EditFeeStructureModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedFeeStructure(null);
                        }}
                        onSubmit={handleUpdateFeeStructure}
                        feeStructure={selectedFeeStructure}
                        classes={classes}
                        transportOptions={items}
                    />
                </main>
            </div>
        </div>
    );
}
