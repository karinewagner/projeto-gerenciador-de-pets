import { getPets } from '../services/petService';
import type { IPetContent } from '../types/pets';
import { usePaginatedList } from './usePaginatedList';

export function usePets(nome: string, raca: string) {
    return usePaginatedList<IPetContent>(
        getPets,
        nome,
        raca
    );
}
