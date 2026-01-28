interface Props {
    onCancel: () => void;
}

export function PetFormActions({ onCancel }: Props) {
    return (
        <div className="flex justify-end gap-4 pt-8 border-t">
            <button
                type="button"
                onClick={onCancel}
                className="h-12 px-6 rounded-xl font-bold hover:bg-gray-100"
            >
                Cancelar
            </button>

            <button
                type="submit"
                className="h-12 px-6 rounded-xl font-bold text-white bg-primary flex items-center gap-2"
            >
                <span className="material-symbols-outlined">save</span>
                Salvar
            </button>
        </div>
    );
}