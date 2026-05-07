import { useState } from 'react'
import { Users, GraduationCap, BookOpen, Layers } from 'lucide-react'
import AdminUsers from './admin/AdminUsers'
import AdminCareers from './admin/AdminCareers'
import AdminCourses from './admin/AdminCourses'
import AsignacionesPanel from './admin/AsignacionesPanel'

type AdminTab = 'Usuarios' | 'Carreras' | 'Cursos' | 'Asignaciones'

const TABS: { label: AdminTab; icon: React.ElementType }[] = [
  { label: 'Usuarios',     icon: Users        },
  { label: 'Carreras',     icon: GraduationCap },
  { label: 'Cursos',       icon: BookOpen      },
  { label: 'Asignaciones', icon: Layers        },
]

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('Cursos')

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 rounded-2xl border border-card-border bg-foreground/5 p-1 w-fit shadow-sm">
        {TABS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setTab(label)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              tab === label
                ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                : 'text-secondary hover:text-foreground hover:bg-foreground/5'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'Usuarios'     && <AdminUsers />}
      {tab === 'Carreras'     && <AdminCareers />}
      {tab === 'Cursos'       && <AdminCourses />}
      {tab === 'Asignaciones' && <AsignacionesPanel />}
    </div>
  )
}
