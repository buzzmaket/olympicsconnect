import { RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SPORTS = [
  'התעמלות אמנותית', 'שחייה', 'קייקינג', 'טניס', "גרו", 'אופניים', 'שייט', 'אתלטיקה',
]

interface Filters {
  sport: string
  gender: string
  status: string
  search: string
  sort: string
}

interface Props {
  filters: Filters
  onChange: (filters: Partial<Filters>) => void
  total: number
}

export default function FilterBar({ filters, onChange, total }: Props) {
  const { t } = useTranslation()

  const reset = () =>
    onChange({ sport: '', gender: '', status: '', search: '', sort: 'relevance' })

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
      {/* Search row */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder={t('athletes.search')}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-olympic-blue"
        />
        <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-olympic-blue px-3 py-2 border border-gray-200 rounded-lg transition-colors">
          <RefreshCw size={14} />
          {t('athletes.filters.reset')}
        </button>
      </div>

      {/* Filter dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <select
          value={filters.sport}
          onChange={(e) => onChange({ sport: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-olympic-blue"
        >
          <option value="">{t('athletes.filters.allSports')}</option>
          {SPORTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={filters.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-olympic-blue"
        >
          <option value="">{t('athletes.filters.allGenders')}</option>
          <option value="female">נקבה</option>
          <option value="male">זכר</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-olympic-blue"
        >
          <option value="">{t('athletes.filters.allStatuses')}</option>
          <option value="olympic">אולימפי</option>
          <option value="hopeful">תקווה אולימפית</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-olympic-blue"
        >
          <option value="relevance">רלוונטיות</option>
          <option value="name">שם</option>
          <option value="achievements">הישגים</option>
        </select>
      </div>

      {/* Results count */}
      <div className="mt-3 text-sm text-gray-500">
        <span className="font-semibold text-dark">{total}</span> {t('athletes.found')}
      </div>
    </div>
  )
}
