import { useState } from 'react';

import { usePets } from '../../hooks/usePets';
import { useTutors } from '../../hooks/useTutors';

import type { IPetContent } from '../../types/pets';
import type { ITutorContent } from '../../types/tutors';

import { Pagination } from '../../components/Pagination';

export function LinkPetTutorPage() {
    const [selectedPet, setSelectedPet] = useState<IPetContent | null>(null);
    const [selectedTutor, setSelectedTutor] = useState<ITutorContent | null>(null);

    const [petSearch, setPetSearch] = useState('');
    const [tutorSearch, setTutorSearch] = useState('');

    // 🔹 Hooks da API
    const {
        data: pets,
        loading: petsLoading,
        page: petPage,
        totalPages: petTotalPages,
        setPage: setPetPage,
    } = usePets(petSearch, '');

    const {
        data: tutors,
        loading: tutorsLoading,
        page: tutorPage,
        totalPages: tutorTotalPages,
        setPage: setTutorPage,
    } = useTutors(tutorSearch);

    return (
        <main className="flex flex-1 justify-center py-8">
            <div className="max-w-[1200px] w-full px-4 md:px-10">

                {/* Título */}
                <header className="mb-5">
                    <h1 className="text-3xl font-bold">Vincular Pet e Tutor</h1>
                    <p className="text-[#9a804c]">
                        Selecione um animal e um tutor para estabelecer a conexão de guarda.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ================= PETS ================= */}
                    <section className="bg-white dark:bg-[#2d2518] p-6 rounded-xl border shadow-sm">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">pets</span>
                            1. Selecionar Pet
                        </h3>

                        <div className="relative mb-4">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a804c]">
                                search
                            </span>

                            <input
                                type="text"
                                placeholder="Buscar pet pelo nome..."
                                value={petSearch}
                                onChange={(e) => setPetSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border
                                border-[#f3efe7] bg-background-light
                                focus:ring-2 focus:ring-primary/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2 max-h-[350px] overflow-y-auto">
                            {petsLoading && (
                                <p className="text-sm text-[#9a804c]">
                                    Carregando pets...
                                </p>
                            )}

                            {!petsLoading && pets.length === 0 && (
                                <p className="text-sm text-[#9a804c]">
                                    Nenhum pet encontrado
                                </p>
                            )}

                            {pets.map((pet) => {
                                const selected = selectedPet?.id === pet.id;

                                return (
                                    <button
                                        key={pet.id}
                                        type="button"
                                        onClick={() => setSelectedPet(pet)}
                                        className={`w-full flex items-center gap-4 p-3 rounded-lg border transition
                                        ${selected
                                                ? 'border-primary bg-primary/5'
                                                : 'border-[#f3efe7] hover:bg-[#fcfaf8]'
                                            }`}
                                    >
                                        <div
                                            className="size-12 rounded-lg bg-cover bg-center"
                                            style={{
                                                backgroundImage: pet.foto?.url
                                                    ? `url("${pet.foto.url}")`
                                                    : undefined,
                                            }}
                                        />

                                        <div className="flex-1 text-left">
                                            <p className="font-bold text-sm">{pet.nome}</p>
                                            <p className="text-xs text-[#9a804c]">
                                                {pet.raca} • ID: #{pet.id}
                                            </p>
                                        </div>

                                        {selected && (
                                            <span className="material-symbols-outlined text-primary">
                                                check_circle
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <Pagination
                            page={petPage}
                            totalPages={petTotalPages}
                            onPageChange={setPetPage}
                        />
                    </section>

                    {/* ================= TUTORES ================= */}
                    <section className="bg-white dark:bg-[#2d2518] p-6 rounded-xl border shadow-sm">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">person</span>
                            2. Selecionar Tutor
                        </h3>

                        <div className="relative mb-4">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a804c]">
                                search
                            </span>

                            <input
                                type="text"
                                placeholder="Buscar tutor pelo nome..."
                                value={tutorSearch}
                                onChange={(e) => setTutorSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border
                                border-[#f3efe7] bg-background-light
                                focus:ring-2 focus:ring-primary/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                            {tutorsLoading && (
                                <p className="text-sm text-[#9a804c]">
                                    Carregando tutores...
                                </p>
                            )}

                            {!tutorsLoading && tutors.length === 0 && (
                                <p className="text-sm text-[#9a804c]">
                                    Nenhum tutor encontrado
                                </p>
                            )}

                            {tutors.map((tutor) => {
                                const selected = selectedTutor?.id === tutor.id;

                                return (
                                    <button
                                        key={tutor.id}
                                        type="button"
                                        onClick={() => setSelectedTutor(tutor)}
                                        className={`w-full flex items-center gap-4 p-3 rounded-lg border transition
                                        ${selected
                                                ? 'border-primary bg-primary/5'
                                                : 'border-[#f3efe7] hover:bg-[#fcfaf8]'
                                            }`}
                                    >
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">
                                                person
                                            </span>
                                        </div>

                                        <div className="flex-1 text-left">
                                            <p className="font-bold text-sm">{tutor.nome}</p>
                                            <p className="text-xs text-[#9a804c]">
                                                {tutor.email}
                                            </p>
                                        </div>

                                        {selected && (
                                            <span className="material-symbols-outlined text-primary">
                                                check_circle
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <Pagination
                            page={tutorPage}
                            totalPages={tutorTotalPages}
                            onPageChange={setTutorPage}
                        />
                    </section>
                </div>

                {/* ================= CONFIRMAÇÃO ================= */}
                {selectedPet && selectedTutor && (
                    <section className="mt-5 bg-white dark:bg-[#3a3225] p-8 rounded-2xl border shadow-xl max-w-2xl mx-auto">
                        <p className="text-center text-[#9a804c] mb-6 font-bold">
                            Ao confirmar, <strong>{selectedTutor.nome}</strong> será registrado
                            como tutor responsável por <strong>{selectedPet.nome}</strong>.
                        </p>

                        <button
                            className="w-full px-12 py-4 bg-primary font-bold rounded-xl
                            shadow-[0_4px_0_rgb(180,120,0)]
                            hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(180,120,0)]
                            active:translate-y-[4px] transition-all flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined">link</span>
                            Vincular Pet ao Tutor
                        </button>
                    </section>
                )}
            </div>
        </main>
    );
}
