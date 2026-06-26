import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-olympic-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="text-white font-bold">OlympicsConnect</span>
            </div>
            <p className="text-sm leading-relaxed">
              פלטפורמה דיגיטלית לחיבור ספורטאים אולימפיים עם נותני חסות, בהובלת הוועד האולימפי הישראלי.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">קישורים מהירים</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">ראשי</Link></li>
              <li><Link to="/athletes" className="hover:text-white transition-colors">ספורטאים</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">הוועד האולימפי הישראלי</h4>
            <p className="text-sm">
              <a href="https://www.olympic.org.il" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                olympic.org.il
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <p>© 2026 OlympicsConnect | פותח על ידי BuzzMarket</p>
          <div className="flex items-center gap-1 text-xs">
            <span>🇮🇱</span>
            <span>ישראל</span>
            <span className="mx-1">·</span>
            <span>OOO</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
