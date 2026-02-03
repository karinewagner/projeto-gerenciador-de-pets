interface InputProps {
    label: string;
    value: string | number;
    type?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export function FormInput({
    label,
    value,
    type = 'text',
    disabled = false,
    onChange,
}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">{label}</label>
            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className="h-14 rounded-xl px-4 border bg-[#fcfaf8] dark:bg-[#221c10]"
            />
        </div>
    );
}
