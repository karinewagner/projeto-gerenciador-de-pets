interface ListStateProps<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    emptyMessage: string;
    renderItem: (item: T) => React.ReactNode;
    gridClassName?: string;
}

export function ListState<T>({
    data,
    loading,
    error,
    emptyMessage,
    renderItem,
    gridClassName = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6',
}: ListStateProps<T>) {
    if (loading) {
        return (
            <div className="mt-10 text-center">
                <p>Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-10 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="mt-10 text-center">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <div className={gridClassName}>
                {data.map(renderItem)}
            </div>
        </div>
    );
}
