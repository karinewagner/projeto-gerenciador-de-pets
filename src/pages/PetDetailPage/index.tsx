import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getPetById } from '../../services/petService';
import type { IPetDetailsResponse } from '../../types/pets';

import { DetailLayout } from '../../components/DetailLayout';
import { DetailInfoGrid, type InfoItem } from '../../components/DetailInfoGrid';


export function PetDetailPage() {
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
                    mainInfo={null}
                    sideInfo={petInfo}
                />
            )}
        </DetailLayout>
    );
}
