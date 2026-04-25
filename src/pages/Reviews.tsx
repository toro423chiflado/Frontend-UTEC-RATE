import { useMemo, useState } from 'react'
import { Calendar, MessageSquare } from 'lucide-react'
import Pagination from '../components/Pagination'
import StarRating from '../components/StarRating'
import { myReviewService } from '../services/myReviewService'

const ITEMS_PER_PAGE = 4

function Reviews() {
  const reviews = myReviewService.getMyReviews()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE)
  const pagedReviews = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return reviews.slice(start, start + ITEMS_PER_PAGE)
  }, [page, reviews])

  return (
    <div className="space-y-8 animate-review-enter">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 border border-primary/20 mb-3">
          <MessageSquare className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Gestion de Contenido
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
          Mis Reseñas
        </h1>
        <p className="mt-2 text-secondary font-medium">
          Historial completo de tus comentarios y calificaciones mock.
        </p>
      </header>

      <section className="glass-panel rounded-[2rem] p-6 border border-white/5 shadow-2xl">
        <div className="space-y-4">
          {pagedReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">{review.courseName}</h2>
                  <p className="text-sm text-secondary">Profesor: {review.professor}</p>
                </div>
                <StarRating rating={review.rating} readOnly size="sm" />
              </div>

              <p className="mt-3 text-sm text-slate-200">"{review.comment}"</p>

              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary/70">
                <Calendar className="h-3.5 w-3.5" />
                {review.createdAt}
              </div>
            </article>
          ))}
        </div>

        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalItems={reviews.length}
          totalPages={totalPages}
        />
      </section>
    </div>
  )
}

export default Reviews
