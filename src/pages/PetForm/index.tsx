import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getPetById, updatePet } from '../../services/petService';
import { PetForm } from '../../components/PetForm';
import type { IPetContent } from '../../types/pets';

export function PetFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [pet, setPet] = useState<IPetContent>({
        id: 0,
        nome: '',
        raca: '',
        idade: 0,
        foto: {
            id: 0,
            nome: '',
            contentType: '',
            url: ''
        }
    });

    async function handleSave(updatedPet: IPetContent) {
        if (!id) return;

        try {
            await updatePet(Number(id), {
                nome: updatedPet.nome,
                raca: updatedPet.raca,
                idade: updatedPet.idade,
            });

            navigate('-1');
        } catch (err: any) {
            alert(err.message);
        }
    }

    useEffect(() => {
        async function loadPet() {

            try {
                const response = await getPetById(Number(id));

                const foundPet: IPetContent = {
                    id: response.id,
                    nome: response.nome,
                    raca: response.raca,
                    idade: response.idade,
                    foto: response.foto,
                };

                setPet(foundPet);
            } catch {
                console.log('erro getPetById em PetFormPage');
            }
        }

        loadPet();
    }, [id]);

    return (
        <main className="flex-1 flex justify-center py-10 px-4">
            <PetForm
                pet={pet}
                onChange={setPet}
                onSave={handleSave}
                onCancel={() => navigate(-1)}
                isEditing={isEditing}
            />
        </main>
    );
}