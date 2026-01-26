export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-10">
      <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="flex size-10 items-center justify-center rounded-xl bg-primary text-[#1b170d] font-bold">1</button>
      <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors text-[#1b170d] dark:text-[#f3efe7]">2</button>
      <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors text-[#1b170d] dark:text-[#f3efe7]">3</button>
      <span className="px-2 text-[#9a804c]">...</span>
      <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors text-[#1b170d] dark:text-[#f3efe7]">12</button>
      <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#3a3225] border border-[#f3efe7] dark:border-[#4d4434] hover:border-primary transition-colors">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
