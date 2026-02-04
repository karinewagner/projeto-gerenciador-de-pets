import { useState } from 'react';
import { usePets } from '../../hooks/usePets';
import { useTutors } from '../../hooks/useTutors';
import { useLinkPetTutor } from '../../hooks/useLinkPetTutor';

import { Pagination } from '../../components/Pagination';
import { SelectableListSection } from '../../components/SelectableListSection';

export function LinkPetTutorPage() {
    const [petSearch, setPetSearch] = useState('');
    const [tutorSearch, setTutorSearch] = useState('');

    const {
        selectedPet,
        selectedTutor,
        setSelectedPet,
        setSelectedTutor,
        linking,
        link,
    } = useLinkPetTutor();

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

                <header className="mb-5">
                    <h1 className="text-3xl font-bold">Vincular Pet e Tutor</h1>
                    <p className="text-[#9a804c]">
                        Selecione um animal e um tutor para estabelecer a conexão de guarda.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <SelectableListSection
                        title="1. Selecionar Pet"
                        icon="pets"
                        placeholder="Buscar pet pelo nome..."
                        search={petSearch}
                        onSearchChange={setPetSearch}
                        items={pets}
                        loading={petsLoading}
                        selectedId={selectedPet?.id}
                        onSelect={setSelectedPet}
                        renderItem={(pet, selected) => (
                            <div className="flex items-center gap-4 p-3">
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
                            </div>
                        )}
                        pagination={
                            <Pagination
                                page={petPage}
                                totalPages={petTotalPages}
                                onPageChange={setPetPage}
                            />
                        }
                    />

                    <SelectableListSection
                        title="2. Selecionar Tutor"
                        icon="person"
                        placeholder="Buscar tutor pelo nome..."
                        search={tutorSearch}
                        onSearchChange={setTutorSearch}
                        items={tutors}
                        loading={tutorsLoading}
                        selectedId={selectedTutor?.id}
                        onSelect={setSelectedTutor}
                        renderItem={(tutor, selected) => (
                            <div className="flex items-center gap-4 p-3">
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
                            </div>
                        )}
                        pagination={
                            <Pagination
                                page={tutorPage}
                                totalPages={tutorTotalPages}
                                onPageChange={setTutorPage}
                            />
                        }
                    />
                </div>

                {selectedPet && selectedTutor && (
                    <section className="mt-5 bg-white dark:bg-[#3a3225] p-8 rounded-2xl border shadow-xl max-w-2xl mx-auto">
                        <p className="text-center text-[#9a804c] mb-6 font-bold">
                            Ao confirmar, <strong className="text-xl text-[#eca413]">
                                {selectedTutor.nome}
                            </strong> será tutor(a) de{' '}
                            <strong className="text-xl text-[#eca413]">
                                {selectedPet.nome}
                            </strong>.
                        </p>

                        <button
                            onClick={link}
                            disabled={linking}
                            className="w-full px-12 py-4 bg-primary font-bold rounded-xl
                            shadow-[0_4px_0_rgb(180,120,0)]
                            hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(180,120,0)]
                            transition-all flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined">link</span>
                            {linking ? 'Vinculando...' : 'Vincular Pet ao Tutor'}
                        </button>
                    </section>
                )}
            </div>
        </main>
    );
}
