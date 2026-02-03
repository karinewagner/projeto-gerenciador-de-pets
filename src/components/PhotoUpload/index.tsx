import { useEffect, useRef, useMemo } from 'react';

interface PhotoUploadProps {
    isSaving: boolean;
    file: File | null;
    imageUrl?: string;
    onSelect: (file: File) => void;
    onRemove?: () => void;

    emptyLabel?: string;
    removeLabel?: string;
    size?: number;
}

export function PhotoUpload({
    isSaving,
    file,
    imageUrl,
    onSelect,
    onRemove,
    emptyLabel = 'Adicionar foto',
    removeLabel = 'Remover foto',
    size = 128,
}: PhotoUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const previewUrl = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return imageUrl;
    }, [file, imageUrl]);

    useEffect(() => {
        return () => {
            if (file && previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [file, previewUrl]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        onSelect(selectedFile);
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                disabled={isSaving}
                onChange={handleFileChange}
            />

            <div
                className="relative group cursor-pointer"
                onClick={() => !isSaving && inputRef.current?.click()}
            >
                <div
                    className="rounded-full overflow-hidden border flex items-center justify-center"
                    style={{ width: size, height: size }}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm text-center px-2">
                            {emptyLabel}
                        </span>
                    )}

                    {!isSaving && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <span className="material-symbols-outlined text-white text-3xl">
                                photo_camera
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {imageUrl && onRemove ? (
                <button
                    type="button"
                    disabled={isSaving}
                    onClick={onRemove}
                    className="text-red-600 text-sm font-semibold hover:underline disabled:opacity-50"
                >
                    {removeLabel}
                </button>
            ) : (
                <span className="text-primary text-sm font-semibold">
                    Sem foto
                </span>
            )}
        </div>
    );
}
