import React, { useState } from "react";
import { X } from "lucide-react";
import type { Teacher } from "../../../../types/teacher.types";
import type { SalaryStructureForm } from "../../../../types/fee-salary.types";
import type { Accountant } from "../../../../types/accountant-dashboard.types";

interface SalaryStructureModalProps {
    isOpen: boolean;
    teachers: Teacher[];
    accountants: Accountant[];
    onClose: () => void;
    onSubmit: (feeData: SalaryStructureForm) => void;
    isLoading: boolean;
}

export const AddSalaryStructureModal: React.FC<SalaryStructureModalProps> = ({
    isOpen,
    teachers,
    accountants,
    onClose,
    onSubmit,
    isLoading
}) => {
    const [formData, setFormData] = useState<SalaryStructureForm>({
        employee_id: "",
        basic: 0,
        allowances: 0,
        role: "",
        remarks: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const staffs = [teachers, accountants].flat();

    const roles = [
        { key: "Teacher", value: "teacher" },
        { key: "Accountant", value: "accountant" },
        { key: "Staff", value: "staff" }
    ];

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["basic", "allowances"].includes(name) ? Number(value) : value,

        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.employee_id) newErrors.employee_id = "Employee is required";
        if (!formData.basic) newErrors.basic = "Basic salary is required";
        if (formData.basic <= 0) newErrors.basic = "Basic salary must be greater than 0";
        if (formData.allowances <= 0) newErrors.allowances = "Allowances must be greater than 0";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (isLoading) return;
        // console.log("form", formData)

        if (validateForm()) {
            onSubmit(formData);
            console.log("form", formData)

            setFormData({
                employee_id: "",
                basic: 0,
                allowances: 0,
                role: "",
                remarks: ""
            });
            setErrors({});
            onClose();
        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Create Salary Structure</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Employee Name <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="employee_id"
                                value={formData.employee_id}
                                onChange={handleInputChange}
                                className={`w-full border rounded px-3 py-2 ${errors.employee_id ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select staff</option>
                                {staffs?.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.firstName} {staff.lastName} - {staff.role}
                                    </option>
                                ))}
                            </select>
                            {errors.employee_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
                            )}
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Basic Salary  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="basic"
                                value={formData.basic}
                                onChange={handleInputChange}
                                className={`w-full border rounded px-3 py-2 ${errors.basic ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.basic && (
                                <p className="mt-1 text-sm text-red-600">{errors.basic}</p>
                            )}
                        </div>
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            className={`w-full border rounded px-3 py-2 ${errors.remarks ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.remarks && (
                            <p className="mt-1 text-sm text-red-600">{errors.remarks}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Saving Salary Structure...
                            </div>
                        ) : (
                            'Save Salary Structure'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
