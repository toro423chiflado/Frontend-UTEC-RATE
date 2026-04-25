import type { Review } from '../types/review'

const reviewsByCourseId: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      rating: 5,
      comment: 'Explica muy bien',
      author: 'Alumno UTEC',
    },
    {
      id: 2,
      rating: 3,
      comment: 'Exigente pero justo',
      author: 'Alumno UTEC',
    },
  ],
  2: [
    {
      id: 3,
      rating: 4,
      comment: 'Material claro y evaluaciones retadoras',
      author: 'Alumno UTEC',
    },
    {
      id: 4,
      rating: 4,
      comment: 'Aprendes bastante durante el ciclo',
      author: 'Alumno UTEC',
    },
  ],
  3: [
    {
      id: 5,
      rating: 5,
      comment: 'Clases muy actualizadas y practicas',
      author: 'Alumno UTEC',
    },
    {
      id: 6,
      rating: 4,
      comment: 'Buen dominio tecnico en cada sesion',
      author: 'Alumno UTEC',
    },
  ],
}

const getReviewsByCourseId = (courseId: number): Review[] => {
  const reviews = reviewsByCourseId[courseId] ?? []
  return reviews.map((review) => ({ ...review }))
}

export const reviewService = {
  getReviewsByCourseId,
}
