import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Athlete } from '../lib/api'
import SportIcon from './SportIcon'

const MEDAL_STYLE: Record<string, { label: string; className: string }> = {
  gold:   { label: 'זהב',  className: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40' },
  silver: { label: 'כסף', className: 'bg-gray-300/20 text-gray-200 border border-gray-300/40' },
  bronze: { label: 'ארד', className: 'bg-orange-400/20 text-orange-300 border border-orange-400/40' },
}

const STATUS_LABEL: Record<string, string> = {
  olympic: 'אולימפי',
  hopeful: 'תקווה אולימפית',
  retired: 'בדימוס',
}

interface Props {
  athlete: Athlete
}

export default function AthleteCard({ athlete }: Props) {
  const [liked, setLiked] = useState(false)

  const medals = (athlete.achievements ?? [])
    .filter((a) => a.medal !== 'none')
    .reduce<Record<string, number>>((acc, a) => {
      acc[a.medal] = (acc[a.medal] ?? 0) + 1
      return acc
    }, {})

  const topMedals = (['gold', 'silver', 'bronze'] as const).filter((m) => medals[m])

  return (
    <Link
      to={`/athletes/${athlete.id}`}
      className="block group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Portrait photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        {athlete.avatar_url ? (
          <img
            src={athlete.avatar_url}
            alt={athlete.full_name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-olympic-lightblue flex items-center justify-center">
            <SportIcon sport={athlete.sport} size={56} />
          </div>
        )}

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Sport badge — top right */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
          <SportIcon sport={athlete.sport} size={16} />
        </div>

        {/* Heart — top left */}
        <button
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
          aria-label="שמור למועדפים"
        >
          <Heart
            size={15}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>

        {/* Bottom overlay: status + name */}
        <div className="absolute bottom-0 inset-x-0 p-3">
          {/* Status */}
          <div className="mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-olympic-blue/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
              {STATUS_LABEL[athlete.status] ?? athlete.status}
            </span>
          </div>

          {/* Name + verified */}
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-white text-base leading-tight drop-shadow-sm">
              {athlete.full_name}
            </h3>
            {athlete.is_verified && (
              <span title="מאומת" className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-olympic-blue text-[10px] font-black">✓</span>
              </span>
            )}
          </div>

          <p className="text-white/70 text-xs mt-0.5">{athlete.sport}</p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 bg-white">
        {/* Location + age */}
        <div className="flex items-center gap-1 text-xs text-gray-500 min-w-0">
          <span className="text-sm">🇮🇱</span>
          <span className="truncate">{athlete.city}</span>
          <span className="text-gray-300 flex-shrink-0">·</span>
          <span className="flex-shrink-0">גיל {athlete.age}</span>
        </div>

        {/* Medal pills */}
        <div className="flex gap-1 flex-shrink-0">
          {topMedals.slice(0, 2).map((m) => (
            <span key={m} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${MEDAL_STYLE[m].className} bg-opacity-100`}
              style={{ background: m === 'gold' ? '#f59e0b22' : m === 'silver' ? '#9ca3af22' : '#f97316220' }}
            >
              {m === 'gold' ? '🥇' : m === 'silver' ? '🥈' : '🥉'} ×{medals[m]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
