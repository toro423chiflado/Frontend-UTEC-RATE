import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AIInsights from '../components/AIInsights'
import AddReviewForm from '../components/AddReviewForm'
import ReviewsList from '../components/ReviewsList'
import StarRating from '../components/StarRating'
import Pagination from '../components/Pagination'
import { courseService } from '../services/courseService'
import { reviewService } from '../services/reviewService'
import { studentService } from '../services/studentService'
import type { NewReview, Review } from '../types/review'
import type { Student } from '../types/student'
import { ArrowLeft, BookOpen, MessageCircle, Sparkles, User } from 'lucide-react'

const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0
  }

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  return totalRating / reviews.length
}

function CourseDetail() {
  const { id } = useParams()
  const parsedId = Number(id)
  const course = Number.isNaN(parsedId)
    ? undefined
    : courseService.getCourseById(parsedId)

  const [reviews, setReviews] = useState<Review[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [studentPage, setStudentPage] = useState(1)

  useEffect(() => {
    if (!course) {
      setReviews([])
      setStudents([])
      return
    }

    setReviews(reviewService.getReviewsByCourseId(course.id))
    setStudents(studentService.getStudentsByCourseId(course.id))
    setStudentPage(1)
  }, [course])

  const averageRating = useMemo(() => calculateAverageRating(reviews), [reviews])
  const studentsPerPage = 4
  const totalStudentPages = Math.max(1, Math.ceil(students.length / studentsPerPage))
  const safeStudentPage = Math.min(studentPage, totalStudentPages)
  const pagedStudents = useMemo(() => {
    const start = (safeStudentPage - 1) * studentsPerPage
    return students.slice(start, start + studentsPerPage)
  }, [safeStudentPage, students])

  const handleAddReview = (reviewData: NewReview) => {
    setReviews((previousReviews) => {
      const nextReview: Review = {
        id: Date.now(),
        rating: reviewData.rating,
        comment: reviewData.comment,
        author: 'Alumno UTEC',
      }

      return [nextReview, ...previousReviews]
    })
  }

  if (!course) {
    return (
      <section className="glass-panel rounded-[2.5rem] p-12 text-center border border-white/5 shadow-2xl">
        <h1 className="text-3xl font-bold text-white font-display">Curso no encontrado</h1>
        <p className="mt-4 text-secondary font-medium">
          El curso solicitado no está disponible en este momento.
        </p>
        <Link
          to="/courses"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-hover shadow-lg shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a cursos
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-8 animate-review-enter">
      {/* Back Button */}
      <Link 
        to="/courses" 
        className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al listado
      </Link>

      {/* Hero Header */}
      <article className="glass-panel relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BookOpen className="h-64 w-64 text-white" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Información del Curso
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl font-display mb-4">
            {course.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-lg text-secondary font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/5">
                <User className="h-4 w-4" />
              </div>
              <span>Prof. <span className="text-white">{course.professor}</span></span>
            </div>

            <div className="h-8 w-px bg-white/10 hidden md:block" />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-white">{averageRating.toFixed(1)}</span>
                <StarRating rating={averageRating} size="lg" />
              </div>
              <p className="text-sm font-bold text-secondary/60 uppercase tracking-widest">
                Rating Promedio
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-secondary font-medium">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span>Basado en <span className="text-white font-bold">{reviews.length} reseñas</span> verificadas</span>
          </div>
        </div>
      </article>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 gap-8">
        <AIInsights averageRating={averageRating} />
      </div>

      {/* Reviews & Form Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <AddReviewForm onAddReview={handleAddReview} />
        </div>
        <div className="lg:col-span-3">
          <ReviewsList reviews={reviews} />
        </div>
      </div>

      <section className="glass-panel rounded-[2rem] border border-white/5 p-6">
        <h2 className="text-xl font-bold text-white font-display">Alumnos inscritos</h2>
        <p className="mt-1 text-sm text-secondary">
          Lista simulada de estudiantes registrados en este curso.
        </p>

        <div className="mt-4 space-y-3">
          {pagedStudents.map((student) => (
            <article
              key={student.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-white">{student.name}</p>
                <p className="text-xs text-secondary">Carrera: {student.major}</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary/70">
                Sem {student.semester}
              </span>
            </article>
          ))}
        </div>

        <Pagination
          currentPage={safeStudentPage}
          onPageChange={setStudentPage}
          totalItems={students.length}
          totalPages={totalStudentPages}
        />
      </section>
    </div>
  )
}

export default CourseDetail
