import { useState } from 'react';

import type { ITutorContent, TutorFormErrors } from '../../types/tutors';

import { FormActions } from '../FormActions';
import { FormInput } from '../FormInput';
import { PhotoUpload } from '../PhotoUpload';
import { tutorSchema } from '../../validations/tutor.schema';

interface Props {
    entity: ITutorContent;
    isEditing: boolean;
    isSaving: boolean;
    photoFile: File | null;
    setPhotoFile: (file: File | null) => void;
    onRemovePhoto: () => void;
    onChange: (tutor: ITutorContent) => void;
    onSave: any;
    onCancel: () => void;
}

export function TutorForm({
    entity: tutor,
    isEditing,
    isSaving,
    photoFile,
    onChange,
    onSave,
    setPhotoFile,
    onCancel,
    onRemovePhoto
}: Props) {
    const [errors, setErrors] = useState<TutorFormErrors>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = tutorSchema.safeParse(tutor);

        if (!result.success) {
            const fieldErrors =
                result.error.flatten((issue) => issue.message).fieldErrors;

            setErrors(fieldErrors);
            return;
        }

        const validData = result.data;
        onSave(validData);
    }

    return (
        <div className="max-w-[800px] w-full bg-white rounded-xl border p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
                {isEditing ? 'Editar Tutor' : 'Cadastrar Tutor'}
            </h1>

            {isEditing && (
                <PhotoUpload
                    isSaving={isSaving}
                    file={photoFile}
                    imageUrl={tutor.foto?.url}
                    onSelect={setPhotoFile}
                    onRemove={onRemovePhoto}
                    emptyLabel="Adicionar foto do tutor"
                />
            )}

            <form
                className="space-y-6"
                onSubmit={handleSubmit}
            >
                <FormInput
                    label="Nome"
                    value={tutor.nome}
                    disabled={isSaving}
                    error={errors.nome?.[0]}
                    onChange={(v) => onChange({ ...tutor, nome: v })}
                />

                <FormInput
                    label="CPF"
                    type="text"
                    value={tutor.cpf}
                    disabled={isSaving}
                    error={errors.cpf?.[0]}
                    onChange={(v) =>
                        onChange({
                            ...tutor,
                            cpf: v.replace(/\D/g, ''),
                        })
                    }
                />

                <FormInput
                    label="Email"
                    type="email"
                    value={tutor.email}
                    disabled={isSaving}
                    error={errors.email?.[0]}
                    onChange={(v) =>
                        onChange({ ...tutor, email: v })
                    }
                />

                <FormInput
                    label="Telefone (com DDD)"
                    type="text"
                    value={tutor.telefone}
                    disabled={isSaving}
                    error={errors.telefone?.[0]}
                    onChange={(v) =>
                        onChange({
                            ...tutor,
                            telefone: v.replace(/\D/g, ''),
                        })
                    }
                />

                <FormInput
                    label="Endereço"
                    value={tutor.endereco}
                    disabled={isSaving}
                    error={errors.endereco?.[0]}
                    onChange={(v) =>
                        onChange({ ...tutor, endereco: v })
                    }
                />

                <FormActions
                    isSaving={isSaving}
                    onCancel={onCancel}
                />
            </form>
        </div>
    );
}
