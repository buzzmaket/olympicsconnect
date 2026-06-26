import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-olympic-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OC</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">OlympicsConnect</div>
                <div className="text-[10px] text-gray-500 tracking-wider">ISRAEL 🇮🇱</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              פלטפורמה דיגיטלית לחיבור ספורטאים אולימפיים עם נותני חסות, בהובלת הוועד האולימפי הישראלי.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook size={15} />
              </a>
              <a href="mailto:info@olympic.org.il" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">גילוי</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/athletes', label: 'כל הספורטאים' },
                { to: '/athletes', label: 'ענפי ספורט' },
                { to: '/athletes', label: 'אלופים אולימפיים' },
                { to: '/athletes', label: 'תקוות אולימפיות' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For sponsors */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">לנותני חסות</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/login?signup=1', label: 'הרשמה' },
                { to: '/login', label: 'כניסה' },
                { to: '/athletes', label: 'מצא ספורטאי' },
                { to: '/athletes', label: 'אופציות חסות' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Olympic committee */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">הוועד האולימפי</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://www.olympic.org.il" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  olympic.org.il
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">תקנון</a></li>
              <li><a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a></li>
              <li><a href="mailto:info@olympic.org.il" className="hover:text-white transition-colors">צור קשר</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© 2026 OlympicsConnect | פותח על ידי <span className="text-gray-400">BuzzMarket בע"מ</span></p>
          <div className="flex items-center gap-2">
            <span>🇮🇱 ישראל</span>
            <span>·</span>
            <span className="tracking-widest">⬤ ⬤ ⬤</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
