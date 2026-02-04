interface Props<T> {
    title: string;
    icon: string;
    placeholder: string;
    search: string;
    onSearchChange: (v: string) => void;
    items: T[];
    loading: boolean;
    selectedId?: number;
    onSelect: (item: T) => void;
    renderItem: (item: T, selected: boolean) => React.ReactNode;
    pagination: React.ReactNode;
}

export function SelectableListSection<T>({
    title,
    icon,
    placeholder,
    search,
    onSearchChange,
    items,
    loading,
    selectedId,
    onSelect,
    renderItem,
    pagination,
}: Props<T>) {
    return (
        <section className="bg-white dark:bg-[#2d2518] p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">
                    {icon}
                </span>
                {title}
            </h3>

            <div className="relative mb-4">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a804c]">
                    search
                </span>

                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#f3efe7]
                    bg-background-light focus:ring-2 focus:ring-primary/50 outline-none"
                />
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto">
                {loading && (
                    <p className="text-sm text-[#9a804c]">Carregando...</p>
                )}

                {!loading && items.length === 0 && (
                    <p className="text-sm text-[#9a804c]">
                        Nenhum registro encontrado
                    </p>
                )}

                {items.map((item: any) => {
                    const selected = selectedId === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelect(item)}
                            className={`w-full rounded-lg border transition
                                ${selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-[#f3efe7] hover:bg-[#fcfaf8]'
                                }`}
                        >
                            {renderItem(item, selected)}
                        </button>
                    );
                })}
            </div>

            {pagination}
        </section>
    );
}
