import { useState } from 'react';

import type { IPetContent, PetFormErrors } from '../../types/pets';
import { petSchema } from '../../validations/pet.schema';

import { FormInput } from '../FormInput';
import { FormActions } from '../FormActions';
import { PhotoUpload } from '../PhotoUpload';

interface Props {
    entity: IPetContent;
    isEditing: boolean;
    isSaving: boolean;
    photoFile: File | null;
    setPhotoFile: (file: File | null) => void;
    onRemovePhoto: () => void;
    onChange: (pet: IPetContent) => void;
    onSave: any;
    onCancel: () => void;
}

export function PetForm({
    entity: pet,
    isEditing,
    isSaving,
    photoFile,
    onChange,
    onSave,
    setPhotoFile,
    onCancel,
    onRemovePhoto
}: Props) {
    const [errors, setErrors] = useState<PetFormErrors>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = petSchema.safeParse({
            nome: pet.nome,
            raca: pet.raca,
            idade: pet.idade,
        });

        if (!result.success) {
            const fieldErrors =
                result.error.flatten((issue) => issue.message).fieldErrors;

            setErrors(fieldErrors);
            return;
        }

        onSave(result.data);
    }

    return (
        <div className="max-w-[800px] w-full bg-white rounded-xl border p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
                {isEditing ? 'Editar Pet' : 'Cadastrar Pet'}
            </h1>

            {isEditing && (
                <PhotoUpload
                    isSaving={isSaving}
                    file={photoFile}
                    imageUrl={pet.foto?.url}
                    onSelect={setPhotoFile}
                    onRemove={onRemovePhoto}
                    emptyLabel="Adicionar foto do pet"
                />
            )}

            <form
                className="space-y-6 mt-10"
                onSubmit={handleSubmit}
            >
                <FormInput
                    label="Nome"
                    value={pet.nome}
                    disabled={isSaving}
                    error={errors.nome?.[0]}
                    onChange={(v) => onChange({ ...pet, nome: v })}
                />

                <FormInput
                    label="Raça"
                    value={pet.raca}
                    disabled={isSaving}
                    error={errors.raca?.[0]}
                    onChange={(v) => onChange({ ...pet, raca: v })}
                />

                <FormInput
                    label="Idade"
                    type="number"
                    value={pet.idade}
                    disabled={isSaving}
                    error={errors.idade?.[0]}
                    onChange={(v) => onChange({ ...pet, idade: Number(v) })}
                />

                <FormActions
                    isSaving={isSaving}
                    onCancel={onCancel}
                />
            </form>
        </div>
    );
}
