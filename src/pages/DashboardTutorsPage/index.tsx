import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useTutors } from '../../hooks/useTutors';

import { DashboardLayout } from '../../components/DashboardLayout';
import { Pagination } from '../../components/Pagination';
import { SearchBar } from '../../components/SearchBar';
import { TutorCard } from '../../components/TutorCard';
import { ListState } from '../../components/ListState';

export function DashboardTutorsPage() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');

    const {
        data: tutors,
        loading,
        error,
        page,
        totalPages,
        setPage,
    } = useTutors(nome);

    return (
        <DashboardLayout
            title="Listagem de Tutores"
            subtitle="Gerencie os tutores cadastrados na plataforma."
            createLabel="Novo Tutor"
            onCreate={() => navigate('/tutors/new')}
        >
            <SearchBar
                nome={nome}
                tipo="tutor"
                raca=""
                setNome={setNome}
                setRaca={() => { }}
                onClear={() => {
                    setNome('');
                    setPage(0);
                }}
            />

            <ListState
                data={tutors}
                loading={loading}
                error={error}
                emptyMessage="Nenhum tutor cadastrado."
                renderItem={(tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                )}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </DashboardLayout>
    );
}
