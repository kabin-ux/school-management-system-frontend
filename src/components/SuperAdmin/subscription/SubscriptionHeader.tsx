import { PlusIcon } from 'lucide-react'
import React from 'react'

interface SubscriptionHeaderProps {
    onAddSubscription: () => void;
}

export const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({ onAddSubscription }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscriptions</h1>
                <p className="text-gray-600">List of all subscription packages and click to view its detailed information.</p>
            </div>
            <div className='flex items-center'>
                <button className='flex items-center gap-2 w-max bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
                    onClick={onAddSubscription}
                >
                    <div>
                        <PlusIcon className='w-4 h-4' />
                    </div>
                    Add Subscription
                </button>
            </div>
        </div>
    )
}
