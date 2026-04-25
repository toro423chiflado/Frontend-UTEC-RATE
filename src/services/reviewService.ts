import type { Review } from '../types/review'

const reviewsByCourseId: Record<number, Review[]> = {
  1: [
    {
      id: 100,
      rating: 4,
      comment: 'Buen ritmo de clase y practicas semanales utiles.',
      author: 'Alumno UTEC',
    },
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
    {
      id: 101,
      rating: 5,
      comment: 'Las asesorias ayudan bastante para preparar examenes.',
      author: 'Alumno UTEC',
    },
    {
      id: 102,
      rating: 4,
      comment: 'Muy buenos ejemplos de complejidad temporal.',
      author: 'Alumno UTEC',
    },
    {
      id: 103,
      rating: 5,
      comment: 'Evalua con criterios claros y retroalimentacion rapida.',
      author: 'Alumno UTEC',
    },
    {
      id: 104,
      rating: 4,
      comment: 'El curso es intenso, pero se aprende bastante.',
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
    {
      id: 105,
      rating: 5,
      comment: 'Muy buen equilibrio entre teoria y laboratorios.',
      author: 'Alumno UTEC',
    },
    {
      id: 106,
      rating: 3,
      comment: 'Podria mejorar la explicacion de normalizacion.',
      author: 'Alumno UTEC',
    },
    {
      id: 107,
      rating: 4,
      comment: 'Proyecto final exigente pero bien planteado.',
      author: 'Alumno UTEC',
    },
    {
      id: 108,
      rating: 4,
      comment: 'Recomendado para fortalecer SQL.',
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
    {
      id: 109,
      rating: 5,
      comment: 'Explica arquitectura cloud con casos de industria.',
      author: 'Alumno UTEC',
    },
    {
      id: 110,
      rating: 4,
      comment: 'Laboratorios bien guiados y actualizados.',
      author: 'Alumno UTEC',
    },
    {
      id: 111,
      rating: 5,
      comment: 'Uno de los mejores cursos de la carrera.',
      author: 'Alumno UTEC',
    },
    {
      id: 112,
      rating: 4,
      comment: 'La carga es alta, pero el aprendizaje vale la pena.',
      author: 'Alumno UTEC',
    },
  ],
}

const getReviewsByCourseId = (courseId: number): Review[] => {
  const fallbackReviews: Review[] = [
    {
      id: Number(`${courseId}01`),
      rating: 4,
      comment: 'Buen curso en general y profesor con metodologia ordenada.',
      author: 'Alumno UTEC',
    },
    {
      id: Number(`${courseId}02`),
      rating: 4,
      comment: 'Se aprende bastante durante el ciclo academico.',
      author: 'Alumno UTEC',
    },
    {
      id: Number(`${courseId}03`),
      rating: 3,
      comment: 'Interesante contenido, pero con evaluaciones exigentes.',
      author: 'Alumno UTEC',
    },
    {
      id: Number(`${courseId}04`),
      rating: 5,
      comment: 'Muy recomendado para reforzar bases tecnicas.',
      author: 'Alumno UTEC',
    },
  ]

  const reviews = reviewsByCourseId[courseId] ?? fallbackReviews
  return reviews.map((review) => ({ ...review }))
}

export const reviewService = {
  getReviewsByCourseId,
}
