import type { ActivityItem } from '../types/activity'

const activity: ActivityItem[] = [
  {
    id: 1,
    title: 'Resena publicada',
    description: 'Comentaste sobre Cloud Computing y actualizaste tu rating.',
    time: 'Hace 2 dias',
  },
  {
    id: 2,
    title: 'Curso guardado',
    description: 'Agregaste Inteligencia Artificial a tus favoritos.',
    time: 'Hace 3 dias',
  },
  {
    id: 3,
    title: 'Insight revisado',
    description: 'Consultaste tendencias de eleccion para ciclo 2026-1.',
    time: 'Hace 5 dias',
  },
  {
    id: 4,
    title: 'Resena editada',
    description: 'Actualizaste comentario en Base de Datos.',
    time: 'Hace 1 semana',
  },
  {
    id: 5,
    title: 'Curso visitado',
    description: 'Revisaste metricas de Sistemas Operativos.',
    time: 'Hace 1 semana',
  },
  {
    id: 6,
    title: 'Perfil actualizado',
    description: 'Completaste tus datos academicos de semestre.',
    time: 'Hace 2 semanas',
  },
]

const getActivity = () => activity

export const activityService = {
  getActivity,
}
