import { Link } from 'react-router-dom';

import type { ITutorContent } from '../../types/tutors';

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
}

export function DetailInfoGrid({
    title,
    imageUrl,
    editTo,
    sideInfo,
    tutorInfo,
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
                                <div className="flex flex-col gap-4 mb-6">
                                    {tutorInfo.map((tutor) => (
                                        <div key={tutor.id} className="flex flex-col">
                                            <h4 className="font-bold text-base">{tutor.nome}</h4>
                                            <div className="flex items-center gap-3 p-3 text-[#9a804c] text-sm">
                                                <span className="material-symbols-outlined text-primary">call</span>
                                                <span className="font-semibold">{tutor.telefone}</span>
                                            </div>
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
