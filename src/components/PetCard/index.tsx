import type { IPetContent } from '../../types/pets';
import { BaseCard } from '../BaseCard';

interface PetCardProps {
  pet: IPetContent;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <BaseCard
      to={`/pets/${pet.id}`}
      imageUrl={pet.foto?.url}
      imageAlt={pet.foto?.nome}
      title={pet.nome}
      badge={pet.raca}
      subtitle={`${pet.raca} • ${pet.idade} anos`}
    />
  );
}
