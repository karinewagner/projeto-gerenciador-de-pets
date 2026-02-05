import { Routes, Route } from 'react-router-dom';

import { DashboardTutorsPage } from './pages/DashboardTutorsPage';
import { TutorFormPage } from './pages/TutorFormPage';
import { TutorDetailPage } from './pages/TutorDetailPage';

export function TutorsRoutes() {
    return (
        <Routes>
            <Route index element={<DashboardTutorsPage />} />
            <Route path="new" element={<TutorFormPage />} />
            <Route path="edit/:id" element={<TutorFormPage />} />
            <Route path=":tutorId" element={<TutorDetailPage />} />
        </Routes>
    );
}
