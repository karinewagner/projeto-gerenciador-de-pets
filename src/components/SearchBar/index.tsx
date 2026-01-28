interface SearchBarProps {
  nome: string,
  raca: string,
  setNome: (nome: string) => void,
  setRaca: (raca: string) => void,
  onClear: () => void
}

export function SearchBar({
  nome,
  raca,
  setNome,
  setRaca,
  onClear,
}: SearchBarProps) {

  return (
    <div className="bg-white dark:bg-[#2d2618] p-4 rounded-xl border border-[#f3efe7] dark:border-[#3a3428] flex items-center gap-4 flex-wrap shadow-xl">
      <button
        className="h-12 px-6 rounded-lg bg-primary text-white font-bold text-sm transition-all hover:opacity-90"
        type="button"
        onClick={onClear}
      >
        Todos
      </button>
      <div className="flex-1 min-w-[240px] relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a1957e]">
          search
        </span>
        <input
          className="form-input w-full h-12 pl-11 pr-4 rounded-lg bg-[#f8f7f6] dark:bg-[#221c10] border-none focus:ring-2 focus:ring-primary text-sm text-[#1b170d] dark:text-white"
          placeholder="Buscar por Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="flex-1 min-w-[240px] relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a1957e]">
          pets
        </span>
        <input
          className="form-input w-full h-12 pl-11 pr-4 rounded-lg bg-[#f8f7f6] dark:bg-[#221c10] border-none focus:ring-2 focus:ring-primary text-sm text-[#1b170d] dark:text-white"
          placeholder="Buscar por Raça"
          type="text"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
        />
      </div>
    </div>
  );
}
