import React from "react";
import {
  LayoutDashboard,
  School,
  CreditCard,
  Bell,
  Shield,
  HeadphonesIcon,
  Settings,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/super-admin/dashboard" },
  { icon: School, label: "Partner Schools", path: "/super-admin/partner-schools" },
  { icon: CreditCard, label: "Payments", path: "/super-admin/payments" },
  { icon: Bell, label: "Notifications Log", path: "/super-admin/notifications" },
  { icon: Shield, label: "Permissions", path: "/super-admin/permissions" },
  { icon: HeadphonesIcon, label: "Support Console", path: "/super-admin/support" },
  { icon: Settings, label: "Settings", path: "/super-admin/settings" },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Super Admin</span>
        </div>
      </div>

      <nav className="px-6 space-y-6">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
