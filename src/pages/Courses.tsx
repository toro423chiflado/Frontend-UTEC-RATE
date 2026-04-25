import { useMemo, useState } from 'react'
import { BookOpen, Filter, Search } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import Pagination from '../components/Pagination'
import { courseService } from '../services/courseService'

const ITEMS_PER_PAGE = 6

function Courses() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const courses = courseService.getCourses()

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return courses
    }

    return courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(normalizedQuery) ||
        course.professor.toLowerCase().includes(normalizedQuery) ||
        course.code.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [courses, query])

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)

  const pagedCourses = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredCourses, safePage])

  const handleSearchChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <div className="space-y-8 animate-review-enter">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 border border-primary/20 mb-3">
            <BookOpen className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Catalogo Academico
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
            Todos los Cursos
          </h1>
          <p className="mt-2 text-secondary font-medium">
            Filtra por curso, codigo o profesor. Todo con datos mock paginados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Filtrar cursos..."
              className="h-11 w-64 rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 text-sm text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-secondary hover:text-white hover:bg-white/10 transition-all">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <Pagination
        currentPage={safePage}
        onPageChange={setPage}
        totalItems={filteredCourses.length}
        totalPages={totalPages}
      />
    </div>
  )
}

export default Courses
