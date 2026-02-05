import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getPetById, deletePet } from '../../../../services/petService';
import { useSafeAction } from '../../../../hooks/useSafeAction';
import type { IPetDetailsResponse } from '../../../../types/pets';

import { DetailLayout } from '../../../../components/DetailLayout';
import { DetailInfoGrid, type InfoItem } from '../../../../components/DetailInfoGrid';

export function PetDetailPage() {
    const navigate = useNavigate();
    const safeAction = useSafeAction();
    const { petId } = useParams<{ petId: string }>();

    const [pet, setPet] = useState<IPetDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const petInfo: InfoItem[] = [
        {
            label: 'Raça',
            icon: 'pets',
            value: pet?.raca,
        },
        {
            label: 'Idade',
            icon: 'calendar_today',
            value: `${pet?.idade} Anos`,
        },
    ];

    async function handleDeletePet() {
        if (!pet) return;

        const success = await safeAction(
            () => deletePet(pet.id),
            {
                confirmTitle: 'Excluir Pet',
                confirmMessage: 'Tem certeza que deseja deletar este pet?',
                successMessage: 'Pet removido com sucesso!',
                errorMessage: 'Erro ao remover pet',
            }
        )
        if (success) {
            navigate('/pets');
        }
    }

    useEffect(() => {
        async function load() {
            if (!petId) return setLoading(false);

            try {
                const data = await getPetById(Number(petId));
                setPet(data);
            } catch {
                setPet(null);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [petId]);

    return (
        <DetailLayout
            loading={loading}
            notFoundTitle="Pet não encontrado"
            backTo="/pets"
            breadcrumb={
                <>
                    <Link to="/pets" className="text-[#9a804c] hover:underline">
                        Início
                    </Link>
                    <span className="material-symbols-outlined text-sm">
                        chevron_right
                    </span>
                    <span className="font-medium">
                        {pet?.nome}
                    </span>
                </>
            }
        >
            {pet && (
                <DetailInfoGrid
                    title={pet.nome}
                    imageUrl={pet.foto?.url}
                    editTo={`/pets/edit/${pet.id}`}
                    sideInfo={petInfo}
                    tutorInfo={pet?.tutores}
                    petInfo={null}
                    onDelete={handleDeletePet}
                />
            )}
        </DetailLayout>
    );
}
