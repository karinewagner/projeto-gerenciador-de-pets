import { Routes, Route } from 'react-router-dom';

import { DashboardPetsPage } from './pages/DashboardPetsPage';
import { PetFormPage } from './pages/PetFormPage';
import { PetDetailPage } from './pages/PetDetailPage';

export function PetsRoutes() {
    return (
        <Routes>
            <Route index element={<DashboardPetsPage />} />
            <Route path="new" element={<PetFormPage />} />
            <Route path="edit/:id" element={<PetFormPage />} />
            <Route path=":petId" element={<PetDetailPage />} />
        </Routes>
    );
}
