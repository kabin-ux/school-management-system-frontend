import React from "react";
import {
  LayoutDashboard,
  HeadphonesIcon,
  Settings,
  GraduationCap,
  Users,
  User,
  CalendarClock,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Calendar,
  Wallet,
  UserCog,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import type { SidebarItem } from "../../../types/sidebar-item.types";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../features/authSlice";

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: GraduationCap, label: "Student Management", path: "/admin/student-management" },
  { icon: Users, label: "Teacher Management", path: "/admin/teacher-management" },
  { icon: User, label: "Parents Management", path: "/admin/parent-management" },
  { icon: CalendarClock, label: "Timetable", path: "/admin/timetable-management" },
  { icon: BookOpen, label: "Class Management", path: "/admin/class-management" },
  { icon: ClipboardList, label: "Attendance Monitoring", path: "/admin/attendance-monitoring" },
  { icon: MessageSquare, label: "Communication", path: "/admin/communication" },
  { icon: Calendar, label: "Event", path: "/admin/event" },
  { icon: Wallet, label: "Fee Overview", path: "/admin/fee-overview" },
  { icon: UserCog, label: "Account Management", path: "/admin/account-management" },
  { icon: HeadphonesIcon, label: "Support Console", path: "/admin/support" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin"); // Redirect to login page
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Admin</span>
        </div>
      </div>

      <nav className="px-6 space-y-6 flex-1">
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
  );
};
