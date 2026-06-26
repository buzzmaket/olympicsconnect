import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AthletesPage from './pages/AthletesPage'
import AthleteProfilePage from './pages/AthleteProfilePage'
import AthletePortalPage from './pages/athletes/AthletePortalPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-rubik">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/athletes/:id" element={<AthleteProfilePage />} />
          <Route path="/portal" element={<AthletePortalPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
