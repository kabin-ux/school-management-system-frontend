import { Banknote } from 'lucide-react';
import { useFeeSalary } from '../../../hooks/useFeeSalary';
import type { Salary, SalaryStructureForm, Teacher } from '../../../types/fee-salary.types';
import { FilterSection } from '../../../components/Accountant/feesandsalary/FilterSection';
import { StudentDetailView } from '../../../components/Accountant/feesandsalary/StudentDetailView';
import { DataTable } from '../../../components/Accountant/feesandsalary/DataTable';
import { AccountantDashboardHeader } from '../../../components/Accountant/layout/DashboardHeader';
import { Sidebar } from '../../../components/Accountant/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { addFeesStructure, deleteFeesStructure, getMySchoolFeesStructures, updateFeesStructure } from '../../../features/feesSlice';
import { getAllTransportation } from '../../../features/transportationSlice';
import { AddFeeStructureModal, type FeeStructureForm } from '../../../components/Accountant/feesandsalary/AddFeeStructureModal';
import toast from 'react-hot-toast';
import EditFeeStructureModal from '../../../components/Accountant/feesandsalary/EditFeeStructureModal';
import { createSalaryStructure, deleteSalaryStructure, getMySchoolSalaryStructures, updateSalaryStructure } from '../../../features/salarySlice';
import { AddSalaryStructureModal } from '../../../components/Accountant/feesandsalary/salary/AddSalaryStructureModal';
import { getAllTeachers } from '../../../features/teacherSlice';
import { getAllAccountantBySchool } from '../../../features/accountantSlice';
import EditSalaryStructureModal from '../../../components/Accountant/feesandsalary/salary/EditSalaryStructureModal';
import { useClasses } from '../../../hooks/useClasses';

export default function FeeAndSalaryPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditSalaryModalOpen, setIsEditSalaryModalOpen] = useState(false);
    const [selectedFeeStructure, setSelectedFeeStructure] = useState<FeeStructureForm | null>(null);
    const [selectedSalaryStructure, setSelectedSalaryStructure] = useState<Salary | null>(null);

    const dispatch = useAppDispatch();
    const { feeStructures, loading } = useAppSelector(state => state.fees);
    const { salaryStructures, isLoading } = useAppSelector(state => state.salary);
    const { data: classes = [] } = useClasses();
    const { items } = useAppSelector(state => state.transportation);
    const { teachers } = useAppSelector(state => state.teacher);
    const { accountantBySchool } = useAppSelector(state => state.accountant);

    useEffect(() => {
        dispatch(getMySchoolFeesStructures())
        dispatch(getAllTransportation())
        dispatch(getMySchoolSalaryStructures())

        dispatch(getAllTeachers())
        dispatch(getAllAccountantBySchool())
    }, [])

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

    const handleEditSalaryStructureData = (salaryStructure: Salary) => {
        setIsEditSalaryModalOpen(true);
        setSelectedSalaryStructure(salaryStructure);
    }

    const handleUpdateSalaryStructure = async (id: string, data: SalaryStructureForm) => {
        try {
            const res = await dispatch(updateSalaryStructure({id, data}))
            if (updateSalaryStructure.fulfilled.match(res)) {
                toast.success('Salary Structure updated successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to update Salary structure'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error updating Salary Structure')
            console.error('Error updating Salary Structure', error)
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

    const handleDeleteSalaryStructureData = async (salaryStructureId: string) => {
        try {
            const res = await dispatch(deleteSalaryStructure(salaryStructureId))
            if (deleteSalaryStructure.fulfilled.match(res)) {
                toast.success('Salary Structure removed successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to remove Salary structure'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error removing Salary Structure')
            console.error('Error removing Salary Structure', error)
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

    const handleCreateSalaryStructure = async (salaryData: SalaryStructureForm) => {
        try {
            console.log("salary", salaryData)
            const res = await dispatch(createSalaryStructure(salaryData))
            if (createSalaryStructure.fulfilled.match(res)) {
                toast.success('Salary Structure created successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to create salary structure'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error adding Salary Structure')
            console.error('Error adding Salary Structure', error)
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
                            onClick={() => {
                                if (activeView === "Student") {
                                    setIsModalOpen(true);
                                } else {
                                    setIsSalaryModalOpen(true);
                                }
                            }}                        >
                            <Banknote className="h-4 w-4 mr-2" />
                            {activeView === 'Student' ? 'Create Fee Structure' : 'Create Salary Structure'}
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
                        students={feeStructures}
                        teachers={salaryStructures}
                        // onRowClick={handleStudentSelect}
                        onEdit={handleEditFeeStructureData}
                        onDelete={handleDeleteFeeStructureData}
                        onEditSalary={handleEditSalaryStructureData}
                        onDeleteSalary={handleDeleteSalaryStructureData}
                    />

                    <AddFeeStructureModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateFeeStructure}
                        classes={classes}
                        items={items}
                        isLoading={loading}
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
                        isLoading={loading}
                    />

                    <AddSalaryStructureModal
                        isOpen={isSalaryModalOpen}
                        teachers={teachers}
                        accountants={accountantBySchool}
                        onClose={() => setIsSalaryModalOpen(false)}
                        onSubmit={handleCreateSalaryStructure}
                        isLoading={isLoading}
                    />

                    <EditSalaryStructureModal
                        isOpen={isEditSalaryModalOpen}
                        teachers={teachers}
                        accountants={accountantBySchool}
                        onClose={() => {
                            setIsEditSalaryModalOpen(false);
                            setSelectedSalaryStructure(null);
                        }}
                        onSubmit={handleUpdateSalaryStructure}
                        salaryStructure={selectedSalaryStructure}
                        isLoading={loading}
                    />
                </main>
            </div>
        </div>
    );
}
