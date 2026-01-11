import React from 'react';
import { ArrowLeft, School, Unlink2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useRemoveSchoolFromSubscriptionMutation,
    useSubscriptionQuery,
    type RemoveSchoolFromSubscriptionDto,
} from '../../../hooks/useSubscription';
import Loading from '../../../common/Loading';
import { Sidebar } from '../layout/Sidebar';
import { DashboardHeader } from '../layout/DashboardHeader';
import toast from 'react-hot-toast';

export type SchoolOnSubscription = {
    id: string;
    name: string;
    school_code?: string | null;
    address?: string | null;
};

export const SubscriptionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: subscription,
        isLoading,
        isError,
        error,
    } = useSubscriptionQuery(id ?? '');

    const removeSchoolFromSubscription = useRemoveSchoolFromSubscriptionMutation();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/super-admin/subscription`)
    }
    const handleRemoveSchoolFromSubscription = async (data: RemoveSchoolFromSubscriptionDto) => {
        removeSchoolFromSubscription.mutate(data, {
            onSuccess: () => {
                toast.success('School removed from subscription successfully')
            },
        });
    };

    if (isLoading) return <Loading />;

    if (isError) {
        const message =
            (error as any)?.message || 'Failed to load subscription details.';
        return <p className="p-6 text-red-500">{message}</p>;
    }

    if (!subscription) {
        return <p className="p-6">No subscription data found.</p>;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />

                <div className="max-w-7xl mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={handleBack}
                            type="button"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>

                        <div className="flex flex-col md:flex-row md:items-center md:gap-3 flex-1">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {subscription.name}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Subscription ID: {subscription.id}
                                </p>
                            </div>

                            <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 md:mt-0">
                                {subscription.subscription_type}
                            </span>
                        </div>
                    </div>
                    {/* Main info */}
                    <div className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total fee:</span>
                                <span className="font-medium text-gray-900">
                                    Rs. {subscription.total_fee}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Maintenance fee:</span>
                                <span className="font-medium text-gray-900">
                                    Rs. {subscription.maintenance_fee || 0}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Discount:</span>
                                <span className="font-medium text-gray-900">
                                    Rs. {subscription.discount}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Created at:</span>
                                <span className="font-medium text-gray-900">
                                    {new Date(subscription.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Updated at:</span>
                                <span className="font-medium text-gray-900">
                                    {new Date(subscription.updatedAt).toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">Remarks:</span>
                                <p className="mt-1 text-gray-900">
                                    {subscription.remarks || 'No remarks'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Schools section */}
                    <div className="rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <School className="h-4 w-4 text-gray-500" />
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Linked schools
                                </h2>
                            </div>
                            <span className="text-xs text-gray-500">
                                {subscription.schools?.length ?? 0} school
                                {subscription.schools && subscription.schools.length === 1
                                    ? ''
                                    : 's'}
                            </span>
                        </div>

                        {!subscription.schools || subscription.schools.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                                No schools are currently linked to this subscription.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Code
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {subscription.schools.map((school) => (
                                            <tr key={school.id}>
                                                <td className="px-4 py-2 text-gray-900">
                                                    {school.school_code || '-'}
                                                </td>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    {school.name}
                                                </td>
                                                <td className="px-4 py-2 text-gray-600">
                                                    {school.address || '-'}
                                                </td>
                                                <td className="px-4 py-2 text-gray-600">
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveSchoolFromSubscription({
                                                                school_id: school.id,
                                                            })
                                                        }
                                                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
                                                    >
                                                        <Unlink2 className="w-3.5 h-3.5" />
                                                        <span>Remove school</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
