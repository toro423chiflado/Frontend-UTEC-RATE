import { FormEvent, useState } from 'react'
import type { NewReview } from '../types/review'
import StarRating from './StarRating'
import { Send, MessageSquarePlus, AlertCircle } from 'lucide-react'

interface AddReviewFormProps {
  onAddReview: (review: NewReview) => void
}

function AddReviewForm({ onAddReview }: AddReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const isSubmitDisabled = rating === 0 || comment.trim().length === 0
  const showValidationMessage =
    isSubmitDisabled && (rating > 0 || comment.trim().length > 0)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitDisabled) {
      return
    }

    onAddReview({
      rating,
      comment: comment.trim(),
    })

    setRating(0)
    setComment('')
  }

  return (
    <section className="glass-panel rounded-[2rem] p-6 border border-white/5 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/10">
          <MessageSquarePlus className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white font-display">Nueva Reseña</h2>
          <p className="text-xs font-medium text-secondary">Tu opinión ayuda a la comunidad</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">
            Calificación General
          </label>
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 border border-white/5">
            <StarRating rating={rating} onChange={setRating} readOnly={false} size="lg" />
            <span className="text-sm font-bold text-white">
              {rating > 0 ? `${rating}.0 / 5` : 'Selecciona'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">
            Tu Comentario
          </label>
          <div className="relative">
            <textarea
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="¿Qué te pareció el curso? ¿Cómo es la metodología del profesor?"
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10 text-sm leading-relaxed"
            />
          </div>
        </div>

        {showValidationMessage && (
          <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 animate-review-enter">
            <AlertCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs font-medium text-secondary leading-relaxed">
              Necesitas una calificación y un comentario para publicar tu reseña.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="group relative w-full overflow-hidden rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 shadow-lg shadow-primary/20"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Send className="h-4 w-4" />
            Publicar Reseña
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </form>
    </section>
  )
}

export default AddReviewForm
