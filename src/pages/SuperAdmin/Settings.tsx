import { useState } from 'react';
import GeneralSettings from '../../components/SuperAdmin/settings/GeneralSettings';
import PaymentSettings from '../../components/SuperAdmin/settings/PaymentSettings';
import NotificationSettings from '../../components/SuperAdmin/settings/NotificationSettings';
import PermissionDefaults from '../../components/SuperAdmin/settings/PermissionDefaults';
import SupportConsoleSettings from '../../components/SuperAdmin/settings/SupportConsoleSettings';
import BackupDataSettings from '../../components/SuperAdmin/settings/BackUpDataSettings';
import SettingsTabs from '../../components/SuperAdmin/settings/SettingsTabs';
import { DashboardHeader } from '../../components/SuperAdmin/DashboardHeadert';
import { Sidebar } from '../../components/SuperAdmin/Sidebar';
export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralSettings />;
            case 'payment':
                return <PaymentSettings />;
            case 'notification':
                return <NotificationSettings />;
            case 'permission':
                return <PermissionDefaults />;
            case 'support':
                return <SupportConsoleSettings />;
            case 'backup':
                return <BackupDataSettings />;
            default:
                return <GeneralSettings />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content + Right Sidebar */}
            <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <div className="flex-1 p-8 overflow-y-auto">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-2">Manage your application settings and preferences</p>
                        </div>

                        {/* Settings Tabs */}
                        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

                        {/* Settings Content */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            {renderActiveTab()}
                        </div>
                </div>
            </div>
        </div>
    );
}