import React from 'react';
import type { PaymentHistoryItem, TabType, StudentProfile as StudentProfileType } from '../../../types/fee-salary.types';
import { FeeStructure } from './FeeStructure';
import { PaymentHistory } from './PaymentHistory';
import { AddPayment } from './AddPayment';
import { StudentProfile } from './StudentProfile';
import { PaymentTabs } from './PaymentTabs';
import { StudentNotes } from './StudentNotes';

interface StudentDetailViewProps {
    activeTab: TabType;
    paymentAmount: string;
    paymentType: string;
    feeCategory: string;
    additionalNotes: string;
    onTabChange: (tab: TabType) => void;
    onPaymentAmountChange: (amount: string) => void;
    onPaymentTypeChange: (type: string) => void;
    onFeeCategoryChange: (category: string) => void;
    onAdditionalNotesChange: (notes: string) => void;
    onSubmitPayment: () => void;
    onClearPayment: () => void;
}

export const StudentDetailView: React.FC<StudentDetailViewProps> = ({
    activeTab,
    paymentAmount,
    paymentType,
    feeCategory,
    additionalNotes,
    onTabChange,
    onPaymentAmountChange,
    onPaymentTypeChange,
    onFeeCategoryChange,
    onAdditionalNotesChange,
    onSubmitPayment,
    onClearPayment
}) => {
    const studentProfile: StudentProfileType = {
        id: 'TC214054',
        name: 'Manish Pandey',
        phone: '9845484548',
        class: '12',
        email: 'manishpandey32@gmail.com',
        parentName: 'Ramesh Pandey',
        parentRelation: 'Father',
        parentPhone: '9845785864',
        parentEmail: 'Rameshpandey32@gmail.com'
    };

    const paymentHistory: PaymentHistoryItem[] = [
        { date: 'Dec 15, 2024', amount: '$10000.00', method: 'E-online', description: 'Tuition Fee - Partial Payment', status: 'Paid' },
        { date: 'Dec 16, 2024', amount: '$10000.00', method: 'E-online', description: 'Tuition Fee - Partial Payment', status: 'Paid' },
        { date: 'Dec 20, 2024', amount: '$10000.00', method: 'E-online', description: 'Tuition Fee - Partial Payment', status: 'Paid' },
        { date: 'Dec 16, 2024', amount: '$10000.00', method: 'E-online', description: 'Tuition Fee - Partial Payment', status: 'Paid' },
        { date: 'Dec 16, 2024', amount: '$10000.00', method: 'E-online', description: 'Tuition Fee - Partial Payment', status: 'Paid' },
        { date: 'Dec 2, 2024', amount: '$10000.00', method: 'E-online', description: 'Tuition Fee - Partial Payment', status: 'Paid' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Fee Structure':
                return <FeeStructure />;
            case 'Payment History':
                return <PaymentHistory payments={paymentHistory} />;
            case 'Add Payment':
                return (
                    <AddPayment
                        paymentAmount={paymentAmount}
                        paymentType={paymentType}
                        feeCategory={feeCategory}
                        additionalNotes={additionalNotes}
                        onPaymentAmountChange={onPaymentAmountChange}
                        onPaymentTypeChange={onPaymentTypeChange}
                        onFeeCategoryChange={onFeeCategoryChange}
                        onAdditionalNotesChange={onAdditionalNotesChange}
                        onSubmit={onSubmitPayment}
                        onClear={onClearPayment}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Student Profile */}
            <StudentProfile profile={studentProfile} />

            {/* Right Column - Payment Details */}
            <div className="lg:col-span-2 space-y-6">
                {/* Student Header */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Ramesh Pandey</h3>
                            <p className="text-gray-600">Grade 12A • Roll 20240012A • Phone: 9841712546</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Fee</p>
                            <p className="text-2xl font-bold text-blue-600">$4500.00</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                            <p className="text-2xl font-bold text-green-600">$4500.00</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Remaining Balance</p>
                            <p className="text-2xl font-bold text-red-600">$0.00</p>
                        </div>
                    </div>
                </div>

                {/* Payment Tabs */}
                <PaymentTabs activeTab={activeTab} onTabChange={onTabChange}>
                    {renderTabContent()}
                </PaymentTabs>

                {/* Student Notes */}
                <StudentNotes />
            </div>
        </div>
    );
};
