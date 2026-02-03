import { getTutors } from '../services/tutorService';
import type { ITutorContent } from '../types/tutors';
import { usePaginatedList } from './usePaginatedList';

export function useTutors(nome: string) {
    return usePaginatedList<ITutorContent>(
        getTutors,
        nome
    );
}
