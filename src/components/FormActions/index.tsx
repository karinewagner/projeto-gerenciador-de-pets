interface Props {
    isSaving: boolean;
    onCancel: () => void;
}

export function FormActions({ isSaving, onCancel }: Props) {
    return (
        <div className="flex justify-end gap-4 pt-8 border-t">
            <button
                type="button"
                onClick={onCancel}
                disabled={isSaving}
                className="h-12 px-6 rounded-xl font-bold"
            >
                Cancelar
            </button>

            <button
                type="submit"
                disabled={isSaving}
                className="h-12 px-6 rounded-xl font-bold bg-primary text-white flex items-center gap-2"
            >
                {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
        </div>
    );
}
