import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, User } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { user, signOut, enableDemoMode } = useAuthStore()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/athletes', label: t('nav.athletes') },
  ]

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-olympic-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">OC</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-olympic-blue font-bold text-lg leading-tight">OlympicsConnect</div>
              <div className="text-gray-500 text-xs">ספורטאי ישראל</div>
            </div>
          </Link>

          {/* Israel flag + Olympic rings badge */}
          <div className="hidden md:flex items-center gap-1">
            <span className="text-2xl">🇮🇱</span>
            <span className="text-xs text-gray-400 font-semibold">OOO</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-olympic-blue border-b-2 border-olympic-blue pb-0.5' : 'text-gray-600 hover:text-olympic-blue'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
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
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  {t('nav.logout')}
                </button>
                <div className="w-8 h-8 bg-olympic-blue rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={enableDemoMode}
                  className="text-sm text-gray-500 hover:text-olympic-blue transition-colors"
                >
                  Demo
                </button>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-olympic-blue">
                  {t('nav.login')}
                </Link>
                <Link to="/login?signup=1" className="btn-primary text-sm py-2 px-4">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              {l.label}
            </NavLink>
          ))}
          {!user && (
            <Link to="/login" onClick={() => setOpen(false)} className="btn-primary text-center">
              {t('nav.login')}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
