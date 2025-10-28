interface StatCardProps {
    title: string;
    value: number | undefined;
    icon: React.ReactNode;
    bgColor: string;
}

export const StatsCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${bgColor}`}>
                    {icon}
                </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        </div>
    );
}