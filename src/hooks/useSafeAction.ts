import { useConfirm } from '../contexts/ConfirmContext';
import { useToast } from '../contexts/ToastContext';

export function useSafeAction() {
    const { confirm } = useConfirm();
    const { show } = useToast();

    return async function safeAction(
        action: () => Promise<void | boolean>,
        options: {
            confirmTitle: string;
            confirmMessage: string;
            successMessage?: string;
            errorMessage?: string;
        }
    ) {
        const ok = await confirm({
            title: options.confirmTitle,
            message: options.confirmMessage,
        });

        if (!ok) return false;

        try {
            await action();
            if (options.successMessage) {
                show(options.successMessage, 'success');
            }
            return true;
        } catch (err: any) {
            show(
                err.message || options.errorMessage || 'Erro inesperado',
                'error'
            );
            return false;
        }
    };
}
