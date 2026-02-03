import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LoginPage } from './pages/Login';
import { DashboardPetsPage } from './pages/DashboardPetsPage';
import { DashboardTutorsPage } from './pages/DashboardTutorsPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { PetFormPage } from './pages/PetForm';
import { TutorDetailPage } from './pages/TutorDetailPage';

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
          <Route path="/pets" element={<DashboardPetsPage />} />
          <Route path="/pets/:petId" element={<PetDetailPage />} />
          <Route path="/pets/edit/:id" element={<PetFormPage />} />
          <Route path="/pets/new" element={<PetFormPage />} />
          <Route path="/tutors" element={<DashboardTutorsPage />} />
          <Route path="/tutors/:tutorId" element={<TutorDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;