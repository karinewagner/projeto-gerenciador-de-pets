export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1a150c] border-t border-[#f3efe7] dark:border-[#3a3225] py-8 px-6 md:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">pets</span>
          <p className="font-bold text-sm text-[#9a804c]">Desenvolvido por Karine Wagner</p>
        </div>
      </div>
    </footer>
  );
}
