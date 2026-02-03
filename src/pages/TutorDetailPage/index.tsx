import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getTutorById } from '../../services/tutorService';
import type { ITutorDetailsResponse } from '../../types/tutors';

import {
    maskCPF,
    maskPhone,
    maskEmail,
} from '../../utils/masks';

import { DetailLayout } from '../../components/DetailLayout';
import { DetailInfoGrid, type InfoItem } from '../../components/DetailInfoGrid';

export function TutorDetailPage() {
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
                />
            )}
        </DetailLayout>
    );
}
