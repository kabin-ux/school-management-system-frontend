import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Salary, SalaryStructureForm } from '../../../../types/fee-salary.types';
import type { Teacher } from '../../../../types/teacher.types';
import type { Accountant } from '../../../../types/accountant-dashboard.types';

interface EditSalaryStructureModalProps {
    isOpen: boolean;
    teachers: Teacher[];
    accountants: Accountant[];
    onClose: () => void;
    onSubmit: (id: string, updates: SalaryStructureForm) => void;
    salaryStructure: Salary | null;
    isLoading?: boolean;
}

const EditSalaryStructureModal: React.FC<EditSalaryStructureModalProps> = ({
    isOpen,
    teachers,
    accountants,
    onClose,
    onSubmit,
    salaryStructure,
    isLoading,
}) => {
    const [formData, setFormData] = useState<SalaryStructureForm>({
        employee_id: "",
        basic: 0,
        allowances: 0,
        role: "",
        remarks: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen && salaryStructure) {
            setFormData({
                employee_id: salaryStructure.employee_id,
                basic: salaryStructure.basic,
                allowances: salaryStructure.allowances,
                role: salaryStructure.role,
                remarks: salaryStructure.remarks
            });
            setErrors({});
        }
    }, [isOpen, salaryStructure]);

    const staffs = [teachers, accountants].flat();

    const roles = [
        { key: "Teacher", value: "teacher" },
        { key: "Accountant", value: "accountant" },
        { key: "Staff", value: "staff" }
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (
                [
                    "basic",
                    "allowances",
                ].includes(name)
            ) {
                return { ...prev, [name]: value === "" ? 0 : Number(value) }; // force number
            }

            return { ...prev, [name]: value };
        });

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };


    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.employee_id) newErrors.employee_id = "Class is required";
        if (!formData.basic) newErrors.basic = "Basic salary is required";
        if (formData.basic <= 0) newErrors.basic = "Basic salary must be greater than 0";
        if (formData.allowances <= 0) newErrors.allowances = "Allowances must be greater than 0";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm() && salaryStructure) {
            // Coerce numeric fields to numbers before sending
            const payload: SalaryStructureForm = {
                ...formData,
                employee_id: formData.employee_id,
                basic: Number(formData.basic),
                allowances: Number(formData.allowances),
                role: formData.role,
                remarks: formData.remarks
            };
            onSubmit(salaryStructure.id, payload);
            onClose();
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h2 className="text-lg font-semibold">Edit Fee Structure</h2>
                    <button onClick={onClose} disabled={isLoading}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Employee Name *</label>
                            <select
                                name="employee_id"
                                value={formData.employee_id}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-lg"
                            >
                                <option value="">Select Employee</option>
                                {staffs?.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.firstName} {staff.lastName} -
                                    </option>
                                ))}
                            </select>
                            {errors.class_id && <p className="text-xs text-red-500">{errors.class_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Basic Salary  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="basic"
                                value={formData.basic}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 ${errors.basic ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.basic && (
                                <p className="mt-1 text-sm text-red-600">{errors.basic}</p>
                            )}
                        </div>

                        {/* Allowance */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Allowance  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="allowances"
                                value={formData.allowances}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 ${errors.allowances ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.allowances && (
                                <p className="mt-1 text-sm text-red-600">{errors.allowances}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Employee Role  <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role ? String(formData.role) : ""}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 ${errors.role ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.key} value={role.value}>
                                        {role.key}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remarks  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 ${errors.remarks ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.remarks && (
                                <p className="mt-1 text-sm text-red-600">{errors.remarks}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {isLoading ? 'Updating...' : 'Update Fee Structure'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSalaryStructureModal;
