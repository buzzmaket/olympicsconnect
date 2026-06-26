import type { Sponsor } from '../lib/api'

interface Props {
  sponsors: Sponsor[]
}

export default function SponsorPanel({ sponsors }: Props) {
  const active = sponsors.filter((s) => s.is_active)
  if (active.length === 0) return null

  return (
    <div className="bg-olympic-lightblue rounded-xl p-4">
      <h4 className="text-sm font-semibold text-gray-600 mb-3">חסויות פעילות</h4>
      <div className="flex flex-wrap gap-3">
        {active.map((s) => (
          <div key={s.id} className="bg-white rounded-lg px-4 py-3 shadow-sm flex items-center gap-3">
            {s.logo_url ? (
              <img src={s.logo_url} alt={s.company_name} className="h-8 w-auto object-contain" />
            ) : (
              <span className="font-bold text-olympic-blue">{s.company_name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
