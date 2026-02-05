import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { ToastProvider } from './contexts/ToastContext';
import { ConfirmProvider } from './contexts/ConfirmContext';

import { LoginPage } from './pages/LoginPage';
import { LinkPetTutorPage } from './pages/LinkPetTutorPage';
import { ContactsPage } from './pages/ContactsPage';

const PetsRoutes = lazy(() =>
  import('./modules/pets/PetsRoutes').then(module => ({
    default: module.PetsRoutes,
  }))
);

const TutorsRoutes = lazy(() =>
  import('./modules/tutors/TutorsRoutes').then(module => ({
    default: module.TutorsRoutes,
  }))
);

function App() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <Suspense fallback={<div className="p-6">Carregando...</div>}>
          <Routes>
            {/* Rotas públicas */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Rotas privadas */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/pets/*" element={<PetsRoutes />} />
                <Route path="/tutors/*" element={<TutorsRoutes />} />
                <Route path="/linking" element={<LinkPetTutorPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;