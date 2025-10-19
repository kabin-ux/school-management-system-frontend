import { Banknote } from 'lucide-react';
import { useFeeSalary } from '../../../hooks/useFeeSalary';
import type { FeeStructureAttributes, Salary, SalaryStructureForm } from '../../../types/fee-salary.types';
import { FilterSection } from '../../../components/Accountant/feesandsalary/FilterSection';
import { StudentDetailView } from '../../../components/Accountant/feesandsalary/StudentDetailView';
import { DataTable } from '../../../components/Accountant/feesandsalary/DataTable';
import { AccountantDashboardHeader } from '../../../components/Accountant/layout/DashboardHeader';
import { Sidebar } from '../../../components/Accountant/layout/Sidebar';
import { useMemo, useState } from 'react';
import { AddFeeStructureModal, type FeeStructureForm } from '../../../components/Accountant/feesandsalary/AddFeeStructureModal';
import EditFeeStructureModal from '../../../components/Accountant/feesandsalary/EditFeeStructureModal';
import { AddSalaryStructureModal } from '../../../components/Accountant/feesandsalary/salary/AddSalaryStructureModal';
import EditSalaryStructureModal from '../../../components/Accountant/feesandsalary/salary/EditSalaryStructureModal';
import { useClasses } from '../../../hooks/useClasses';
import { useTeachers } from '../../../hooks/useTeachers';
import { useAddFeeStructure, useDeleteFeeStructure, useMySchoolFeesStructures, useUpdateFeeStructure } from '../../../hooks/useFees';
import { useCreateSalaryStructure, useDeleteSalaryStructure, useMySchoolSalaryStructures, useUpdateSalaryStructure } from '../../../hooks/useSalary';
import { useAllTransportation } from '../../../hooks/useTransportation';
import { useAllAccountantsBySchool } from '../../../hooks/useAccountant';

export default function FeeAndSalaryPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditSalaryModalOpen, setIsEditSalaryModalOpen] = useState(false);
    const [selectedFeeStructure, setSelectedFeeStructure] = useState<FeeStructureAttributes | null>(null);
    const [selectedSalaryStructure, setSelectedSalaryStructure] = useState<Salary | null>(null);

    const { data: feeStructures = [], isLoading: loading } = useMySchoolFeesStructures();
    const addFeeStructureMutation = useAddFeeStructure();
    const updateFeeStructureMutation = useUpdateFeeStructure();
    const deleteFeeStructureMutation = useDeleteFeeStructure();


    const { data: salaryStructures = [], isLoading } = useMySchoolSalaryStructures();
    const addSalaryStructureMutation = useCreateSalaryStructure();
    const updateSalaryStructureMutation = useUpdateSalaryStructure();
    const deleteSalaryStructureMutation = useDeleteSalaryStructure();

    const { data: classes = [] } = useClasses();
    const { data: transportations = [] } = useAllTransportation();
    const { data: teachers = [] } = useTeachers();
    const { data: accountantBySchool = [] } = useAllAccountantsBySchool();

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

    const handleCreateFeeStructure = async (feeData: FeeStructureForm) => {
        addFeeStructureMutation.mutate(feeData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleCreateSalaryStructure = async (salaryData: SalaryStructureForm) => {
        addSalaryStructureMutation.mutate(salaryData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditFeeStructureData = (feeStructure: FeeStructureAttributes) => {
        setIsEditModalOpen(true);
        setSelectedFeeStructure(feeStructure);
    }

    const handleUpdateFeeStructure = async (id: string, feeStructureData: any) => {
        updateFeeStructureMutation.mutate({ id, feeStructureData }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleEditSalaryStructureData = (salaryStructure: Salary) => {
        setIsEditSalaryModalOpen(true);
        setSelectedSalaryStructure(salaryStructure);
    }

    const handleUpdateSalaryStructure = async (id: string, data: SalaryStructureForm) => {
        updateSalaryStructureMutation.mutate({ id, data }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteFeeStructureData = async (feeStructureId: string) => {
        deleteFeeStructureMutation.mutate(feeStructureId);
    }

    const handleDeleteSalaryStructureData = async (salaryStructureId: string) => {
        deleteSalaryStructureMutation.mutate(salaryStructureId)
    }

    // Filtered fees structure based on current filters
    const filteredFeeStructure = useMemo(() => {
        return feeStructures.filter((feeStructure: FeeStructureAttributes) => {
            const fullName = `${feeStructure?.class?.name || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesClass = !filters.classOrRole || feeStructure.class?.name === filters.classOrRole;

            return matchesSearch && matchesClass;
        });
    }, [feeStructures, filters]);

    // Filtered students based on current filters
    const filteredSalaryStructure = useMemo(() => {
        return salaryStructures.filter((salaryStructure: Salary) => {
            const textinput = `${salaryStructure?.teacherEmployee?.firstName || ""} ${salaryStructure?.teacherEmployee?.lastName || ""} ${salaryStructure?.accountantEmployee?.firstName || ""} ${salaryStructure?.accountantEmployee?.lastName || ""}`.toLowerCase();
            const matchesSearch = textinput.includes(filters.search.toLowerCase());
            const matchesRole = !filters.classOrRole || salaryStructure.role === filters.classOrRole;

            return matchesSearch && matchesRole;
        });
    }, [salaryStructures, filters]);

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
                    classes={classes}
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
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <AccountantDashboardHeader />

                {/* Scrollable Content */}
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    {/* Page Title and Action */}
                    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Fee and Salary
                            </h1>
                            <p className="text-gray-600 mt-1 text-sm sm:text-base">
                                Manage student fees, staff salary, payments, and receipts
                            </p>
                        </div>

                        <button
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                            onClick={() => {
                                if (activeView === "Student") {
                                    setIsModalOpen(true);
                                } else {
                                    setIsSalaryModalOpen(true);
                                }
                            }}
                        >
                            <Banknote className="h-4 w-4 mr-2" />
                            {activeView === "Student"
                                ? "Create Fee Structure"
                                : "Create Salary Structure"}
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 overflow-x-auto">
                        <FilterSection
                            classes={classes}
                            activeView={activeView}
                            filters={filters}
                            onViewChange={handleViewChange}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                        <DataTable
                            activeView={activeView}
                            students={filteredFeeStructure}
                            teachers={filteredSalaryStructure}
                            onEdit={handleEditFeeStructureData}
                            onDelete={handleDeleteFeeStructureData}
                            onEditSalary={handleEditSalaryStructureData}
                            onDeleteSalary={handleDeleteSalaryStructureData}
                        />
                    </div>

                    {/* Fee Structure Modals */}
                    <AddFeeStructureModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateFeeStructure}
                        classes={classes}
                        items={transportations}
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
                        transportOptions={transportations}
                        isLoading={loading}
                    />

                    {/* Salary Structure Modals */}
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
