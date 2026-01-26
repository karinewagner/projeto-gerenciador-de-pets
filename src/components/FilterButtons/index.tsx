export function FilterButtons() {
  return (
    <div className="flex gap-3 py-4 flex-wrap justify-center mb-6">
      <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary text-[#1b170d] px-5 shadow-sm">
        <span className="material-symbols-outlined text-[18px]">grid_view</span>
        <p className="text-sm font-semibold leading-normal">All Pets</p>
      </button>
      <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-[#3a3225] px-5 border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
        <span className="material-symbols-outlined text-[18px]">pets</span>
        <p className="text-[#1b170d] dark:text-[#f3efe7] text-sm font-medium leading-normal">Dogs</p>
      </button>
      <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-[#3a3225] px-5 border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
        <span className="material-symbols-outlined text-[18px]">pets</span>
        <p className="text-[#1b170d] dark:text-[#f3efe7] text-sm font-medium leading-normal">Cats</p>
      </button>
      <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-[#3a3225] px-5 border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
        <p className="text-[#1b170d] dark:text-[#f3efe7] text-sm font-medium leading-normal">Others</p>
      </button>
    </div>
  );
}
