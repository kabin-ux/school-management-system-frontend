import { useState, useCallback } from 'react';
import type { ViewType, TabType, FilterOptions } from '../types/fee-salary.types';

export const useFeeSalary = () => {
  const [activeView, setActiveView] = useState<ViewType>('Student');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('Fee Structure');
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    classOrRole: ''
  });

  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('Partial Payment');
  const [feeCategory, setFeeCategory] = useState('Tuition Fee');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleViewChange = useCallback((view: ViewType) => {
    setActiveView(view);
    setSelectedStudent(null);
  }, []);

  const handleStudentSelect = useCallback((studentId: string) => {
    setSelectedStudent(studentId);
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  

  const resetPaymentForm = useCallback(() => {
    setPaymentAmount('');
    setPaymentType('Partial Payment');
    setFeeCategory('Tuition Fee');
    setAdditionalNotes('');
  }, []);

  return {
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
  };
};
