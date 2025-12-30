import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

export interface Role {
    id: string;
    name: string;
    school_id: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (roleData: Role) => Promise<void> | void;
    isLoading: boolean;
}

export const AddRoleModal: React.FC<RoleModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<Role>({
        mode: "onChange",
        defaultValues: {
            name: "",
        },
    });

    const onFormSubmit = async (data: Role) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error("Form submission error:", error);
            setError("root", {
                message: "Failed to add role. Please try again.",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Add New Role
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role Name *
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Role name is required",
                            })}
                            disabled={isLoading || isSubmitting}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.name
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}
                            placeholder="Enter role name"
                            aria-invalid={!!errors.name}
                        />

                        {errors.name && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {errors.root && (
                        <p className="text-sm text-red-600" role="alert">
                            {errors.root.message}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading || isSubmitting}
                        className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2
                            ${isLoading || isSubmitting
                                ? "bg-blue-400 cursor-not-allowed text-white"
                                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }
                        `}
                    >
                        {isLoading || isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                Adding Role...
                            </>
                        ) : (
                            "Add Role"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
