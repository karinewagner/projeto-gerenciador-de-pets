import { PetPhotoUpload } from '../PetPhotoUpload';
import { PetFormActions } from '../PetFormActions';

import type { IPetContent } from '../../types/pets';

interface Props {
    pet: IPetContent;
    isEditing: boolean;
    isSaving: boolean;
    photoFile: File | null;
    onChange: (pet: IPetContent) => void;
    setPhotoFile: (file: File) => void;
    onSave: (pet: IPetContent) => void;
    onCancel: () => void;
    onRemovePhoto: () => void;
}

export function PetForm({
    pet,
    isEditing,
    isSaving,
    photoFile,
    onChange,
    onSave,
    setPhotoFile,
    onCancel,
    onRemovePhoto
}: Props) {

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isSaving) return;
        onSave(pet);
    }

    return (
        <div className="max-w-[800px] w-full bg-white dark:bg-[#2d2618] rounded-xl border p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
                {isEditing ? 'Editar Pet' : 'Cadastrar Pet'}
            </h1>

            <PetPhotoUpload
                isSaving={isSaving}
                photoFile={photoFile}
                fotoUrl={pet.foto?.url}
                onSelect={setPhotoFile}
                onRemovePhoto={onRemovePhoto}
            />

            <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
                <Input
                    label="Nome do Pet"
                    disabled={isSaving}
                    value={pet.nome}
                    onChange={(v) => onChange({ ...pet, nome: v })}
                />

                <Input
                    label="Raça"
                    disabled={isSaving}
                    value={pet.raca}
                    onChange={(v) => onChange({ ...pet, raca: v })}
                />

                <Input
                    label="Idade (anos)"
                    disabled={isSaving}
                    type="number"
                    value={pet.idade}
                    onChange={(v) => onChange({ ...pet, idade: Number(v) })}
                />

                <PetFormActions
                    isSaving={isSaving}
                    onCancel={onCancel}
                />
            </form>
        </div>
    );
}

function Input({
    label,
    value,
    type = 'text',
    disabled = false,
    onChange,
}: {
    label: string;
    value: any;
    type?: string;
    disabled?: boolean;
    onChange: (v: string) => void
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">{label}</label>
            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className="h-14 rounded-xl px-4 border bg-[#fcfaf8] dark:bg-[#221c10]"
            />
        </div>
    );
}