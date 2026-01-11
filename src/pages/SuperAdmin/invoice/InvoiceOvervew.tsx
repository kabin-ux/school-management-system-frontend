import React, { useMemo, useState } from "react";
import { InvoiceOverviewHeader } from "../../../components/SuperAdmin/invoice/InvoiceOverviewHeader";
import { InvoiceOverviewFilters } from "../../../components/SuperAdmin/invoice/InvoiceOverviewFilters";
import { InvoiceOverviewTable } from "../../../components/SuperAdmin/invoice/InvoiceOverviewTable";
import {
  useClearSubscriptionPaymentMutation,
  useSubscriptionPaymentsQuery,
  useUpdateSubscriptionPaymentStatusMutation,
  type PartnerSchoolPayment,
  type PartnerPaymentStatus,
  type PartnerPaymentMethod,
} from "../../../hooks/useSubscriptionPayment";
import toast from "react-hot-toast";
import { Sidebar } from "../../../components/SuperAdmin/layout/Sidebar";
import { DashboardHeader } from "../../../components/SuperAdmin/layout/DashboardHeader";
import { EditStatusModal } from "../../../components/SuperAdmin/invoice/EditStatusModal";

export interface FilterValues {
  search: string;
}

const InvoiceOverview: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
  });

  const [selectedPayment, setSelectedPayment] =
    useState<PartnerSchoolPayment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: invoices = [] } = useSubscriptionPaymentsQuery();
  const clearSubscriptionPaymentMutation = useClearSubscriptionPaymentMutation();
  const updateSubscriptionPaymentStatusMutation =
    useUpdateSubscriptionPaymentStatusMutation();

  const handleUpdateSubscriptionPaymentStatus = async (form: {
    status: PartnerPaymentStatus;
    method: PartnerPaymentMethod;
    remarks?: string;
  }) => {
    if (!selectedPayment) return;

    updateSubscriptionPaymentStatusMutation.mutate(
      {
        id: selectedPayment.id,
        status: form.status,
        method: form.method,
        remarks: form.remarks,
      },
      {
        onSuccess: () => {
          toast.success("Payment status updated successfully");
          setIsEditModalOpen(false);
          setSelectedPayment(null);
        },
        onError: () => {
          toast.error("Failed to update payment status");
        },
      },
    );
  };

  const handleClearSubscriptionPayment = async (schoolId: string) => {
    clearSubscriptionPaymentMutation.mutate(schoolId, {
      onSuccess: () => {
        toast.success("Subscription payment cleared successfully");
      },
      onError: () => {
        toast.error("Failed to clear subscription payment");
      },
    });
  };

  const filteredPayments = useMemo(() => {
    return invoices.filter((invoice: PartnerSchoolPayment) => {
      const textinput = `${invoice?.subscription?.name || ""}`.toLowerCase();
      const matchesSearch = textinput.includes(filters.search.toLowerCase());
      return matchesSearch;
    });
  }, [invoices, filters]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <InvoiceOverviewHeader />

          {/* Filters */}
          <InvoiceOverviewFilters
            filters={filters}
            onFiltersChange={(values) => setFilters(values)}
          />

          {/* Table */}
          <InvoiceOverviewTable
            payments={filteredPayments}
            onEditStatus={(payment) => {
              setSelectedPayment(payment);
              setIsEditModalOpen(true);
            }}
            onClear={handleClearSubscriptionPayment}
          />
        </main>
      </div>

      <EditStatusModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPayment(null);
        }}
        onSubmit={handleUpdateSubscriptionPaymentStatus}
        isLoading={updateSubscriptionPaymentStatusMutation.isPending}
        payment={selectedPayment}
      />
    </div>
  );
};

export default InvoiceOverview;
