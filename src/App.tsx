import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { PetDetailPage } from './pages/PetDetails';

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rotas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pets/:petId" element={<PetDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;