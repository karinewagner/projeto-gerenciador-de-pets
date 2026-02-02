import { PetPhotoUpload } from '../PetPhotoUpload';
import { PetFormActions } from '../PetFormActions';

import type { IPetContent } from '../../types/pets';

interface Props {
    pet: IPetContent;
    isEditing: boolean;
    photoFile: File | null;
    onChange: (pet: IPetContent) => void;
    setPhotoFile: (file: File) => void;
    onSave: (pet: IPetContent) => void;
    onCancel: () => void;
}

export function PetForm({ pet, onChange, onSave, photoFile, setPhotoFile, onCancel, isEditing }: Props) {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(pet);
    }

    return (
        <div className="max-w-[800px] w-full bg-white dark:bg-[#2d2618] rounded-xl border p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
                {isEditing ? 'Editar Pet' : 'Cadastrar Pet'}
            </h1>

            <PetPhotoUpload
                photoFile={photoFile}
                fotoUrl={pet.foto?.url}
                onSelect={setPhotoFile}
            />

            <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
                <Input
                    label="Nome do Pet"
                    value={pet.nome}
                    onChange={(v) => onChange({ ...pet, nome: v })}
                />

                <Input
                    label="Raça"
                    value={pet.raca}
                    onChange={(v) => onChange({ ...pet, raca: v })}
                />

                <Input
                    label="Idade (anos)"
                    type="number"
                    value={pet.idade}
                    onChange={(v) => onChange({ ...pet, idade: Number(v) })}
                />

                <PetFormActions onCancel={onCancel} />
            </form>
        </div>
    );
}

function Input({
    label,
    value,
    onChange,
    type = 'text',
}: {
    label: string;
    value: any;
    type?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-14 rounded-xl px-4 border bg-[#fcfaf8] dark:bg-[#221c10]"
            />
        </div>
    );
}