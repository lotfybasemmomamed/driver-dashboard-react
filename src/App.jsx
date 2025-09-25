import { Route,Routes,Navigate } from 'react-router'
import './App.css'
import Drivers from './component/dashboard/drivers/Drivers'
import RoutesPage from './component/dashboard/routes/RoutesPage'
import Statistics from './component/dashboard/statistics/Statistics'
import LoginPage from './pages/Login'
import RequireAuth from './helpers/RequirAuth'
import Dashboard from './pages/dashboard/Dashboard'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Statistics />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="routes" element={<RoutesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App
