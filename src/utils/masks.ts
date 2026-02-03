export function maskCPF(cpf?: string | number) {
    if (!cpf) return '-';

    const digits = String(cpf).replace(/\D/g, '');

    if (digits.length !== 11) return '***.***.***-**';

    return `${digits.slice(0, 3)}.***.***-${digits.slice(9)}`;
}

export function maskPhone(phone?: string) {
    if (!phone) return '-';

    const digits = phone.replace(/\D/g, '');

    if (digits.length < 10) return '(**) *****-****';

    return `(${digits.slice(0, 2)}) *****-${digits.slice(-4)}`;
}

export function maskEmail(email?: string) {
    if (!email) return '-';

    const [user, domain] = email.split('@');
    if (!domain) return '***@***';

    return `${user.slice(0, 2)}***@${domain}`;
}
