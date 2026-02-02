import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    createPet,
    getPetById,
    updatePet,
    addPetPhoto,
    removePetPhoto
} from '../../services/petService';

import type { IPetContent } from '../../types/pets';
import { PetForm } from '../../components/PetForm';

export function PetFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [photoFile, setPhotoFile] = useState<File | null>(null);
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
        try {
            if (photoFile && id) {
                await addPetPhoto(Number(id), photoFile);
            }

            if (!id) {
                await createPet({
                    nome: updatedPet.nome,
                    raca: updatedPet.raca,
                    idade: updatedPet.idade,
                });

            } else {
                await updatePet(Number(id), {
                    nome: updatedPet.nome,
                    raca: updatedPet.raca,
                    idade: updatedPet.idade,
                });
            }

            navigate(-1);
        } catch (err: any) {
            alert(err.message);
        }
    }

    async function handleRemovePhoto() {
        if (!pet.foto?.id || !id) return;

        try {
            await removePetPhoto(Number(id), pet.foto.id);

            setPet({
                ...pet,
                foto: undefined,
            });

            setPhotoFile(null);

            navigate(`/pets/${id}`);
        } catch (err: any) {
            alert(err.message);
        }
    }

    useEffect(() => {
        if (!id) return;

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
                photoFile={photoFile}
                setPhotoFile={setPhotoFile}
                onCancel={() => navigate(-1)}
                isEditing={isEditing}
                onRemovePhoto={handleRemovePhoto}
            />
        </main>
    );
}