import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Athlete } from '../lib/api'
import MedalBadge from './MedalBadge'
import StatusBadge from './StatusBadge'
import VerifiedBadge from './VerifiedBadge'
import SportIcon from './SportIcon'

interface Props {
  athlete: Athlete
}

export default function AthleteCard({ athlete }: Props) {
  const topMedal = athlete.achievements?.find((a) => a.medal !== 'none')

  return (
    <Link to={`/athletes/${athlete.id}`} className="card block group">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl aspect-[4/3] bg-olympic-lightblue">
        {athlete.avatar_url ? (
          <img
            src={athlete.avatar_url}
            alt={athlete.full_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            <SportIcon sport={athlete.sport} size={64} />
          </div>
        )}
        {/* Status top-right */}
        <div className="absolute top-2 left-2">
          <StatusBadge status={athlete.status} />
        </div>
        {/* Sport icon top-left */}
        <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
          <SportIcon sport={athlete.sport} size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-dark text-base group-hover:text-olympic-blue transition-colors">
            {athlete.full_name}
          </h3>
          {athlete.is_verified && <VerifiedBadge />}
        </div>

        <p className="text-sm text-gray-500 mb-2">{athlete.sport}</p>

        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <span className="text-base">🇮🇱</span>
          <MapPin size={12} />
          <span>{athlete.city}</span>
          <span className="mx-1">·</span>
          <span>גיל {athlete.age}</span>
        </div>

        {/* Medal badges */}
        {topMedal && topMedal.medal !== 'none' && (
          <div className="flex flex-wrap gap-1">
            <MedalBadge medal={topMedal.medal} />
          </div>
        )}

        <button className="mt-3 w-full text-center text-xs font-semibold text-olympic-blue border border-olympic-blue rounded-lg py-1.5 hover:bg-olympic-blue hover:text-white transition-colors">
          לפרופיל
        </button>
      </div>
    </Link>
  )
}
