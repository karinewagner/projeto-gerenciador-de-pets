import { useState } from 'react';
import { linkPetToTutor } from '../services/tutorService';
import type { IPetContent } from '../types/pets';
import type { ITutorContent } from '../types/tutors';

export function useLinkPetTutor() {
    const [selectedPet, setSelectedPet] = useState<IPetContent | null>(null);
    const [selectedTutor, setSelectedTutor] = useState<ITutorContent | null>(null);
    const [linking, setLinking] = useState(false);

    async function link() {
        if (!selectedPet || !selectedTutor) return;

        try {
            setLinking(true);
            await linkPetToTutor(selectedTutor.id, selectedPet.id);
            alert('Pet vinculado ao tutor com sucesso!');
            setSelectedPet(null);
            setSelectedTutor(null);
        } catch (err: any) {
            alert(err.message || 'Erro ao vincular pet ao tutor');
        } finally {
            setLinking(false);
        }
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
