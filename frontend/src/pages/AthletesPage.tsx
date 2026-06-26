import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, List } from 'lucide-react'
import { DEMO_ATHLETES } from '../lib/demoData'
import AthleteCard from '../components/AthleteCard'
import FilterBar from '../components/FilterBar'
import type { Athlete } from '../lib/api'

interface Filters {
  sport: string
  gender: string
  status: string
  search: string
  sort: string
}

export default function AthletesPage() {
  const { t } = useTranslation()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({
    sport: '', gender: '', status: '', search: '', sort: 'relevance',
  })

  const PER_PAGE = 12

  const filtered = useMemo(() => {
    let list: Athlete[] = DEMO_ATHLETES

    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (a) => a.full_name.toLowerCase().includes(q) || a.sport.toLowerCase().includes(q) || a.city.toLowerCase().includes(q)
      )
    }
    if (filters.sport) list = list.filter((a) => a.sport === filters.sport)
    if (filters.gender) list = list.filter((a) => a.gender === filters.gender)
    if (filters.status) list = list.filter((a) => a.status === filters.status)

    if (filters.sort === 'name') list = [...list].sort((a, b) => a.full_name.localeCompare(b.full_name))
    if (filters.sort === 'achievements')
      list = [...list].sort((a, b) => (b.achievements?.length ?? 0) - (a.achievements?.length ?? 0))

    return list
  }, [filters])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilterChange = (f: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...f }))
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">{t('athletes.title')}</h1>

      <FilterBar filters={filters} onChange={handleFilterChange} total={filtered.length} />

      {/* View toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          מציג {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} מתוך {filtered.length}
        </span>
        <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5">
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded ${view === 'grid' ? 'bg-olympic-blue text-white' : 'text-gray-400 hover:text-gray-700'}`}
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded ${view === 'list' ? 'bg-olympic-blue text-white' : 'text-gray-400 hover:text-gray-700'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">{t('athletes.noResults')}</p>
        </div>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5' : 'flex flex-col gap-3'}>
          {paginated.map((a) =>
            view === 'grid' ? (
              <AthleteCard key={a.id} athlete={a} />
            ) : (
              <AthleteListRow key={a.id} athlete={a} />
            )
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => { setPage(p); window.scrollTo(0, 0) }}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                p === page ? 'bg-olympic-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-olympic-blue'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function AthleteListRow({ athlete }: { athlete: Athlete }) {
  return (
    <a href={`/athletes/${athlete.id}`} className="card flex items-center gap-4 p-4 hover:border-olympic-blue border transition-colors">
      <img
        src={athlete.avatar_url || 'https://via.placeholder.com/60'}
        alt={athlete.full_name}
        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-dark">{athlete.full_name}</h3>
          {athlete.is_verified && <span className="text-olympic-blue text-xs">✓</span>}
        </div>
        <p className="text-sm text-gray-500">{athlete.sport} · {athlete.city} · גיל {athlete.age}</p>
      </div>
      <span className="text-sm text-olympic-blue font-medium hidden sm:block">
        {athlete.status === 'olympic' ? 'אולימפי' : 'תקווה אולימפית'}
      </span>
    </a>
  )
}
