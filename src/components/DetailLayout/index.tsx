import { Link } from 'react-router-dom';

interface DetailLayoutProps {
    loading: boolean;
    notFoundTitle: string;
    backTo: string;
    breadcrumb: React.ReactNode;
    children: React.ReactNode;
}

export function DetailLayout({
    loading,
    notFoundTitle,
    backTo,
    breadcrumb,
    children,
}: DetailLayoutProps) {
    if (loading) {
        return (
            <main className="flex-1 flex items-center justify-center mt-10">
                <p className="text-[#9a804c]">Carregando...</p>
            </main>
        );
    }

    if (!children) {
        return (
            <main className="flex-1 flex items-center justify-center mt-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{notFoundTitle}</h1>
                    <Link
                        to={backTo}
                        className="text-primary hover:underline mt-6 inline-block"
                    >
                        Voltar
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-[1200px] mx-auto w-full px-4 md:px-10 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                <nav className="flex flex-wrap gap-2 py-4 items-center">
                    {breadcrumb}
                </nav>

                <Link
                    to={backTo}
                    className="inline-flex items-center gap-2 text-[#1b170d]
            dark:text-white font-semibold text-sm bg-white
            dark:bg-[#2d271a] px-4 py-2 rounded-lg
            border border-primary/20 hover:border-primary
            transition-colors w-fit"
                >
                    <span className="material-symbols-outlined text-base">
                        arrow_back
                    </span>
                    Voltar
                </Link>
            </div>

            {children}
        </main>
    );
}
