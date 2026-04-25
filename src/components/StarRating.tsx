import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  onChange?: (value: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const stars = [1, 2, 3, 4, 5]

const sizeClassByVariant: Record<NonNullable<StarRatingProps['size']>, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4.5 w-4.5',
  lg: 'h-6 w-6',
}

function StarRating({ rating, onChange, readOnly = true, size = 'md' }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Calificación: ${rating} estrellas`}>
      {stars.map((starValue) => {
        const isFull = starValue <= Math.floor(rating)
        const isHalf = !isFull && starValue <= Math.ceil(rating) && (rating % 1 !== 0)

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            disabled={readOnly}
            className={`${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'
            } transition-all duration-200`}
          >
            <div className="relative">
              <Star 
                className={`${sizeClassByVariant[size]} ${
                  isFull 
                    ? 'fill-primary text-primary' 
                    : isHalf 
                      ? 'text-primary/30' 
                      : 'text-white/10'
                }`} 
              />
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className={`${sizeClassByVariant[size]} fill-primary text-primary`} />
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
