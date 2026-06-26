import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Users, Instagram, Facebook, Mail } from 'lucide-react'
import { DEMO_ATHLETES } from '../lib/demoData'
import MedalBadge from '../components/MedalBadge'
import StatusBadge from '../components/StatusBadge'
import VerifiedBadge from '../components/VerifiedBadge'
import ProgressChart from '../components/ProgressChart'
import SponsorPanel from '../components/SponsorPanel'
import InquiryModal from '../components/InquiryModal'
import SportIcon from '../components/SportIcon'

export default function AthleteProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const [showInquiry, setShowInquiry] = useState(false)

  const athlete = DEMO_ATHLETES.find((a) => a.id === id) ?? DEMO_ATHLETES[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-400 mb-6">
        <Link to="/athletes" className="hover:text-olympic-blue transition-colors">
          חזרה לכל הספורטאים
        </Link>
        <ChevronRight size={14} className="rotate-180" />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-5">
          {/* Hero card */}
          <div className="card overflow-hidden">
            <div className="relative">
              <img
                src={athlete.avatar_url || 'https://via.placeholder.com/400x300'}
                alt={athlete.full_name}
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={athlete.status} />
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-2 mb-1">
                <h1 className="text-2xl font-bold text-dark">{athlete.full_name}</h1>
                {athlete.is_verified && <VerifiedBadge />}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <SportIcon sport={athlete.sport} size={16} />
                <span>{athlete.sport}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-olympic-lightblue rounded-lg py-2">
                  <div className="font-bold text-dark">{athlete.age}</div>
                  <div className="text-xs text-gray-400">גיל</div>
                </div>
                <div className="bg-olympic-lightblue rounded-lg py-2">
                  <div className="font-bold text-dark text-sm">{athlete.city}</div>
                  <div className="text-xs text-gray-400">עיר</div>
                </div>
                <div className="bg-olympic-lightblue rounded-lg py-2">
                  <div className="font-bold text-dark">{athlete.achievements?.filter((a) => a.medal !== 'none').length ?? 0}</div>
                  <div className="text-xs text-gray-400">מדליות</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {athlete.values.map((v) => (
                  <span key={v} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{v}</span>
                ))}
              </div>

              <button
                onClick={() => setShowInquiry(true)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Users size={16} />
                {t('profile.contact')}
              </button>
            </div>
          </div>

          {/* Coaches */}
          {athlete.coaches && athlete.coaches.length > 0 && (
            <div className="card p-4">
              <h3 className="font-semibold text-dark mb-3">מאמנים</h3>
              {athlete.coaches.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-olympic-lightblue rounded-full flex items-center justify-center text-sm font-bold text-olympic-blue">
                    {c.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-dark">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="card p-4">
            <h3 className="font-semibold text-dark mb-3">יצירת קשר</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <a href={`mailto:${athlete.full_name.toLowerCase().replace(' ', '.')}@olympic.org.il`} className="flex items-center gap-2 hover:text-olympic-blue">
                <Mail size={14} />
                <span>{athlete.full_name.toLowerCase().replace(' ', '.')}@olympic.org.il</span>
              </a>
              <div className="flex gap-3 mt-2">
                <Instagram size={18} className="cursor-pointer hover:text-pink-500 transition-colors" />
                <Facebook size={18} className="cursor-pointer hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* Collaborate CTA */}
          <div className="bg-olympic-blue rounded-xl p-5 text-white">
            <Users size={32} className="mb-2 text-olympic-gold" />
            <h3 className="font-bold mb-1">{t('profile.collaborate')}</h3>
            <p className="text-blue-100 text-sm mb-4">{t('profile.collaborateDesc')}</p>
            <button
              onClick={() => setShowInquiry(true)}
              className="bg-white text-olympic-blue font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors w-full"
            >
              {t('profile.inquiryButton')}
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-dark mb-4">סיפור אישי</h2>
            <p className="text-gray-600 leading-relaxed">{athlete.bio}</p>
          </div>

          {/* Active sponsor */}
          {athlete.sponsors && athlete.sponsors.length > 0 && (
            <SponsorPanel sponsors={athlete.sponsors} />
          )}

          {/* Achievements */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-dark mb-4">הישגים בולטים</h2>
            <div className="space-y-3">
              {athlete.achievements?.map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <MedalBadge medal={ach.medal} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-dark">{ach.competition}</span>
                    {ach.is_olympic && (
                      <span className="mr-2 text-xs bg-blue-50 text-olympic-blue px-1.5 py-0.5 rounded">אולימפי</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{ach.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress chart */}
          {athlete.achievements && athlete.achievements.length > 1 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-dark mb-4">התקדמות לאורך זמן</h2>
              <ProgressChart achievements={athlete.achievements} />
            </div>
          )}
        </div>
      </div>

      {showInquiry && (
        <InquiryModal
          athleteId={athlete.id}
          athleteName={athlete.full_name}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  )
}
