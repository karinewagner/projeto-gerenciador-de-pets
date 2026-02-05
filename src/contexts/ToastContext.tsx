import { createContext, useContext, useState } from 'react';

type ToastType = 'success' | 'error' | 'warning';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextData {
    show: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext({} as ToastContextData);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    function show(message: string, type: ToastType = 'success') {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter(t => t.id !== id));
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{ show }}>
            {children}

            <div className="fixed top-5 right-5 space-y-3 z-50">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`px-4 py-3 rounded-lg shadow-lg text-white
              ${toast.type === 'success' && 'bg-green-600'}
              ${toast.type === 'error' && 'bg-red-600'}
              ${toast.type === 'warning' && 'bg-yellow-500'}
            `}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
