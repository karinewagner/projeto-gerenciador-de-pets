import { useRef } from 'react';

interface Props {
    photoFile: File | null;
    fotoUrl?: string;
    onSelect: (file: File) => void;
    onRemovePhoto: () => void;
}

export function PetPhotoUpload({ photoFile, fotoUrl, onSelect, onRemovePhoto }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const previewUrl = photoFile
        ? URL.createObjectURL(photoFile)
        : fotoUrl;

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        onSelect(file);
    }

    console.log('previewUrl', previewUrl);


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
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">
                            Adicionar foto
                        </span>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <span className="material-symbols-outlined text-white text-3xl">
                            photo_camera
                        </span>
                    </div>
                </div>
            </div>

            {fotoUrl && onRemovePhoto ? (
                <button
                    type="button"
                    onClick={onRemovePhoto}
                    className="text-red-600 text-sm font-semibold hover:underline"
                >
                    Remover foto
                </button>
            ) : (
                <span className="text-primary text-sm font-semibold">
                    Sem foto
                </span>
            )}
        </div>
    );
}