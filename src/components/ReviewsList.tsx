import { useMemo, useState } from 'react'
import { Calendar, MessageSquare } from 'lucide-react'
import Pagination from './Pagination'
import type { Review } from '../types/review'
import StarRating from './StarRating'

interface ReviewsListProps {
  reviews: Review[]
}

function ReviewsList({ reviews }: ReviewsListProps) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage))
  const safePage = Math.min(page, totalPages)
  const pagedReviews = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return reviews.slice(start, start + itemsPerPage)
  }, [reviews, safePage])

  return (
    <section className="glass-panel rounded-[2rem] p-6 border border-white/5 shadow-2xl h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/10">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display">Opiniones</h2>
          <p className="text-xs font-medium text-secondary">{reviews.length} testimonios</p>
        </div>
      </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-secondary/30" />
          </div>
          <p className="text-sm font-medium text-secondary/60">
            Aún no hay reseñas para este curso. <br />
            <span className="text-primary/70">¡Sé el primero en compartir tu experiencia!</span>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pagedReviews.map((review, i) => (
            <article
              key={review.id}
              style={{ animationDelay: `${i * 100}ms` }}
              className="animate-review-enter group rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-white/10 text-white font-bold text-xs">
                    {review.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none mb-1">{review.author}</p>
                    <div className="flex items-center gap-2 text-[10px] text-secondary/50 font-bold uppercase tracking-tighter">
                      <Calendar className="h-3 w-3" />
                      <span>Abril 2026</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 px-2 py-1.5 border border-white/5">
                  <StarRating rating={review.rating} readOnly size="sm" />
                </div>
              </div>

              <div className="relative">
                <p className="text-sm text-secondary leading-relaxed font-medium">
                  "{review.comment}"
                </p>
                <div className="absolute -top-2 -left-2 opacity-[0.03] text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017V21H14.017ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709C8.56937 16 9.01709 15.5523 9.01709 15V9C9.01709 8.44772 8.56937 8 8.01709 8H5.01709C3.91252 8 3.01709 7.10457 3.01709 6V3H10.017V21H3.01709Z" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination
        currentPage={safePage}
        onPageChange={setPage}
        totalItems={reviews.length}
        totalPages={totalPages}
      />
    </section>
  )
}

export default ReviewsList
