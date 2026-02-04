import { Link } from 'react-router-dom';

import type { ITutorContent } from '../../types/tutors';
import type { IPetContent } from '../../types/pets';

export interface InfoItem {
    label: string;
    icon: string;
    value?: string | number;
}

interface DetailInfoGridProps {
    title: string;
    imageUrl?: string;
    editTo: string;
    sideInfo: InfoItem[];
    tutorInfo: ITutorContent[] | null;
    petInfo: IPetContent[] | null;
    onDelete: () => void;
    onRemovePet?: (petId: number) => void;
}

export function DetailInfoGrid({
    title,
    imageUrl,
    editTo,
    sideInfo,
    tutorInfo,
    petInfo,
    onDelete,
    onRemovePet
}: DetailInfoGridProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
            <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-[#1b170d] dark:text-white
            tracking-light text-[32px] md:text-[40px]
            font-extrabold leading-tight">
                        {title}
                    </h1>

                    <Link
                        to={editTo}
                        className="inline-flex items-center text-[#1b170d]
              dark:text-white bg-white dark:bg-[#2d271a]
              px-4 py-2 rounded-lg border border-primary/20
              hover:border-primary transition-colors w-fit"
                    >
                        <span className="material-symbols-outlined text-xl">
                            edit
                        </span>
                    </Link>
                    <button
                        onClick={onDelete}
                        className="inline-flex items-center text-red-600
              dark:text-white bg-white dark:bg-[#2d271a]
              px-4 py-2 rounded-lg border border-primary/20
              hover:border-primary transition-colors w-fit"
                    >
                        <span className="material-symbols-outlined text-xl">
                            delete
                        </span>
                    </button>
                </div>

                <div className="relative w-full aspect-[4/3]
          rounded-2xl overflow-hidden bg-gray-200
          dark:bg-gray-800 shadow-sm border
          border-[#f3efe7] dark:border-[#3a3428]">
                    {imageUrl && (
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover"
                            style={{ backgroundImage: `url("${imageUrl}")` }}
                        />
                    )}
                </div>
            </div>

            <aside className="w-full lg:w-[360px] space-y-6">
                <aside className="w-full lg:w-[360px] space-y-6">
                    <div className="flex flex-col gap-4 justify-around mt-20 py-6 border-y border-[#f3efe7] dark:border-[#3a3428]">
                        {sideInfo.map(({ label, icon, value }) => (
                            <div key={label} className="flex flex-col gap-1">
                                <span className="text-[#9a804c] text-xs font-semibold uppercase tracking-wider">
                                    {label}
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">
                                        {icon}
                                    </span>

                                    <span className="text-base font-bold">
                                        {value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                {
                    tutorInfo && tutorInfo.length > 0 && (
                        <aside className="w-full lg:w-[360px] space-y-6">
                            <div className="bg-white dark:bg-[#1a150a] p-4 rounded-2xl shadow-sm border border-[#f3efe7] dark:border-[#3a3428] sticky top-24">
                                <h3 className="text-lg font-bold mb-6">Contato do Tutor(es)</h3>
                                <div className="flex flex-col gap-4 mb-6 max-h-[250px] overflow-y-auto">
                                    {tutorInfo.map((tutor) => (
                                        <div key={tutor.id} className="flex items-center gap-3 p-3 ">
                                            <span className="font-bold text-base">{tutor.nome}</span>
                                            <span className="material-symbols-outlined text-primary">call</span>
                                            <span className="font-semibold text-[#9a804c] text-sm">{tutor.telefone}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    )
                }
                {
                    petInfo && petInfo.length > 0 && (
                        <aside className="w-full lg:w-[360px] space-y-6 ">
                            <div className="bg-white dark:bg-[#1a150a] p-4 rounded-2xl shadow-sm border border-[#f3efe7] dark:border-[#3a3428] sticky top-24">
                                <h3 className="text-lg font-bold mb-6">Pet(s) vinculado(s)</h3>
                                <div className="flex flex-col gap-4 mb-6 max-h-[200px] overflow-y-auto">
                                    {onRemovePet && petInfo.map((pet) => (
                                        <div className="flex items-center gap-3 p-3 ">
                                            <span className="material-symbols-outlined text-primary">pets</span>
                                            <span className="font-bold text-base">{pet.nome}</span>
                                            <span className="font-semibold text-[#9a804c] text-sm">{pet.raca}</span>
                                            <button
                                                type="button"
                                                onClick={() => onRemovePet(pet.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                                title="Remover vínculo"
                                            >
                                                <span className="material-symbols-outlined">
                                                    link_off
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    )
                }
            </aside>
        </div>
    );
}
