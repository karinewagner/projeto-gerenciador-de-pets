import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    createTutor,
    getTutorById,
    updateTutor,
    addTutorPhoto,
    removeTutorPhoto
} from '../../services/tutorService';

import type { ITutorContent } from '../../types/tutors';
import { TutorForm } from '../../components/TutorForm';

export function TutorFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [tutor, setTutor] = useState<ITutorContent>({
        id: 0,
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cpf: '',
        foto: {
            id: 0,
            nome: '',
            contentType: '',
            url: ''
        }
    });

    async function handleSave(updatedTutor: ITutorContent) {
        if (isSaving) return;

        try {
            setIsSaving(true);

            if (photoFile && id) {
                await addTutorPhoto(Number(id), photoFile);
            }

            if (!id) {
                await createTutor({
                    nome: updatedTutor.nome,
                    email: updatedTutor.email,
                    telefone: updatedTutor.telefone,
                    endereco: updatedTutor.endereco,
                    cpf: (updatedTutor.cpf),
                });
            } else {
                await updateTutor(Number(id), {
                    nome: updatedTutor.nome,
                    email: updatedTutor.email,
                    telefone: updatedTutor.telefone,
                    endereco: updatedTutor.endereco,
                    cpf: updatedTutor.cpf,
                });
            }

            navigate(-1);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleRemovePhoto() {
        if (!tutor.foto?.id || !id) return;

        try {
            await removeTutorPhoto(Number(id), tutor.foto.id);

            setTutor({
                ...tutor,
                foto: undefined,
            });

            setPhotoFile(null);

            navigate(`/tutors/${id}`);
        } catch (err: any) {
            alert(err.message);
        }
    }

    useEffect(() => {
        if (!id) return;

        async function loadPet() {

            try {
                const response = await getTutorById(Number(id));

                const foundTutor: ITutorContent = {
                    id: response.id,
                    nome: response.nome,
                    email: response.email,
                    telefone: response.telefone,
                    endereco: response.endereco,
                    cpf: response.cpf.toString(),
                    foto: response.foto,
                };

                setTutor(foundTutor);
            } catch (err) {
                alert(`erro getTutorById em TutorFormPage ${err}`);
            }
        }

        loadPet();
    }, [id]);

    return (
        <main className="flex-1 flex justify-center py-10 px-4">
            <TutorForm
                entity={tutor}
                isEditing={isEditing}
                isSaving={isSaving}
                onChange={setTutor}
                onSave={handleSave}
                photoFile={photoFile}
                setPhotoFile={setPhotoFile}
                onCancel={() => navigate(-1)}
                onRemovePhoto={handleRemovePhoto}
            />
        </main>
    );
}
