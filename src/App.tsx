import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/AdminLandingPage';
import UserLandingPage from './pages/UserLandingPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<UserLandingPage />} />
          <Route path='/admin' element={<AdminLandingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;