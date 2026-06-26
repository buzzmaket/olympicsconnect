import { Link } from 'react-router-dom'
import { Trophy, Users, Activity, ArrowLeft, Star } from 'lucide-react'
import { DEMO_ATHLETES } from '../lib/demoData'
import AthleteCard from '../components/AthleteCard'

const STATS = [
  { icon: Users,    value: '234', label: 'ספורטאים רשומים',   color: 'text-olympic-blue' },
  { icon: Trophy,   value: '48',  label: 'מדליות אולימפיות',  color: 'text-olympic-gold' },
  { icon: Activity, value: '12',  label: 'ענפי ספורט',        color: 'text-green-500' },
  { icon: Star,     value: '26',  label: 'נותני חסות פעילים', color: 'text-purple-500' },
]

export default function HomePage() {
  const featured = DEMO_ATHLETES.slice(0, 8)

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-dark min-h-[520px] flex items-center">
        {/* Background: right half shows athlete photo grid */}
        <div className="absolute inset-0">
          {/* Collage */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-0.5 opacity-20 lg:opacity-25">
            {DEMO_ATHLETES.slice(0, 4).map((a) => (
              <div key={a.id} className="overflow-hidden">
                <img src={a.avatar_url} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
          {/* Left deep dark */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-dark/60 to-dark" />
          {/* Blue accent top-right */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-olympic-blue/20 rounded-full blur-3xl" />
          {/* Gold accent bottom */}
          <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-olympic-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">🇮🇱</span>
              <span className="text-white/60 text-sm font-semibold tracking-wider uppercase">הוועד האולימפי הישראלי</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-2">
              ספורטאי ישראל.
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-olympic-gold leading-[1.1] mb-6">
              ההשראה שלנו.
            </h2>

            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              היכנסו למאגר הספורטאים האולימפיים של ישראל, גלו את הסיפור שלהם, וחברו להזדמנויות חדשות בעולם הספורט.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                to="/athletes"
                className="bg-white text-olympic-blue font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                כל הספורטאים
                <ArrowLeft size={16} />
              </Link>
              <Link
                to="/login?signup=1"
                className="border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                לנותני חסות
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-gray-100">
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex items-center gap-4 py-6 px-6">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-dark">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured athletes ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-olympic-blue uppercase tracking-wider mb-1">ספורטאים מובילים</p>
            <h2 className="text-3xl font-bold text-dark">גאוות ישראל</h2>
          </div>
          <Link
            to="/athletes"
            className="flex items-center gap-1.5 text-sm font-semibold text-olympic-blue hover:underline"
          >
            כל הספורטאים
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((a) => (
            <AthleteCard key={a.id} athlete={a} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-olympic-blue uppercase tracking-wider mb-2">איך זה עובד</p>
            <h2 className="text-3xl font-bold text-dark">הפלטפורמה שמחברת</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🏅', title: 'גלו ספורטאים', desc: 'עיינו בפרופילים של ספורטאים אולימפיים ישראלים, הישגיהם וחזונם.' },
              { emoji: '🤝', title: 'צרו קשר', desc: 'שלחו פנייה לחסות ישירות לספורטאי שמתאים לערכי המותג שלכם.' },
              { emoji: '🚀', title: 'צמחו ביחד', desc: 'בנו שותפות ארוכת טווח שמייצרת ערך אמיתי לשני הצדדים.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center">
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="text-lg font-bold text-dark mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsor CTA ── */}
      <section className="bg-olympic-blue py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users size={52} className="mx-auto text-white/30 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">מעוניינים לשתף פעולה?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
            בואו להיות חלק מהמסע האולימפי שלנו. חברו בין המותג שלכם לאלופים הישראלים ובנו השפעה אמיתית.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/athletes" className="bg-white text-olympic-blue font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors">
              ראו את הספורטאים
            </Link>
            <Link to="/login?signup=1" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
              הצטרפו כנותן חסות
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
