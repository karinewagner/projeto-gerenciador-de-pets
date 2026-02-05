import { createContext, useContext, useState } from 'react';

interface ConfirmOptions {
    title: string;
    message: string;
}

interface ConfirmContextData {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext({} as ConfirmContextData);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<(v: boolean) => void>();

    function confirm(opts: ConfirmOptions) {
        setOptions(opts);
        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    }

    function handleClose(result: boolean) {
        setOptions(null);
        resolver?.(result);
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {options && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-2">{options.title}</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            {options.message}
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => handleClose(false)}
                                className="px-4 py-2 rounded-lg border border-primary/20 hover:border-primary"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleClose(true)}
                                className="px-4 py-2 bg-primary text-white rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    return useContext(ConfirmContext);
}
