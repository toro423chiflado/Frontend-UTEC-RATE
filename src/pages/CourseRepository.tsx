import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function CourseRepository() {
  const { courseId } = useParams()
  const { isProfessor, isStudent } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Repositorio del Curso {courseId}</h1>
      <p className="text-secondary mb-6">Sube documentos e imágenes relacionados al curso.</p>
      
      <div className="mb-8 p-6 bg-card-bg border border-card-border rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Subir Archivo</h3>
        <input type="file" className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Archivos Disponibles</h3>
        <ul className="space-y-2">
          <li className="p-4 bg-foreground/5 rounded-lg flex justify-between items-center text-sm text-secondary border border-card-border">
            <span>documento_importante.pdf</span>
            <button className="text-primary hover:underline">Descargar</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
