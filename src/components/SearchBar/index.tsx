export function SearchBar() {
  return (
    <div className="max-w-3xl w-full mx-auto mb-6">
      <label className="flex flex-col min-w-40 h-14 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-xl">
          <div className="text-primary flex border-none bg-white dark:bg-[#3a3225] items-center justify-center pl-5 rounded-l-xl border-r-0">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#1b170d] dark:text-[#f3efe7] focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-[#3a3225] h-full placeholder:text-[#9a804c] px-4 pl-3 text-base font-normal leading-normal"
            placeholder="Busque pelo nome do pet ou raça..."
          />
        </div>
      </label>
    </div>
  );
}
