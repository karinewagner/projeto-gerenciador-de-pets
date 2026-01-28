import type { IPetContent } from "../../types/pets";

interface PetInfoGridProps {
  pet: IPetContent;
}

export function PetInfoGrid({ pet }: PetInfoGridProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-4">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#1b170d] dark:text-white tracking-light text-[32px] md:text-[40px] font-extrabold leading-tight">{pet.nome}</h1>
          </div>
        </div>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-sm border border-[#f3efe7] dark:border-[#3a3428]">
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url("${pet?.foto?.url}")` }}
          ></div>
        </div>
      </div>

      <aside className="w-full lg:w-[360px] space-y-6">
        <div className="flex justify-around mt-20 py-6 border-y border-[#f3efe7] dark:border-[#3a3428]">
          <div className="flex flex-col gap-1">
            <span className="text-[#9a804c] text-xs font-semibold uppercase tracking-wider">Raça</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">pets</span>
              <span className="text-base font-bold">{pet?.raca}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#9a804c] text-xs font-semibold uppercase tracking-wider">Idade</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
              <span className="text-base font-bold">{pet?.idade} Anos</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
