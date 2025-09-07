import { Download } from 'lucide-react';
import { useFeeSalary } from '../../../hooks/useFeeSalary';
import type { Student, Teacher } from '../../../types/fee-salary.types';
import { FilterSection } from '../../../components/Accountant/feesandsalary/FilterSection';
import { StudentDetailView } from '../../../components/Accountant/feesandsalary/StudentDetailView';
import { DataTable } from '../../../components/Accountant/feesandsalary/DataTable';
import { AccountantDashboardHeader } from '../../../components/Accountant/layout/DashboardHeader';
import { Sidebar } from '../../../components/Accountant/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { getMySchoolFeesStructures } from '../../../features/feesSlice';

export default function FeeAndSalaryPage() {
    const dispatch = useAppDispatch();
    const {fees} = useAppSelector(state => state.fees)

    useEffect(() => {
        dispatch(getMySchoolFeesStructures())
    })

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
        handleStudentSelect,
        handleTabChange,
        handleFilterChange,
        setPaymentAmount,
        setPaymentType,
        setFeeCategory,
        setAdditionalNotes,
        resetPaymentForm,
        setSelectedStudent
    } = useFeeSalary();

    // Mock data - replace with actual API calls
    const students: Student[] = [
        { id: 'TC-001', name: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', dueAmount: 'Rs 30,000', status: 'Paid' },
        { id: 'TC-002', name: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', dueAmount: 'Rs 30,000', status: 'Unpaid' },
        { id: 'TC-003', name: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', dueAmount: 'Rs 30,000', status: 'Pending' },
        // ... more students
    ];

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
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download report
                        </button>
                    </div>

                    <FilterSection
                        activeView={activeView}
                        filters={filters}
                        onViewChange={handleViewChange}
                        onFilterChange={handleFilterChange}
                    />

                    <DataTable
                        activeView={activeView}
                        students={students}
                        teachers={teachers}
                        onRowClick={handleStudentSelect}
                    />
                </main>
            </div>
        </div>
    );
}
