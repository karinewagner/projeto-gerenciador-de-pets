import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../../services/authService';

export function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const baseLinkStyle = "text-sm font-medium transition-colors pb-1 border-b-2";

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${baseLinkStyle} text-primary border-primary font-bold`
      : `${baseLinkStyle} text-[#9a804c] border-transparent hover:text-primary hover:border-primary/30`;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f3efe7] dark:border-[#3a3225] px-6 md:px-20 py-4 bg-white dark:bg-background-dark sticky top-0 z-50">
      <Link to="/pets" className="flex items-center gap-4 text-[#1b170d] dark:text-[#f3efe7]">
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined text-3xl">pets</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">BuscaPet</h2>
      </Link>

      {isAuthenticated() ? (
        <div className="flex items-center justify-end gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <NavLink className={getLinkClassName} to="/pets">Pets</NavLink>
            <NavLink className={getLinkClassName} to="/tutors">Tutores</NavLink>
            <NavLink className={getLinkClassName} to="/linking">Vincular</NavLink>
            <NavLink className={getLinkClassName} to="/contacts">Contatosr</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold leading-none">Admin</span>
              <span className="text-[10px] text-[#9a804c]">Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              title="Sair"
              className="flex size-10 items-center justify-center rounded-full border-2 border-primary/20 hover:border-primary transition-all text-[#1b170d] dark:text-[#f3efe7] cursor-pointer"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
