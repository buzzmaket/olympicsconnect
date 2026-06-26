import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Mail, Instagram, Facebook, Users, Calendar, Ruler, MapPin, Trophy } from 'lucide-react'
import { DEMO_ATHLETES } from '../lib/demoData'
import MedalBadge from '../components/MedalBadge'
import ProgressChart from '../components/ProgressChart'
import InquiryModal from '../components/InquiryModal'
import SportIcon from '../components/SportIcon'

type Tab = 'about' | 'achievements' | 'sponsors' | 'contact'

const TABS: { id: Tab; label: string }[] = [
  { id: 'about', label: 'אודות' },
  { id: 'achievements', label: 'הישגים' },
  { id: 'sponsors', label: 'חסויות' },
  { id: 'contact', label: 'יצירת קשר' },
]

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  olympic:  { label: 'אולימפי',          cls: 'bg-blue-50 text-olympic-blue border border-blue-200' },
  hopeful:  { label: 'תקווה אולימפית',   cls: 'bg-green-50 text-green-700 border border-green-200' },
  retired:  { label: 'בדימוס',           cls: 'bg-gray-50 text-gray-500 border border-gray-200' },
}

export default function AthleteProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState<Tab>('about')
  const [showInquiry, setShowInquiry] = useState(false)

  const athlete = DEMO_ATHLETES.find((a) => a.id === id) ?? DEMO_ATHLETES[0]
  const medals = (athlete.achievements ?? []).filter((a) => a.medal !== 'none')
  const sponsors = (athlete.sponsors ?? []).filter((s) => s.is_active)
  const sc = STATUS_CONFIG[athlete.status] ?? STATUS_CONFIG.hopeful

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Top stripe ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            <Link to="/" className="hover:text-olympic-blue transition-colors">ראשי</Link>
            <ChevronRight size={14} className="rotate-180" />
            <Link to="/athletes" className="hover:text-olympic-blue transition-colors">ספורטאים</Link>
            <ChevronRight size={14} className="rotate-180" />
            <span className="text-dark font-medium">{athlete.full_name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-4">

            {/* Photo card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative" style={{ aspectRatio: '3/4' }}>
                <img
                  src={athlete.avatar_url || 'https://via.placeholder.com/400x533'}
                  alt={athlete.full_name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-white">{athlete.full_name}</h1>
                    {athlete.is_verified && (
                      <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-olympic-blue text-[10px] font-black">✓</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-sm">
                    <SportIcon sport={athlete.sport} size={14} />
                    <span>{athlete.sport}</span>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-4 divide-x divide-x-reverse divide-gray-100 border-t border-gray-100">
                {[
                  { icon: <span className="text-base">{athlete.gender === 'female' ? '♀' : '♂'}</span>, label: 'מין', value: athlete.gender === 'female' ? 'נקבה' : 'זכר' },
                  { icon: <Ruler size={14} />, label: 'גובה', value: "מ' 1.65" },
                  { icon: <Calendar size={14} />, label: 'לידה', value: '12.06.1998' },
                  { icon: <span className="text-base">🎖️</span>, label: 'גיל', value: String(athlete.age) },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex flex-col items-center py-3 px-1 text-center">
                    <span className="text-gray-400 mb-1">{icon}</span>
                    <span className="text-xs font-bold text-dark">{value}</span>
                    <span className="text-[10px] text-gray-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Status badges */}
              <div className="px-4 pb-4 pt-3 flex flex-wrap gap-1.5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sc.cls}`}>{sc.label}</span>
                {medals.length > 0 && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                    נבחרת ישראל
                  </span>
                )}
                {medals.some((m) => m.medal === 'gold') && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                    🥇 סגל זהב
                  </span>
                )}
                {medals.some((m) => m.is_olympic) && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-olympic-lightblue text-olympic-blue border border-blue-200">
                    אולימפי
                  </span>
                )}
              </div>
            </div>

            {/* Inquiry CTA */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-olympic-lightblue rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-olympic-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-dark text-sm">מחפשת חסות</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    מעוניינת בשותפות עם מותגים מובילים שמאמינים בהישגים ושותפים לחלום האולימפי.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowInquiry(true)}
                className="btn-primary w-full text-sm py-2.5"
              >
                צור קשר לחסות
              </button>
            </div>

            {/* Active sponsors */}
            {sponsors.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-dark text-sm mb-3">חסויות פעילות</h3>
                <div className="space-y-2">
                  {sponsors.map((s) => (
                    <div key={s.id} className="flex items-center gap-3 bg-olympic-lightblue rounded-xl px-4 py-3">
                      {s.logo_url
                        ? <img src={s.logo_url} alt={s.company_name} className="h-7 w-auto object-contain" />
                        : <span className="font-bold text-olympic-blue text-lg">{s.company_name}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coaches */}
            {athlete.coaches && athlete.coaches.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-dark text-sm mb-3">מאמנים</h3>
                <div className="space-y-3">
                  {athlete.coaches.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-olympic-lightblue rounded-full flex items-center justify-center font-bold text-olympic-blue text-sm">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-dark">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>
            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex-shrink-0 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                      tab === t.id
                        ? 'border-olympic-blue text-olympic-blue bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-dark hover:bg-gray-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* ── אודות tab ── */}
                {tab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-dark mb-3">סיפור אישי</h2>
                      <p className="text-gray-600 leading-relaxed text-sm">{athlete.bio}</p>
                    </div>
                    {athlete.values && athlete.values.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-dark mb-2">ערכים</h3>
                        <div className="flex flex-wrap gap-2">
                          {athlete.values.map((v) => (
                            <span key={v} className="text-sm bg-olympic-lightblue text-olympic-blue px-3 py-1.5 rounded-full font-medium">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Contact snippets */}
                    <div>
                      <h3 className="text-sm font-bold text-dark mb-3">יצירת קשר</h3>
                      <div className="space-y-2">
                        <a href={`mailto:${athlete.full_name.toLowerCase().replace(' ', '.')}@olympic.org.il`}
                          className="flex items-center gap-2 text-sm text-gray-500 hover:text-olympic-blue transition-colors">
                          <Mail size={14} />
                          <span>{athlete.full_name.toLowerCase().replace(' ', '.')}@olympic.org.il</span>
                        </a>
                        <div className="flex gap-3 mt-1">
                          <Instagram size={18} className="cursor-pointer text-gray-400 hover:text-pink-500 transition-colors" />
                          <Facebook size={18} className="cursor-pointer text-gray-400 hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── הישגים tab ── */}
                {tab === 'achievements' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-dark">הישגים בולטים</h2>
                    <div className="space-y-2">
                      {(athlete.achievements ?? []).map((ach) => (
                        <div
                          key={ach.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-olympic-lightblue transition-colors"
                        >
                          <MedalBadge medal={ach.medal} />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold text-dark">{ach.competition}</span>
                            {ach.is_olympic && (
                              <span className="mr-2 text-xs bg-blue-50 text-olympic-blue px-2 py-0.5 rounded-full border border-blue-100">
                                אולימפי
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-bold text-gray-400 flex-shrink-0">{ach.year}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress chart */}
                    {(athlete.achievements?.length ?? 0) > 1 && (
                      <div>
                        <h2 className="text-lg font-bold text-dark mb-4">התקדמות לאורך זמן</h2>
                        <ProgressChart achievements={athlete.achievements!} />
                      </div>
                    )}
                  </div>
                )}

                {/* ── חסויות tab ── */}
                {tab === 'sponsors' && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-dark">חסויות</h2>
                    {sponsors.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sponsors.map((s) => (
                          <div key={s.id} className="bg-olympic-lightblue rounded-2xl p-6 flex items-center justify-center min-h-[100px]">
                            {s.logo_url
                              ? <img src={s.logo_url} alt={s.company_name} className="h-12 w-auto object-contain" />
                              : <span className="font-bold text-2xl text-olympic-blue">{s.company_name}</span>
                            }
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Trophy size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-400 text-sm">אין חסויות פעילות כרגע</p>
                        <button
                          onClick={() => setShowInquiry(true)}
                          className="mt-4 btn-primary text-sm"
                        >
                          הצע חסות
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── יצירת קשר tab ── */}
                {tab === 'contact' && (
                  <div className="space-y-5 max-w-md">
                    <h2 className="text-lg font-bold text-dark">יצירת קשר</h2>
                    <div className="space-y-3">
                      <a href={`mailto:${athlete.full_name.toLowerCase().replace(' ', '.')}@olympic.org.il`}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-olympic-lightblue transition-colors group">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Mail size={16} className="text-olympic-blue" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-0.5">אימייל</div>
                          <div className="text-sm font-medium text-dark group-hover:text-olympic-blue transition-colors">
                            {athlete.full_name.toLowerCase().replace(' ', '.')}@olympic.org.il
                          </div>
                        </div>
                      </a>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <MapPin size={16} className="text-olympic-blue" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-0.5">מיקום</div>
                          <div className="text-sm font-medium text-dark">{athlete.city}, ישראל 🇮🇱</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-pink-300 hover:text-pink-500 transition-colors">
                        <Instagram size={16} />
                        אינסטגרם
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
                        <Facebook size={16} />
                        פייסבוק
                      </button>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setShowInquiry(true)}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <Users size={16} />
                        שלח פנייה לחסות
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
