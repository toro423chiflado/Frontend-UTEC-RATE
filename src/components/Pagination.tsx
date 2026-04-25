interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  totalItems: number
  totalPages: number
}

function Pagination({
  currentPage,
  onPageChange,
  totalItems,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-secondary/70">
        {totalItems} registros
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-secondary transition hover:border-primary/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
              page === currentPage
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'border border-white/10 text-secondary hover:border-primary/40 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-secondary transition hover:border-primary/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Pagination
