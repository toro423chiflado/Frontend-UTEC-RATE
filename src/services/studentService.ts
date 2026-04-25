import type { Student } from '../types/student'

const studentsByCourseId: Record<number, Student[]> = {
  1: [
    { id: 1, name: 'Camila Torres', major: 'CS', semester: 4 },
    { id: 2, name: 'Diego Flores', major: 'CS', semester: 5 },
    { id: 3, name: 'Andrea Ruiz', major: 'DS', semester: 4 },
    { id: 4, name: 'Mateo Pineda', major: 'CS', semester: 6 },
    { id: 5, name: 'Lucia Arias', major: 'SE', semester: 5 },
    { id: 6, name: 'Piero Yupanqui', major: 'CS', semester: 4 },
    { id: 7, name: 'Joaquin Salas', major: 'SE', semester: 6 },
    { id: 8, name: 'Valeria Cabanillas', major: 'DS', semester: 5 },
  ],
  2: [
    { id: 9, name: 'Daniel Poma', major: 'CS', semester: 5 },
    { id: 10, name: 'Karen Mendoza', major: 'SE', semester: 4 },
    { id: 11, name: 'Bruno Tello', major: 'CS', semester: 6 },
    { id: 12, name: 'Renata Soria', major: 'DS', semester: 6 },
    { id: 13, name: 'Alonso Chu', major: 'CS', semester: 5 },
    { id: 14, name: 'Maria Solis', major: 'SE', semester: 4 },
  ],
  3: [
    { id: 15, name: 'Ariana Vega', major: 'CS', semester: 7 },
    { id: 16, name: 'Sergio Diaz', major: 'DS', semester: 7 },
    { id: 17, name: 'Jimena Vera', major: 'CS', semester: 8 },
    { id: 18, name: 'Pablo Contreras', major: 'SE', semester: 7 },
    { id: 19, name: 'Natalia Valdez', major: 'CS', semester: 6 },
    { id: 20, name: 'Rodrigo Carrion', major: 'DS', semester: 8 },
  ],
}

const fallbackStudents: Student[] = [
  { id: 21, name: 'Alumno UTEC 1', major: 'CS', semester: 4 },
  { id: 22, name: 'Alumno UTEC 2', major: 'SE', semester: 5 },
  { id: 23, name: 'Alumno UTEC 3', major: 'DS', semester: 6 },
  { id: 24, name: 'Alumno UTEC 4', major: 'CS', semester: 7 },
  { id: 25, name: 'Alumno UTEC 5', major: 'SE', semester: 8 },
]

const getStudentsByCourseId = (courseId: number): Student[] => {
  return studentsByCourseId[courseId] ?? fallbackStudents
}

export const studentService = {
  getStudentsByCourseId,
}
