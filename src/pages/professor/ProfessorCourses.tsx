import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfessorCourses() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Mis Cursos</h1>
      <p className="text-secondary mb-4">Selecciona un curso para ver el repositorio y subir contenido.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/courses/1/repository" className="p-6 bg-card-bg border border-card-border rounded-xl hover:bg-card-hover transition-colors">
          <h2 className="text-lg font-semibold text-foreground">Curso Ejemplo 1</h2>
        </Link>
      </div>
    </div>
  )
}
