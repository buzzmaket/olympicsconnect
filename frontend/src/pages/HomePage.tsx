import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Trophy, Users, Activity } from 'lucide-react'
import { api } from '../lib/api'
import AthleteCard from '../components/AthleteCard'
import { DEMO_ATHLETES } from '../lib/demoData'

export default function HomePage() {
  const { t } = useTranslation()

  const { data } = useQuery({
    queryKey: ['athletes', 'featured'],
    queryFn: () => api.athletes.list({ per_page: '8', sort: 'achievements' }),
    placeholderData: { athletes: DEMO_ATHLETES.slice(0, 8), total: DEMO_ATHLETES.length, page: 1, per_page: 8 },
  })

  const athletes = data?.athletes ?? DEMO_ATHLETES.slice(0, 8)

  const stats = [
    { icon: Users, value: '234', label: t('home.stats.athletes') },
    { icon: Trophy, value: '48', label: t('home.stats.medals') },
    { icon: Activity, value: '12', label: t('home.stats.sports') },
    { icon: Users, value: '26', label: t('home.stats.sponsors') },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-bl from-olympic-blue via-blue-800 to-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-olympic-gold via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
              {t('home.hero.title')}
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-olympic-gold mb-6">
              {t('home.hero.subtitle')}
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl">
              {t('home.hero.description')}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/athletes" className="bg-white text-olympic-blue font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                {t('home.hero.cta')}
              </Link>
              <Link to="/athletes" className="border-2 border-white/50 text-white font-semibold px-8 py-3 rounded-xl hover:border-white transition-colors">
                לנותני חסות
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-olympic-lightblue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-olympic-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-dark">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured athletes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-dark">{t('home.featuredTitle')}</h2>
          <Link to="/athletes" className="text-sm text-olympic-blue font-medium hover:underline">
            {t('common.viewAll')} →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {athletes.map((a) => (
            <AthleteCard key={a.id} athlete={a} />
          ))}
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="bg-olympic-lightblue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users size={48} className="mx-auto text-olympic-blue mb-4" />
          <h2 className="text-3xl font-bold text-dark mb-3">{t('home.sponsorCta.title')}</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">{t('home.sponsorCta.description')}</p>
          <Link to="/athletes" className="btn-primary text-base px-10 py-3">
            {t('home.sponsorCta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
