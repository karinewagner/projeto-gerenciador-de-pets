import { Link } from 'react-router-dom';

interface BaseCardProps {
    to: string;
    imageUrl?: string;
    imageAlt?: string;
    title: string;
    badge?: string;
    subtitle?: string;
    description?: string;
}

export function BaseCard({
    to,
    imageUrl,
    imageAlt,
    title,
    badge,
    subtitle,
    description,
}: BaseCardProps) {
    return (
        <Link
            to={to}
            className="flex flex-col gap-3 pb-4 bg-white dark:bg-[#3a3225]
        rounded-xl overflow-hidden shadow-sm hover:shadow-md
        transition-shadow border border-[#f3efe7] dark:border-transparent"
        >
            <div
                className="relative w-full aspect-square bg-center bg-no-repeat bg-cover"
                data-alt={imageAlt}
                style={{
                    backgroundImage: imageUrl
                        ? `url("${imageUrl}")`
                        : undefined,
                }}
            />

            <div className="px-4 py-2">
                <div className="flex justify-between items-start mb-1 gap-2">
                    <p className="text-[#1b170d] dark:text-[#f3efe7]
            text-lg font-bold leading-normal">
                        {title}
                    </p>

                    {badge && (
                        <span className="text-xs font-semibold px-2 py-1
              bg-primary/10 text-primary rounded-full whitespace-nowrap">
                            {badge}
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className="text-[#9a804c] dark:text-[#c2ae85]
            text-sm font-medium">
                        {subtitle}
                    </p>
                )}

                {description && (
                    <p className="text-[#9a804c] dark:text-[#c2ae85]
            text-xs mt-1">
                        {description}
                    </p>
                )}
            </div>
        </Link>
    );
}
