import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getPetById } from '../../utils/pets';
import type { IPetContent } from '../../types/pets';

import { PetInfoGrid } from '../../components/PetInfoGrid';
import { isAuthenticated } from '../../services/authService';

export function PetDetailPage() {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<IPetContent | undefined>(undefined);

  useEffect(() => {
    if (petId) {
      const foundPet = getPetById(petId);
      setPet(foundPet);
    }
  }, [petId]);

  if (!pet) {
    return (
      <main className="flex-1 flex items-center justify-center mt-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Pet não encontrado</h1>
          <Link to="/" className="text-primary hover:underline mt-6 inline-block">
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 md:px-10 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
        <nav className="flex flex-wrap gap-2 py-4 items-center">
          <Link className="text-[#9a804c] text-sm md:text-base font-medium leading-normal hover:underline" to="/">Início</Link>
          <span className="material-symbols-outlined text-[#9a804c] text-sm">chevron_right</span>
          <span className="text-[#1b170d] dark:text-white text-sm md:text-base font-medium leading-normal">{pet.nome} - {pet.raca}</span>
        </nav>
        <a href={isAuthenticated() ? "/dashboard" : "/"} className="inline-flex items-center gap-2 text-[#1b170d] dark:text-white font-semibold text-sm bg-white dark:bg-[#2d271a] px-4 py-2 rounded-lg border border-primary/20 hover:border-primary dark:hover:bg-[#3a3428] transition-colors w-fit">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Voltar para o Início
        </a>
      </div>

      <PetInfoGrid pet={pet} />
    </main>
  );
}
