import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f3efe7] dark:border-[#3a3225] px-6 md:px-20 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-4 text-[#1b170d] dark:text-[#f3efe7]">
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined text-3xl">pets</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">BuscaPet</h2>
      </Link>
      <div className="flex items-center justify-end">
        <Link to="/login" className="flex size-10 items-center justify-center rounded-full border-2 border-primary/20 hover:border-primary transition-all text-[#1b170d] dark:text-[#f3efe7] cursor-pointer">
          <span className="material-symbols-outlined">person</span>
        </Link>
      </div>
    </header>
  );
}
