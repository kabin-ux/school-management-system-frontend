import React, { useState } from "react";
import {
  LayoutDashboard,
  School,
  HeadphonesIcon,
  LogOut,
  ShieldUser,
  Menu,
  X,
  DollarSign,
  PackageCheck,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import type { SidebarItem } from "../../../types/sidebar-item.types";
import { useLogoutSuperAdmin } from "../../../hooks/useAuth";

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/super-admin/dashboard" },
  { icon: School, label: "Partner Schools", path: "/super-admin/partner-schools" },
  { icon: HeadphonesIcon, label: "Support Console", path: "/super-admin/support" },
  { icon: ShieldUser, label: "Super Admins", path: "/super-admin/super-admins" },
  { icon: PackageCheck, label: "Subscription", path: "/super-admin/subscription" },
  { icon: DollarSign, label: "Invoice", path: "/super-admin/invoice" },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logoutMutation = useLogoutSuperAdmin();
  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/admin"); // Redirect to login page
  };

  return (

    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 bg-opacity-100 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>      {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Super Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 space-y-6 flex-1 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive
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

        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};
