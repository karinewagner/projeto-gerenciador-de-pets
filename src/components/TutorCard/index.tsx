import type { ITutorContent } from '../../types/tutors';
import { BaseCard } from '../BaseCard';

interface TutorCardProps {
    tutor: ITutorContent;
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <BaseCard
            to={`/tutors/${tutor.id}`}
            imageUrl={tutor.foto?.url}
            imageAlt={tutor.foto?.nome}
            title={tutor.nome}
            badge={undefined}
            subtitle={tutor.email}
            description={tutor.telefone}
        />
    );
}
