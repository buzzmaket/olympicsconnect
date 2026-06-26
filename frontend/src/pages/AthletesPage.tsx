import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, RefreshCw, Grid, List, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { DEMO_ATHLETES } from '../lib/demoData'
import AthleteCard from '../components/AthleteCard'
import type { Athlete } from '../lib/api'

const SPORTS = ['התעמלות אמנותית', 'שחייה', 'קייקינג', 'טניס', "גרו", 'אופניים', 'שייט', 'אתלטיקה']

interface Filters {
  sport: string
  gender: string
  status: string
  search: string
  sort: string
}

export default function AthletesPage() {
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

  const set = (f: Partial<Filters>) => { setFilters((p) => ({ ...p, ...f })); setPage(1) }
  const reset = () => set({ sport: '', gender: '', status: '', search: '', sort: 'relevance' })

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-dark min-h-[320px] flex items-center">
        {/* Photo collage background */}
        <div className="absolute inset-0 grid grid-cols-4" aria-hidden>
          {DEMO_ATHLETES.slice(0, 4).map((a) => (
            <div key={a.id} className="overflow-hidden">
              <img
                src={a.avatar_url}
                alt=""
                className="w-full h-full object-cover object-top opacity-40"
                style={{ minHeight: '320px' }}
              />
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-olympic-blue/80 via-dark/70 to-dark/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">ראשי</Link>
            <span>›</span>
            <span className="text-white">ספורטאים</span>
          </nav>
          <h1 className="text-5xl font-bold text-white leading-tight">
            ספורטאי ישראל.
          </h1>
          <h2 className="text-5xl font-bold text-olympic-gold leading-tight mb-4">
            ההשראה שלנו.
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            היכנסו למאגר הספורטאים האולימפיים והתקוות האולימפיות של ישראל, גלו את הסיפור שלהם והצטרפו למשפחה.
          </p>
        </div>
      </div>

      {/* ── Filter card ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
          {/* Search row */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => set({ search: e.target.value })}
                placeholder="חפש לפי שם, ענף או מילת מפתח..."
                className="w-full border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-olympic-blue focus:ring-1 focus:ring-olympic-blue/20 transition-colors"
              />
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-olympic-blue px-4 py-2.5 border border-gray-200 rounded-xl hover:border-olympic-blue transition-colors whitespace-nowrap"
            >
              <RefreshCw size={14} />
              אפס מסננים
            </button>
          </div>

          {/* Filter dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'ענף', value: filters.sport,
                onChange: (v: string) => set({ sport: v }),
                options: [['', 'כל הענפים'], ...SPORTS.map((s) => [s, s])],
              },
              {
                label: 'מין', value: filters.gender,
                onChange: (v: string) => set({ gender: v }),
                options: [['', 'הכל'], ['female', 'נקבה'], ['male', 'זכר']],
              },
              {
                label: 'סטטוס', value: filters.status,
                onChange: (v: string) => set({ status: v }),
                options: [['', 'הכל'], ['olympic', 'אולימפי'], ['hopeful', 'תקווה אולימפית']],
              },
              {
                label: 'מיין לפי', value: filters.sort,
                onChange: (v: string) => set({ sort: v }),
                options: [['relevance', 'רלוונטיות'], ['name', 'שם'], ['achievements', 'הישגים']],
              },
            ].map(({ label, value, onChange, options }) => (
              <div key={label} className="relative">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 px-1">{label}</label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-olympic-blue focus:ring-1 focus:ring-olympic-blue/20 bg-white pr-8 transition-colors"
                  >
                    {options.map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              <span className="font-bold text-dark text-base">{filtered.length}</span> ספורטאים נמצאו
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">
              מציג {paginated.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}–{Math.min(page * PER_PAGE, filtered.length)}
            </span>
            <div className="flex gap-0.5 border border-gray-200 rounded-lg p-0.5">
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-olympic-blue text-white' : 'text-gray-400 hover:text-gray-700'}`}
                aria-label="תצוגת רשת"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-olympic-blue text-white' : 'text-gray-400 hover:text-gray-700'}`}
                aria-label="תצוגת רשימה"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid / List */}
        {paginated.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg text-gray-400 font-medium">לא נמצאו ספורטאים התואמים את החיפוש</p>
            <button onClick={reset} className="mt-4 text-sm text-olympic-blue hover:underline">נקה מסננים</button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginated.map((a) => <AthleteCard key={a.id} athlete={a} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {paginated.map((a) => <AthleteListRow key={a.id} athlete={a} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-10 mb-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                  p === page
                    ? 'bg-olympic-blue text-white shadow-md shadow-olympic-blue/30'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-olympic-blue hover:text-olympic-blue'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Sponsor CTA ── */}
      <div className="bg-olympic-lightblue mt-12 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h2 className="text-2xl font-bold text-dark mb-2">מחפשים שותפות מנצחת?</h2>
          <p className="text-gray-600 mb-6">חברו בין העוסקים עם המותג שלכם למצוינות, התמדה והשראה. בחרו כותני ספורטאי לחזון שלכם.</p>
          <Link to="/login?signup=1" className="btn-primary text-sm px-8 py-3">
            הצטרפו כנותני חסות
          </Link>
        </div>
      </div>
    </div>
  )
}

function AthleteListRow({ athlete }: { athlete: Athlete }) {
  const topMedal = athlete.achievements?.find((a) => a.medal !== 'none')
  const MEDAL_EMOJI: Record<string, string> = { gold: '🥇', silver: '🥈', bronze: '🥉' }
  const medalEmoji = topMedal ? MEDAL_EMOJI[topMedal.medal] ?? null : null

  return (
    <Link
      to={`/athletes/${athlete.id}`}
      className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-olympic-blue hover:shadow-md transition-all group"
    >
      <img
        src={athlete.avatar_url || 'https://via.placeholder.com/60'}
        alt={athlete.full_name}
        className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-bold text-dark group-hover:text-olympic-blue transition-colors">{athlete.full_name}</span>
          {athlete.is_verified && <span className="text-olympic-blue text-xs">✓</span>}
        </div>
        <p className="text-sm text-gray-500 truncate">{athlete.sport} · {athlete.city} · גיל {athlete.age}</p>
      </div>
      {medalEmoji && <span className="text-xl flex-shrink-0">{medalEmoji}</span>}
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
        athlete.status === 'olympic' ? 'bg-blue-50 text-olympic-blue' : 'bg-green-50 text-green-700'
      }`}>
        {athlete.status === 'olympic' ? 'אולימפי' : 'תקווה אולימפית'}
      </span>
    </Link>
  )
}
