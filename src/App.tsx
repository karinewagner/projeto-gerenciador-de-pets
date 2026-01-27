import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { PetDetailPage } from './pages/PetDetails';

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pets/:petId" element={<PetDetailPage />} />
      </Route>

      {/* Rotas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;