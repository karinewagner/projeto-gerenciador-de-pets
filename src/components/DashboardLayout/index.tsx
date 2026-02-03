interface DashboardLayoutProps {
    title: string;
    subtitle: string;
    onCreate: () => void;
    createLabel: string;
    children: React.ReactNode;
}

export function DashboardLayout({
    title,
    subtitle,
    onCreate,
    createLabel,
    children,
}: DashboardLayoutProps) {
    return (
        <main className="flex flex-1 justify-center pt-8">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="tracking-tight text-[32px] font-bold">
                            {title}
                        </h1>
                        <p className="text-[#9a804c]">{subtitle}</p>
                    </div>

                    <button
                        onClick={onCreate}
                        className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-primary px-5 font-bold shadow-sm hover:opacity-90"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add
                        </span>
                        <span>{createLabel}</span>
                    </button>
                </div>

                {children}
            </div>
        </main>
    );
}
