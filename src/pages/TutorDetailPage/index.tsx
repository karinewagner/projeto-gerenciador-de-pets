import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { deleteTutor, getTutorById, unlinkPetFromTutor } from '../../services/tutorService';
import { useSafeAction } from '../../hooks/useSafeAction';
import type { ITutorDetailsResponse } from '../../types/tutors';

import {
    maskCPF,
    maskPhone,
    maskEmail,
} from '../../utils/masks';

import { DetailLayout } from '../../components/DetailLayout';
import { DetailInfoGrid, type InfoItem } from '../../components/DetailInfoGrid';

export function TutorDetailPage() {
    const navigate = useNavigate();
    const safeAction = useSafeAction();
    const { tutorId } = useParams<{ tutorId: string }>();

    const [tutor, setTutor] = useState<ITutorDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const tutorInfo: InfoItem[] = [
        {
            label: 'CPF',
            icon: 'person',
            value: maskCPF(tutor?.cpf),
        },
        {
            label: 'Telefone',
            icon: 'phone',
            value: maskPhone(tutor?.telefone),
        },
        {
            label: 'Email',
            icon: 'email',
            value: maskEmail(tutor?.email),
        },
        {
            label: 'Endereço',
            icon: 'location_on',
            value: tutor?.endereco,
        },
    ];

    async function handleDeleteTutor() {
        if (!tutor) return;

        const success = await safeAction(
            () => deleteTutor(tutor.id),
            {
                confirmTitle: 'Excluir Tutor',
                confirmMessage: 'Tem certeza que deseja deletar este tutor?',
                successMessage: 'Tutor removido com sucesso!',
                errorMessage: 'Erro ao remover tutor',
            }
        );

        if (success) {
            navigate('/tutors');
        }
    }

    async function handleRemovePet(petId: number) {
        if (!tutor) return;

        const success = await safeAction(
            () => unlinkPetFromTutor(tutor.id, petId),
            {
                confirmTitle: 'Remover vínculo',
                confirmMessage:
                    'Tem certeza que deseja remover o vínculo deste pet com o tutor?',
                successMessage: 'Vínculo removido com sucesso!',
                errorMessage: 'Erro ao remover vínculo',
            }
        );

        if (success) {
            setTutor({
                ...tutor,
                pets: tutor.pets?.filter((pet) => pet.id !== petId),
            });
        }
    }

    useEffect(() => {
        async function load() {
            if (!tutorId) return setLoading(false);

            try {
                const data = await getTutorById(Number(tutorId));
                setTutor(data);
            } catch {
                setTutor(null);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [tutorId]);

    return (
        <DetailLayout
            loading={loading}
            notFoundTitle="Tutor não encontrado"
            backTo="/tutors"
            breadcrumb={
                <>
                    <Link to="/tutors" className="text-[#9a804c] hover:underline">
                        Início
                    </Link>
                    <span className="material-symbols-outlined text-sm">
                        chevron_right
                    </span>
                    <span className="font-medium">
                        {tutor?.nome}
                    </span>
                </>
            }
        >
            {tutor && (
                <DetailInfoGrid
                    title={tutor.nome}
                    imageUrl={tutor.foto?.url}
                    editTo={`/tutors/edit/${tutor.id}`}
                    sideInfo={tutorInfo}
                    tutorInfo={null}
                    petInfo={tutor.pets}
                    onDelete={handleDeleteTutor}
                    onRemovePet={handleRemovePet}
                />
            )}
        </DetailLayout>
    );
}
