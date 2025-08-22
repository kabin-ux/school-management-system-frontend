import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/LandingPage/AdminLandingPage';
import UserLandingPage from './pages/LandingPage/UserLandingPage';
import NotificationCenter from './components/SuperAdmin/notifications/Notifications';
import PermissionManagement from './pages/SuperAdmin/permissions/PermissionManagement';
import SupportConsole from './pages/SuperAdmin/support/SupportConsole';
import SupportTicketDetailPage from './pages/SuperAdmin/support/details/SupportTicketDetail';
import Settings from './pages/SuperAdmin/settings/Settings';
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
import Communication from './pages/Admin/communication/Communication';
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
import SettingsPage from './pages/Accountant/settings/SettingsPage';
import SuperAdminLoginPage from './pages/SuperAdmin/login/SuperAdminLoginPage';
import AdminLoginPage from './pages/Admin/login/AdminLoginPage';
import AccountantLoginPage from './pages/Accountant/login/AccountantLoginPage';
import FeeAndSalaryPage from './pages/Accountant/feeandsalary/FeeAndSalaryPage';
import SuperAdminDashboard from './pages/SuperAdmin/dashboard/Dashboard';
import { PartnerSchools } from './pages/SuperAdmin/partnerschools/PartnerSchools';
import PartnerSchoolDetails from './pages/SuperAdmin/partnerschools/details/PartnerSchoolDetails';
import SchoolPermissionDetailPage from './pages/SuperAdmin/permissions/details/SchoolPermissionDetail';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<UserLandingPage />} />
                    <Route path='/admin' element={<AdminLandingPage />} />
                    <Route path='/super-admin-login' element={<SuperAdminLoginPage />} />
                    <Route path='/admin-login' element={<AdminLoginPage />} />
                    <Route path='/accountant-login' element={<AccountantLoginPage />} />

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
                    <Route path='/super-admin/settings' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <Settings />
                        </ProtectedRoute>
                    } />

                    {/* Admin */}
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route path='/admin/student-management' element={<StudentManagement />} />
                    <Route path='/admin/parent-management' element={<ParentsManagement />} />
                    <Route path='/admin/teacher-management' element={<TeacherManagement />} />
                    <Route path='/admin/timetable-management' element={<TimetableManagement />} />
                    <Route path='/admin/class-management' element={<ClassManagement />} />
                    <Route path='/admin/attendance-monitoring' element={<AttendanceMonitoring />} />
                    <Route path='/admin/attendance-monitoring/history/:id' element={<AttendanceHistory />} />
                    <Route path='/admin/communication' element={<Communication />} />
                    <Route path='/admin/event' element={<Events />} />
                    <Route path='/admin/fee-overview' element={<FeeOverview />} />
                    <Route path='/admin/fee-overview/details/:id' element={<FeeDetails />} />
                    <Route path='/admin/account-management' element={<AccountantManagement />} />
                    <Route path='/admin/support' element={<AdminSupportConsole />} />
                    <Route path='/admin/support/details/:id' element={<AdminSupportTicketDetailPage />} />
                    <Route path='/admin/settings' element={<AdminSettings />} />

                    {/* Accountant */}
                    <Route path='/accountant/dashboard' element={<AccountantDashboard />} />
                    <Route path='/accountant/fee-salary' element={<FeeAndSalaryPage />} />
                    <Route path='/accountant/invoices' element={<InvoicesPage />} />
                    <Route path='/accountant/settings' element={<SettingsPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;