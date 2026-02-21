import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/LandingPage/AdminLandingPage';
import UserLandingPage from './pages/LandingPage/UserLandingPage';
import SupportConsole from './pages/SuperAdmin/support/SupportConsole';
import SupportTicketDetailPage from './pages/SuperAdmin/support/details/SupportTicketDetail';
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
// import SuperAdminLoginPage from './pages/SuperAdmin/login/SuperAdminLoginPage';
// import AdminLoginPage from './pages/Admin/login/AdminLoginPage';
// import AccountantLoginPage from './pages/Accountant/login/AccountantLoginPage';
import FeeAndSalaryPage from './pages/Accountant/feeandsalary/FeeAndSalaryPage';
import SuperAdminDashboard from './pages/SuperAdmin/dashboard/Dashboard';
import { PartnerSchools } from './pages/SuperAdmin/partnerschools/PartnerSchools';
import PartnerSchoolDetails from './pages/SuperAdmin/partnerschools/details/PartnerSchoolDetails';
import ProtectedRoute from './auth/ProtectedRoute';
import UnauthorizedPage from './pages/Unauthorized';
import { Toaster } from 'react-hot-toast';
import { SuperAdminsPage } from './pages/SuperAdmin/superadmins/SuperAdminsPage';
import TransportationManagement from './pages/Admin/transportation/TransportationManagement';
import ClassDetails from './pages/Admin/class/details/ClassDetails';
import SubjectManagement from './pages/Admin/class/subjects/SubjectManagement';
import SalaryOverview from './pages/Admin/salaryoverview/SalaryOverview';
import { ResetPassword } from './common/ResetPassword';
import { ResetPasswordAdmin } from './pages/Admin/login/ResetPasswordAdmin';
import NotificationsCenter from './pages/Admin/notifications/NotificationCenter';
import RoleManagement from './pages/Admin/roles/RoleManagement';
import { Subscriptions } from './pages/SuperAdmin/subscription/Subscription';
import { SubscriptionDetails } from './components/SuperAdmin/subscription/SubscriptionDetails';
import InvoiceOverview from './pages/SuperAdmin/invoice/InvoiceOvervew';
import PrivacyPolicy from './components/LandingPage/PrivacyPolicy';
import TermsAndConditions from './components/LandingPage/Terms&Conditions';
import DeletePolicyPage from './components/LandingPage/DeleteAccount';
import LoginPortal from './pages/LoginPage';
import PlansSection from './components/LandingPage/Plans&Subscription';

function App() {
    return (
        <>
            <Router>
                <Toaster />
                <Routes>
                    <Route path='/' element={<UserLandingPage />} />
                    <Route path='/plans' element={<PlansSection />} />
                    <Route path='/admin' element={<AdminLandingPage />} />
                    <Route path='/terms&conditions' element={<TermsAndConditions />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='/delete-account' element={<DeletePolicyPage />} />
                    <Route path='/login' element={<LoginPortal />} />
                    {/* <Route path='/super-admin-login' element={<SuperAdminLoginPage />} />
                    <Route path='/admin-login' element={<AdminLoginPage />} />
                    <Route path='/accountant-login' element={<AccountantLoginPage />} /> */}
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
                    <Route path='/super-admin/subscription' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <Subscriptions />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/subscription/details/:id' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <SubscriptionDetails />
                        </ProtectedRoute>
                    } />
                    <Route path='/super-admin/invoice' element={
                        <ProtectedRoute allowedRoles={['superadmin']}>
                            <InvoiceOverview />
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
                    <Route path='/admin/notifications' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <NotificationsCenter />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/role-management' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <RoleManagement />
                        </ProtectedRoute>
                    } />
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