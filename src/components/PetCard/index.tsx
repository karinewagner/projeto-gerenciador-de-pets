import { Link } from 'react-router-dom';
import type { IPetContent } from '../../types/pets';

interface PetCardProps {
  pet: IPetContent;
}
export function PetCard({ pet }: PetCardProps) {
  return (
    <Link to={`/pets/${pet.id}`} className="flex flex-col gap-3 pb-4 bg-white dark:bg-[#3a3225] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#f3efe7] dark:border-transparent">
      <div
        className="relative w-full aspect-square bg-center bg-no-repeat bg-cover"
        data-alt={pet.foto.nome}
        style={{ backgroundImage: `url("${pet.foto.url}")` }}
      >
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[#1b170d] dark:text-[#f3efe7] text-lg font-bold leading-normal">{pet.nome}</p>
          <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">{pet.raca}</span>
        </div>
        <p className="text-[#9a804c] dark:text-[#c2ae85] text-sm font-medium">{pet.raca} • {pet.idade} years</p>
      </div>
    </Link>
  );
}
