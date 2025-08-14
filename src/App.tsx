import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/AdminLandingPage';
import UserLandingPage from './pages/UserLandingPage';
import SuperAdminLoginPage from './pages/SuperAdminLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AccountantLoginPage from './pages/AccountantLoginPage';
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import { PartnerSchools } from './pages/SuperAdmin/PartnerSchools';
import NotificationCenter from './pages/SuperAdmin/Notifications';
import PermissionManagement from './pages/SuperAdmin/PermissionManagement';
import SchoolPermissionDetailPage from './pages/SuperAdmin/SchoolPermissionDetail';
import SupportConsole from './pages/SuperAdmin/SupportConsole';
import SupportTicketDetailPage from './pages/SuperAdmin/SupportTicketDetail';
import Settings from './pages/SuperAdmin/Settings';
import PaymentsOverview from './pages/SuperAdmin/PaymentsOverview';
import SchoolWisePayment from './pages/SuperAdmin/SchoolWisePayment';
import PaymentDetails from './pages/SuperAdmin/PaymentDetails';

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
          <Route path='/super-admin' element={<SuperAdminDashboard />} />
          <Route path='/super-admin/partner-schools' element={<PartnerSchools />} />
          <Route path='/super-admin/payments' element={<PaymentsOverview />} />
          <Route path='/super-admin/payments/schools' element={<SchoolWisePayment />} />
          <Route path='/super-admin/payments/schools/details' element={<PaymentDetails />} />
          <Route path='/super-admin/notifications' element={<NotificationCenter />} />
          <Route path='/super-admin/permissions' element={<PermissionManagement />} />
          <Route path='/super-admin/permissions/details/:id' element={<SchoolPermissionDetailPage />} />
          <Route path='/super-admin/support' element={<SupportConsole />} />
          <Route path='/super-admin/support/details/:id' element={<SupportTicketDetailPage />} />
          <Route path='/super-admin/settings' element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;