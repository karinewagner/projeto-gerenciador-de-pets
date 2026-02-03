import { useEffect, useState } from 'react';

interface FetchParams {
    nome?: string;
    raca?: string;
    page: number;
    size: number;
}

interface PaginatedResponse<T> {
    content: T[];
    pageCount: number;
}

export function usePaginatedList<T>(
    fetcher: (params: FetchParams) => Promise<PaginatedResponse<T>>,
    nome: string,
    raca?: string,
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [nome, raca]);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const response = await fetcher({
                    nome: nome || undefined,
                    raca: raca || undefined,
                    page,
                    size,
                });

                setData(response.content);
                setTotalPages(response.pageCount);
            } catch (err: any) {
                setError(err.message || 'Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [nome, raca, page, size]);

    return {
        data,
        loading,
        error,
        page,
        totalPages,
        setPage,
    };
}
