import type { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            {icon && <div className="mb-4 text-gray-400">{icon}</div>}
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {description && <p className="mt-2 text-gray-500 text-sm max-w-md">{description}</p>}
        </div>
    );
}
