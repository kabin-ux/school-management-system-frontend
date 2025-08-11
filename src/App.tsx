import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/AdminLandingPage';
import UserLandingPage from './pages/UserLandingPage';
import SuperAdminLoginPage from './pages/SuperAdminLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AccountantLoginPage from './pages/AccountantLoginPage';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;