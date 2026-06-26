import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn, enableDemoMode } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch {
      setError('אימייל או סיסמה שגויים')
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = () => {
    enableDemoMode()
    navigate('/admin')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-olympic-lightblue px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-olympic-blue rounded-xl mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">OC</span>
          </div>
          <h1 className="text-2xl font-bold text-dark">OlympicsConnect</h1>
          <p className="text-gray-500 text-sm mt-1">התחברות לפלטפורמה</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-dark mb-1 block">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-olympic-blue"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-dark mb-1 block">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-olympic-blue"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'מתחבר...' : 'התחברות'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400 mb-3">— או —</p>
          <button onClick={handleDemo} className="btn-outline w-full text-sm">
            כניסה כ-Demo (ללא הרשמה)
          </button>
        </div>
      </div>
    </div>
  )
}
