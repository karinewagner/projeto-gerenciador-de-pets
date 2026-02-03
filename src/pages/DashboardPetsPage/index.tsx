import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { usePets } from '../../hooks/usePets';

import { DashboardLayout } from '../../components/DashboardLayout';
import { PetCard } from '../../components/PetCard';
import { Pagination } from '../../components/Pagination';
import { SearchBar } from '../../components/SearchBar';
import { ListState } from '../../components/ListState';

export function DashboardPetsPage() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [raca, setRaca] = useState('');

    const {
        data: pets,
        loading,
        error,
        page,
        totalPages,
        setPage,
    } = usePets(nome, raca);

    return (
        <DashboardLayout
            title="Listagem de Pets"
            subtitle="Gerencie os pets cadastrados na plataforma."
            createLabel="Novo Pet"
            onCreate={() => navigate('/pets/new')}
        >
            <SearchBar
                nome={nome}
                tipo="pet"
                raca={raca}
                setNome={setNome}
                setRaca={setRaca}
                onClear={() => {
                    setNome('');
                    setRaca('');
                    setPage(0);
                }}
            />

            <ListState
                data={pets}
                loading={loading}
                error={error}
                emptyMessage="Nenhum pet cadastrado."
                renderItem={(pet) => (
                    <PetCard key={pet.id} pet={pet} />
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
