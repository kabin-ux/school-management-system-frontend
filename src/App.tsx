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

          <Route path='/super-admin' element={<SuperAdminDashboard />} />
          <Route path='/super-admin/partner-schools' element={<PartnerSchools />} />
          <Route path='/super-admin/notifications' element={<NotificationCenter />} />
          <Route path='/super-admin/permissions' element={<PermissionManagement />} />
          <Route path='/super-admin/permissions/details' element={<SchoolPermissionDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;