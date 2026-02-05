import { useState } from 'react';

import { linkPetToTutor } from '../services/tutorService';
import { useSafeAction } from './useSafeAction';
import type { IPetContent } from '../types/pets';
import type { ITutorContent } from '../types/tutors';

export function useLinkPetTutor() {
    const safeAction = useSafeAction();

    const [selectedPet, setSelectedPet] = useState<IPetContent | null>(null);
    const [selectedTutor, setSelectedTutor] = useState<ITutorContent | null>(null);
    const [linking, setLinking] = useState(false);

    async function link() {
        if (!selectedPet || !selectedTutor) return;

        setLinking(true);

        const success = await safeAction(
            () => linkPetToTutor(selectedTutor.id, selectedPet.id),
            {
                confirmTitle: 'Vincular Pet',
                confirmMessage: `Deseja vincular o pet "${selectedPet.nome}" ao tutor "${selectedTutor.nome}"?`,
                successMessage: 'Pet vinculado ao tutor com sucesso!',
                errorMessage: 'Erro ao vincular pet ao tutor',
            }
        );

        if (success) {
            setSelectedPet(null);
            setSelectedTutor(null);
        }

        setLinking(false);
    }

    return {
        selectedPet,
        selectedTutor,
        setSelectedPet,
        setSelectedTutor,
        linking,
        link,
    };
}
