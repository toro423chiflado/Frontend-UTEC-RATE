import type { Course } from '../types/course'

const courses: Course[] = [
  { id: 1, name: 'Algoritmos', professor: 'Perez', rating: 4.5 },
  { id: 2, name: 'Base de Datos', professor: 'Gomez', rating: 4.2 },
  { id: 3, name: 'Cloud Computing', professor: 'Rojas', rating: 4.8 },
]

const getCourses = () => courses

const getCourseById = (id: number) => courses.find((course) => course.id === id)

export const courseService = {
  getCourseById,
  getCourses,
}
