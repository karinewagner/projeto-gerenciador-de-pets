import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPets } from '../../services/petService';
import type { IPetContent } from '../../types/pets';

import { PetCard } from '../../components/PetCard';
import { Pagination } from '../../components/Pagination';
import { SearchBar } from '../../components/SearchBar';

export function DashboardPage() {
  const navigate = useNavigate();

  const [pets, setPets] = useState<IPetContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [nome, raca]);

  useEffect(() => {
    async function loadPets() {
      try {
        setLoading(true);

        const response = await getPets({
          nome: nome || undefined,
          raca: raca || undefined,
          page,
          size,
        });

        setPets(response.content);
        setTotalPages(response.pageCount);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar pets');
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, [nome, raca, page, size]);

  return (
    <main className="flex flex-1 justify-center pt-8">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="tracking-tight text-[32px] font-bold">
              Listagem de Pets
            </h1>
            <p className="text-[#9a804c]">
              Gerencie os pets cadastrados na plataforma.
            </p>
          </div>

          <button
            onClick={() => navigate('/pets/novo')}
            className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-primary px-5 font-bold shadow-sm hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Novo Pet</span>
          </button>
        </div>

        <SearchBar
          nome={nome}
          raca={raca}
          setNome={setNome}
          setRaca={setRaca}
          onClear={() => { setNome(''); setRaca(''); setPage(0); }}
        />

        <div className="mt-10">
          {loading && (
            <div className="text-center py-10 text-[#9a804c]">
              Carregando pets...
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && pets.length === 0 && (
            <div className="text-center py-10 text-[#9a804c]">
              Nenhum pet cadastrado.
            </div>
          )}

          {!loading && !error && pets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
};
