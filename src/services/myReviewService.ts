import type { MyReview } from '../types/myReview'

const myReviews: MyReview[] = [
  {
    id: 1,
    courseName: 'Cloud Computing',
    professor: 'Rojas',
    rating: 5,
    comment: 'Buena metodologia practica y ejemplos reales de arquitectura.',
    createdAt: '2026-04-10',
  },
  {
    id: 2,
    courseName: 'Base de Datos',
    professor: 'Gomez',
    rating: 4,
    comment: 'Muy ordenado en clase, pero los laboratorios son retadores.',
    createdAt: '2026-04-07',
  },
  {
    id: 3,
    courseName: 'Algoritmos',
    professor: 'Perez',
    rating: 5,
    comment: 'Explica con claridad y da feedback util en cada practica.',
    createdAt: '2026-04-05',
  },
  {
    id: 4,
    courseName: 'Sistemas Operativos',
    professor: 'Luna',
    rating: 4,
    comment: 'Interesante contenido, aunque la carga es alta.',
    createdAt: '2026-04-01',
  },
  {
    id: 5,
    courseName: 'Mineria de Datos',
    professor: 'Ramos',
    rating: 4,
    comment: 'Buen curso para analitica, falta un poco mas de casos reales.',
    createdAt: '2026-03-29',
  },
  {
    id: 6,
    courseName: 'Ingenieria de Software',
    professor: 'Torres',
    rating: 5,
    comment: 'Proyecto final muy bien planteado y con enfoque profesional.',
    createdAt: '2026-03-24',
  },
  {
    id: 7,
    courseName: 'Redes de Computadoras',
    professor: 'Valdivia',
    rating: 3,
    comment: 'Necesita mas laboratorios guiados para conceptos complejos.',
    createdAt: '2026-03-20',
  },
  {
    id: 8,
    courseName: 'Estructuras de Datos',
    professor: 'Quispe',
    rating: 5,
    comment: 'Excelente para consolidar bases tecnicas.',
    createdAt: '2026-03-16',
  },
  {
    id: 9,
    courseName: 'Inteligencia Artificial',
    professor: 'Salazar',
    rating: 4,
    comment: 'Muy buen contenido, falto mas tiempo para el proyecto final.',
    createdAt: '2026-03-12',
  },
  {
    id: 10,
    courseName: 'Matematica Discreta',
    professor: 'Castillo',
    rating: 4,
    comment: 'Material teorico claro y examenes alineados.',
    createdAt: '2026-03-08',
  },
]

const getMyReviews = () => myReviews

export const myReviewService = {
  getMyReviews,
}
