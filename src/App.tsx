import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/LandingPage/AdminLandingPage';
import UserLandingPage from './pages/LandingPage/UserLandingPage';
import NotificationCenter from './components/SuperAdmin/notifications/Notifications';
import PermissionManagement from './pages/SuperAdmin/permissions/PermissionManagement';
import SupportConsole from './pages/SuperAdmin/support/SupportConsole';
import SupportTicketDetailPage from './pages/SuperAdmin/support/details/SupportTicketDetail';
import PaymentsOverview from './pages/SuperAdmin/payments/PaymentsOverview';
import SchoolWisePayment from './pages/SuperAdmin/payments/details/SchoolWisePayment';
import PaymentDetails from './pages/SuperAdmin/payments/details/PaymentDetails';
import AdminDashboard from './pages/Admin/dashboard/Dashboard';
import TeacherManagement from './pages/Admin/teachers/TeacherManagement';
import StudentManagement from './pages/Admin/students/StudentManagement';
import ParentsManagement from './pages/Admin/parents/ParentManagement';
import TimetableManagement from './pages/Admin/timetable/TimetableManagement';
import ClassManagement from './pages/Admin/class/ClassManagement';
import AttendanceMonitoring from './pages/Admin/attendance/AttendanceMonitoring';
import Events from './pages/Admin/events/Events';
import AttendanceHistory from './pages/Admin/attendance/history/AttendanceHistory';
import FeeOverview from './pages/Admin/feeoverview/FeeOverview';
import FeeDetails from './pages/Admin/feeoverview/feedetails/FeeDetails';
import AdminSettings from './pages/Admin/settings/Settings';
import AdminSupportConsole from './pages/Admin/support/SupportConsole';
import AccountantManagement from './pages/Admin/accounts/AccountsManagement';
import AdminSupportTicketDetailPage from './pages/Admin/support/details/SupportConsoleDetails';
import AccountantDashboard from './pages/Accountant/dashboard/Dashboard';
import InvoicesPage from './pages/Accountant/invoices/InvoicePage';
import SuperAdminLoginPage from './pages/SuperAdmin/login/SuperAdminLoginPage';
import AdminLoginPage from './pages/Admin/login/AdminLoginPage';
import AccountantLoginPage from './pages/Accountant/login/AccountantLoginPage';
import FeeAndSalaryPage from './pages/Accountant/feeandsalary/FeeAndSalaryPage';
import SuperAdminDashboard from './pages/SuperAdmin/dashboard/Dashboard';
import { PartnerSchools } from './pages/SuperAdmin/partnerschools/PartnerSchools';
import PartnerSchoolDetails from './pages/SuperAdmin/partnerschools/details/PartnerSchoolDetails';
import SchoolPermissionDetailPage from './pages/SuperAdmin/permissions/details/SchoolPermissionDetail';
import ProtectedRoute from './auth/ProtectedRoute';
import UnauthorizedPage from './pages/Unauthorized';
import { Toaster } from 'react-hot-toast';
import { SuperAdminsPage } from './pages/SuperAdmin/superadmins/SuperAdminsPage';
import TransportationManagement from './pages/Admin/transportation/TransportationManagement';
import ClassDetails from './pages/Admin/class/details/ClassDetails';
import SubjectManagement from './pages/Admin/class/subjects/SubjectManagement';
import SalaryOverview from './pages/Admin/salaryoverview/SalaryOverview';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { ResetPassword } from './common/ResetPassword';
import { ResetPasswordAdmin } from './pages/Admin/login/ResetPasswordAdmin';

function App() {
    useEffect(() => {
        // WARNING: the client will NOT be able to connect!
        const socket = io("http://localhost:4000", {
            withCredentials: true,
        });

        socket.on("connect", () => (
            console.log("Socket connected:")
        ))

        socket.emit("message", {
            message: 'hello',
            receiver: "receiver_id",
            sender: "sender_id",
            senderName: "",
            receiverName: "",
            attachment: ""
        })
    }, [])

    return (
        <>
            <Router>
                <Toaster />
                <Routes>
                    <Route path='/' element={<UserLandingPage />} />
                    <Route path='/admin' element={<AdminLandingPage />} />
                    <Route path='/super-admin-login' element={<SuperAdminLoginPage />} />
                    <Route path='/admin-login' element={<AdminLoginPage />} />
                    <Route path='/accountant-login' element={<AccountantLoginPage />} />
                    <Route path='/unauthorized' element={<UnauthorizedPage />} />
                    <Route path='/super-admin/reset-password' element={<ResetPassword />} />
                    <Route path='/school-admin/reset-password' element={<ResetPasswordAdmin />} />

                    {/* Super Admin */}
                    <Route path='/super-admin/dashboard' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SuperAdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/partner-schools' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <PartnerSchools />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/partner-schools/details/:id' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <PartnerSchoolDetails />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/payments' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <PaymentsOverview />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/payments/schools' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SchoolWisePayment />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/payments/schools/details' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <PaymentDetails />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/notifications' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <NotificationCenter />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/permissions' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <PermissionManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/permissions/details/:id' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SchoolPermissionDetailPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/support' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SupportConsole />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/support/details/:id' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SupportTicketDetailPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/super-admins' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SuperAdminsPage />
                        </ProtectedRoute>
                    } />

                    {/* Admin */}
                    <Route path='/admin/dashboard' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/student-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <StudentManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/parent-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ParentsManagement />
                        </ProtectedRoute>

                    } />
                    <Route path='/admin/teacher-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <TeacherManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/timetable-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <TimetableManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/class-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ClassManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/class-management/details/:id' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ClassDetails />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/class-management/subject/:id' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <SubjectManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/transportation-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <TransportationManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/attendance-monitoring' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AttendanceMonitoring />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/attendance-monitoring/history/:id' element={<AttendanceHistory />} />
                    <Route path='/admin/event' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Events />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/fee-overview' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <FeeOverview />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/salary-overview' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <SalaryOverview />
                        </ProtectedRoute>
                    } />

                    <Route path='/admin/fee-overview/details/:id' element={<FeeDetails />} />
                    <Route path='/admin/account-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AccountantManagement />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/support' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminSupportConsole />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/support/details/:id' element={<AdminSupportTicketDetailPage />} />
                    <Route path='/admin/settings' element={<AdminSettings />} />

                    {/* Accountant */}
                    <Route path='/accountant/dashboard' element={
                        <ProtectedRoute allowedRoles={['accountant']}>
                            <AccountantDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='/accountant/fee-salary' element={
                        <ProtectedRoute allowedRoles={['accountant']}>
                            <FeeAndSalaryPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/accountant/invoices' element={
                        <ProtectedRoute allowedRoles={['accountant']}>
                            <InvoicesPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router >
        </>
    );
}

export default App;