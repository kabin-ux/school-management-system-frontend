import AnalyticsOverview from "../../components/SuperAdmin/AnalyticsOverview";
import { DashboardHeader } from "../../components/SuperAdmin/DashboardHeadert";
import NotificationForm from "../../components/SuperAdmin/NotificationForm";
import NotificationInsights from "../../components/SuperAdmin/NotificationInsights";
import NotificationLog from "../../components/SuperAdmin/NotificationLog";
import { Sidebar } from "../../components/SuperAdmin/Sidebar";

function NotificationCenter() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content + Right Sidebar */}
            <div className="flex-1 flex flex-col">
                <DashboardHeader />

                {/* Center Content */}
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-auto">

                        <div className="max-w-7xl mx-auto space-y-4 py-8">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Notifications Centre</h1>
                                    <p className="text-gray-600 mt-2">
                                        Manage all communications sent to your schools and app users
                                    </p>
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                                    <span className="text-lg">+</span>
                                    Create Notification
                                </button>
                            </div>

                            {/* Notification Form */}
                            <NotificationForm />

                            {/* Notification Log */}
                            <NotificationLog />
                        </div>
                    </div>

                    {/* Right Analytics Sidebar */}
                    <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
                        <div className="space-y-6">
                            <AnalyticsOverview />
                            <NotificationInsights />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationCenter;
