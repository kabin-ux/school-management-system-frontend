import { DashboardHeader } from "../../components/SuperAdmin/DashboardHeadert";
import PermissionStats from "../../components/SuperAdmin/permissions/PermissionStats";
import SchoolPermissionTable from "../../components/SuperAdmin/permissions/SchoolPermissionTable";
import { Sidebar } from "../../components/SuperAdmin/Sidebar";


export default function PermissionManagement() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />

                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Permission Management</h1>
                            <p className="text-gray-600 mt-2">View and Edit the permission for admins and accountants of partnered schools</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <PermissionStats />

                    {/* School Permission Table */}
                    <SchoolPermissionTable />
                </div>
            </div>
        </div>
    );
}