import type { Pet } from '../../utils/pets';
import { Link } from 'react-router-dom';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <div className="flex flex-col gap-3 pb-4 bg-white dark:bg-[#3a3225] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#f3efe7] dark:border-transparent">
      <div
        className="relative w-full aspect-square bg-center bg-no-repeat bg-cover"
        data-alt={pet.altText}
        style={{ backgroundImage: `url("${pet.imageUrl}")` }}
      >
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          {pet.status}
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[#1b170d] dark:text-[#f3efe7] text-lg font-bold leading-normal">{pet.name}</p>
          <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">{pet.species}</span>
        </div>
        <p className="text-[#9a804c] dark:text-[#c2ae85] text-sm font-medium">{pet.breed} • {pet.age} years</p>
        <div className="flex items-center gap-1 mt-2 text-[#9a804c] dark:text-[#c2ae85]">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <p className="text-xs">{pet.location}</p>
        </div>
      </div>
    </div>
  );
}
