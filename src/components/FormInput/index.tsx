interface FormInputProps {
    label: string;
    value: string | number;
    type?: string;
    disabled?: boolean;
    error?: string;
    onChange: (v: string) => void;
}

export function FormInput({
    label,
    value,
    type = 'text',
    disabled,
    error,
    onChange,
}: FormInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">{label}</label>

            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`h-14 rounded-xl px-4 border 
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
            />

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
}
