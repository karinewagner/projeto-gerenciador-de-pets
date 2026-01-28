import { useRef, useState } from 'react';

interface Props {
    petId: number;
    fotoUrl?: string;
    onUploaded: (newUrl: string) => void;
}

export function PetPhotoUpload({ petId, fotoUrl, onUploaded }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            // const response = await updatePetPhoto(petId, file);
            // onUploaded(response.url);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />

            <div
                className="relative group cursor-pointer"
                onClick={() => inputRef.current?.click()}
            >
                <div className="w-32 h-32 rounded-full overflow-hidden border flex items-center justify-center">
                    {fotoUrl ? (
                        <img src={fotoUrl} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400 text-sm">Sem foto</span>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <span className="material-symbols-outlined text-white text-3xl">
                            {loading ? 'hourglass_top' : 'photo_camera'}
                        </span>
                    </div>
                </div>
            </div>

            <span className="text-primary text-sm font-semibold">
                Clique para alterar a foto
            </span>
        </div>
    );
}