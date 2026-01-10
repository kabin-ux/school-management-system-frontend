import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import { useSchools } from '../../../hooks/useSchools';
import { PartnerSchoolFilter } from '../../../components/SuperAdmin/partnerschools/PartnerSchoolFilter';
import { SubscriptionTable } from '../../../components/SuperAdmin/subscription/SubscriptionTable';
import { SubscriptionHeader } from '../../../components/SuperAdmin/subscription/SubscriptionHeader';
import { useAddSchoolOnSubscriptionMutation, useCreateSubscriptionMutation, useDeleteSubscriptionMutation, useSubscriptionsQuery, useUpdateSubscriptionMutation, type Subscription } from '../../../hooks/useSubscription';
import { AddSubscriptionModal } from '../../../components/SuperAdmin/subscription/CreateSubscriptionModal';
import { AddSchoolSubscriptionModal } from '../../../components/SuperAdmin/subscription/AddSchoolSubscriptionModal';
import { EditSubscriptionModal } from '../../../components/SuperAdmin/subscription/EditSubscriptionModal';

export interface FilterValues {
    status: string;
    search: string;
}

export const Subscriptions: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        status: '',
        search: ''
    });
    const [isAddSchoolSubscriptionModalOpen, setIsAddSchoolSubscriptionModalOpen] = useState(false);
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

    const { data: schools = [] } = useSchools();
    const { data: subscriptions = [], isLoading: loading } = useSubscriptionsQuery();
    const createSubscription = useCreateSubscriptionMutation();
    const addSchoolOnSubscription = useAddSchoolOnSubscriptionMutation();
    const updateSubscriptionMutation = useUpdateSubscriptionMutation();
    const deleteSubscriptionMutation = useDeleteSubscriptionMutation();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewSubscriptionDetails = (subscriptionId: string) => {
        navigate(`/super-admin/subscription/details/${subscriptionId}`)
    };

    const handleCreateSubscription = async (subscriptionData: any) => {
        createSubscription.mutate(subscriptionData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleUpdateSubscription = async (subscriptionData: any) => {
        updateSubscriptionMutation.mutate(subscriptionData, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteSubscription = async (subscriptionId: any) => {
        deleteSubscriptionMutation.mutate(subscriptionId, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleAddSchoolOnSubscription = async (data: any) => {
        addSchoolOnSubscription.mutate(data, {
            onSuccess: () => {
                setIsAddSchoolSubscriptionModalOpen(false);
                setSelectedSubscriptionId(null);
            },
        });
    };

    // Filtered students based on current filters
    const filteredSchools = useMemo(() => {
        return subscriptions.filter((subscription: Subscription) => {
            const fullName = `${subscription?.name || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesStatus = !filters.status;

            return matchesSearch && matchesStatus;
        });
    }, [subscriptions, filters]);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />

                <div className="flex-1 overflow-auto">
                    <div className="p-8">
                        <SubscriptionHeader
                            onAddSubscription={() => setIsModalOpen(true)}
                        />
                        <PartnerSchoolFilter
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        <SubscriptionTable
                            subscriptions={filteredSchools}
                            onViewSubscriptionDetails={handleViewSubscriptionDetails}
                            onAddSchoolSubscription={(subscription_id: string) => {
                                setIsAddSchoolSubscriptionModalOpen(true)
                                setSelectedSubscriptionId(subscription_id)
                            }}
                            onEdit={(subscription: Subscription) => {
                                setIsEditModalOpen(true)
                                setSelectedSubscription(subscription)
                            }}
                            onDelete={handleDeleteSubscription}
                        />

                        <AddSubscriptionModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleCreateSubscription}
                            isLoading={loading}
                        />

                        {selectedSubscriptionId && (
                            <AddSchoolSubscriptionModal
                                isOpen={isAddSchoolSubscriptionModalOpen}
                                onClose={() => {
                                    setIsAddSchoolSubscriptionModalOpen(false);
                                    setSelectedSubscriptionId(null);
                                }}
                                onSubmit={handleAddSchoolOnSubscription}
                                isLoading={loading}
                                schools={schools}
                                subscriptionId={selectedSubscriptionId}
                            />
                        )}

                        <EditSubscriptionModal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            subscription={selectedSubscription}
                            onSubmit={handleUpdateSubscription}
                            isLoading={loading}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};