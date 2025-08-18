import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/AdminLandingPage';
import UserLandingPage from './pages/UserLandingPage';
import SuperAdminLoginPage from './pages/SuperAdminLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AccountantLoginPage from './pages/AccountantLoginPage';
import SuperAdminDashboard from './components/SuperAdmin/dashboard/Dashboard';
import { PartnerSchools } from './pages/SuperAdmin/PartnerSchools';
import NotificationCenter from './components/SuperAdmin/notifications/Notifications';
import PermissionManagement from './pages/SuperAdmin/PermissionManagement';
import SchoolPermissionDetailPage from './pages/SuperAdmin/SchoolPermissionDetail';
import SupportConsole from './pages/SuperAdmin/SupportConsole';
import SupportTicketDetailPage from './pages/SuperAdmin/SupportTicketDetail';
import Settings from './pages/SuperAdmin/Settings';
import PaymentsOverview from './pages/SuperAdmin/PaymentsOverview';
import SchoolWisePayment from './pages/SuperAdmin/SchoolWisePayment';
import PaymentDetails from './pages/SuperAdmin/PaymentDetails';
import PartnerSchoolDetails from './pages/SuperAdmin/PartnerSchoolDetails';
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
          <Route path='/super-admin/dashboard' element={<SuperAdminDashboard />} />
          <Route path='/super-admin/partner-schools' element={<PartnerSchools />} />
          <Route path='/super-admin/partner-schools/details/:id' element={<PartnerSchoolDetails />} />
          <Route path='/super-admin/payments' element={<PaymentsOverview />} />
          <Route path='/super-admin/payments/schools' element={<SchoolWisePayment />} />
          <Route path='/super-admin/payments/schools/details' element={<PaymentDetails />} />
          <Route path='/super-admin/notifications' element={<NotificationCenter />} />
          <Route path='/super-admin/permissions' element={<PermissionManagement />} />
          <Route path='/super-admin/permissions/details/:id' element={<SchoolPermissionDetailPage />} />
          <Route path='/super-admin/support' element={<SupportConsole />} />
          <Route path='/super-admin/support/details/:id' element={<SupportTicketDetailPage />} />
          <Route path='/super-admin/settings' element={<Settings />} />

          {/* Admin */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/student-management' element={<StudentManagement />} />
          <Route path='/admin/parent-management' element={<ParentsManagement />} />
          <Route path='/admin/teacher-management' element={<TeacherManagement />} />
          <Route path='/admin/timetable-management' element={<TimetableManagement />} />
          <Route path='/admin/class-management' element={<ClassManagement />} />
          <Route path='/admin/attendance-monitoring' element={<AttendanceMonitoring />} />
                    <Route path='/admin/attendance-monitoring/history' element={<AttendanceHistory />} />
          <Route path='/admin/communication' element={<Communication />} />
          <Route path='/admin/event' element={<Events />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;