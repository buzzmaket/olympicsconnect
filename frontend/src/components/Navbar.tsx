import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, User, Search } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

const NAV_LINKS = [
  { to: '/athletes', label: 'ספורטאים' },
  { to: '/athletes', label: 'ענפים' },
  { to: '/athletes', label: 'תקנות אולימפיות' },
  { to: '/athletes', label: 'אודות' },
  { to: '/athletes', label: 'חדשות' },
  { to: '/athletes', label: 'חסויות' },
  { to: '/athletes', label: 'צור קשר' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { user, signOut, enableDemoMode } = useAuthStore()
  const location = useLocation()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-lg overflow-hidden bg-olympic-blue flex items-center justify-center flex-shrink-0">
                <span className="text-2xl leading-none">🇮🇱</span>
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-[11px] font-bold text-olympic-blue tracking-widest uppercase">Israel</div>
                <div className="text-[10px] text-gray-400 tracking-[0.2em]">⬤ ⬤ ⬤</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-px h-8 bg-gray-200" />
              <span className="text-dark font-bold text-sm">OlympicsConnect</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = l.label === 'ספורטאים' && location.pathname.startsWith('/athletes')
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-olympic-blue bg-olympic-lightblue'
                      : 'text-gray-600 hover:text-olympic-blue hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-olympic-blue rounded-lg hover:bg-gray-50 transition-colors">
              <Search size={18} />
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm text-gray-600 hover:text-olympic-blue font-medium">
                    {t('nav.admin')}
                  </Link>
                )}
                {user.role === 'athlete' && (
                  <Link to="/portal" className="text-sm text-gray-600 hover:text-olympic-blue font-medium">
                    {t('nav.myProfile')}
                  </Link>
                )}
                <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                  {t('nav.logout')}
                </button>
                <div className="w-9 h-9 bg-olympic-blue rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={enableDemoMode}
                  className="text-xs text-gray-400 hover:text-olympic-blue px-2 py-1 transition-colors"
                >
                  Demo
                </button>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-olympic-blue px-3 py-2 rounded-lg border border-gray-200 hover:border-olympic-blue transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/login?signup=1"
                  className="btn-primary text-sm py-2 px-4"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-olympic-blue py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-3 flex gap-2">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center text-sm py-2 border border-gray-200 rounded-lg font-medium text-gray-700">
                  {t('nav.login')}
                </Link>
                <Link to="/login?signup=1" onClick={() => setOpen(false)} className="flex-1 btn-primary text-center text-sm py-2">
                  {t('nav.register')}
                </Link>
              </>
            ) : (
              <button onClick={() => { signOut(); setOpen(false) }} className="text-sm text-red-500 py-2 px-3">
                {t('nav.logout')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
