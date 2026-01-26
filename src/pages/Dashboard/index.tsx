import { PetCard } from '../../components/PetCard';
import { pets } from '../../utils/pets';

export function DashboardPage() {
  return (
    <main className="flex flex-1 justify-center pt-8">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[#1b170d] dark:text-white tracking-tight text-[32px] font-bold leading-tight">Listagem de Pets</h1>
            <p className="text-[#9a804c] dark:text-[#c2ae85] text-base">Gerencie os pets cadastrados na plataforma.</p>
          </div>
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-primary text-[#1b170d] px-5 font-bold shadow-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Novo Pet</span>
          </button>
        </div>
        <div className="max-w-full w-full mb-8">
          <label className="flex flex-col min-w-40 h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm border border-[#f3efe7] dark:border-[#3a3225]">
              <div className="text-primary flex bg-white dark:bg-[#3a3225] items-center justify-center pl-5 rounded-l-xl">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#1b170d] dark:text-[#f3efe7] focus:outline-0 focus:ring-0 border-none bg-white dark:bg-[#3a3225] h-full placeholder:text-[#9a804c] px-4 pl-3 text-base font-normal leading-normal" placeholder="Buscar pet por nome, espécie ou tutor..." value="" />
            </div>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet.name} pet={pet} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-12 mb-10">
          <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-xl bg-primary text-[#1b170d] font-bold">1</button>
          <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors text-[#1b170d] dark:text-[#f3efe7]">2</button>
          <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors text-[#1b170d] dark:text-[#f3efe7]">3</button>
          <span className="px-2 text-[#9a804c]">...</span>
          <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors text-[#1b170d] dark:text-[#f3efe7]">8</button>
          <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
  );
};
