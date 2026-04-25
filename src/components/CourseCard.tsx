import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import StarRating from './StarRating'
import { ArrowSquareOut, BookBookmark, UserCircle } from '@phosphor-icons/react'

interface CourseCardProps {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="group glass-card relative flex flex-col overflow-hidden rounded-[2rem] p-6"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 transition-all duration-300 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-md border border-primary/20">
          <ArrowSquareOut size={20} weight="bold" />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-3">
            <BookBookmark size={24} weight="duotone" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display leading-tight group-hover:text-primary transition-colors">
              {course.name}
            </h3>
            <p className="text-xs font-bold text-secondary/50 uppercase tracking-widest mt-0.5">
              {course.code}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-secondary font-medium">
            <UserCircle size={18} weight="bold" className="text-primary/60" />
            <span>Prof. <span className="text-white">{course.professor}</span></span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">Calificación</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white">{course.rating.toFixed(1)}</span>
                <StarRating rating={course.rating} />
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">Reseñas</p>
              <p className="text-sm font-bold text-white">{course.reviewsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
