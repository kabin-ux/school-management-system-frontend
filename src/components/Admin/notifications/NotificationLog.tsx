import { NotificationLogTable } from './NotificationLogTable';
import type { Notice } from '../../../hooks/useNotification';

interface NotificationLogProps {
    notices: Notice[];
    onDeleteNotice: (id: string) => void;
}

export const NotificationLog: React.FC<NotificationLogProps> = ({ notices, onDeleteNotice }) => {

    return (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Log</h2>

            <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search parameters..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <NotificationLogTable
                logs={notices}
                onDelete={onDeleteNotice}
            />
        </div>
    );
}
