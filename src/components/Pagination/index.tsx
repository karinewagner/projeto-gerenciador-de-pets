interface PaginationProps {
  page: number;          // zero-based
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxVisible / 2);

  let start = Math.max(0, page - half);
  let end = Math.min(totalPages - 1, page + half);

  // Ajusta quando está no começo
  if (page <= half) {
    start = 0;
    end = Math.min(totalPages - 1, maxVisible - 1);
  }

  // Ajusta quando está no final
  if (page + half >= totalPages) {
    start = Math.max(0, totalPages - maxVisible);
    end = totalPages - 1;
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-10 flex-wrap">
      {/* Anterior */}
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="flex size-10 items-center justify-center rounded-xl border disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {start > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            className="flex size-10 items-center justify-center rounded-xl border"
          >
            1
          </button>
          <span className="px-2 text-[#9a804c]">...</span>
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`flex size-10 items-center justify-center rounded-xl ${p === page
              ? 'bg-primary font-bold'
              : 'bg-white border'
            }`}
        >
          {p + 1}
        </button>
      ))}

      {end < totalPages - 1 && (
        <>
          <span className="px-2 text-[#9a804c]">...</span>
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className="flex size-10 items-center justify-center rounded-xl border"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Próximo */}
      <button
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="flex size-10 items-center justify-center rounded-xl border disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}