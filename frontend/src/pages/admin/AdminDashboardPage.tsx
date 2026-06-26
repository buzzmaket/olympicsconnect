import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Users, Inbox, Clock, CheckCircle, XCircle, Download } from 'lucide-react'
import { DEMO_ATHLETES } from '../../lib/demoData'
import StatusBadge from '../../components/StatusBadge'
import VerifiedBadge from '../../components/VerifiedBadge'

type Tab = 'overview' | 'athletes' | 'inquiries' | 'sponsors'

const DEMO_INQUIRIES = [
  { id: 'i1', athlete: 'דיאנה סוסונוב', company: 'Samsung Israel', email: 'marketing@samsung.co.il', budget: 'enterprise', status: 'accepted', date: '2024-03-15' },
  { id: 'i2', athlete: 'יונתן כהן', company: 'Bank Leumi', email: 'sponsor@leumi.co.il', budget: 'high', status: 'reviewing', date: '2024-04-02' },
  { id: 'i3', athlete: 'אנסטסיה גורבנקו', company: 'Maccabi Health', email: 'pr@maccabi.co.il', budget: 'mid', status: 'new', date: '2024-04-10' },
  { id: 'i4', athlete: 'עומר גולדשטיין', company: 'Shufersal', email: 'ads@shufersal.co.il', budget: 'mid', status: 'new', date: '2024-05-01' },
  { id: 'i5', athlete: 'שירה ראשוני', company: 'Strauss Group', email: 'sponsor@strauss.co.il', budget: 'high', status: 'reviewing', date: '2024-05-12' },
]

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'חדש', reviewing: 'בבדיקה', accepted: 'אושר', rejected: 'נדחה',
}

export default function AdminDashboardPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const stats = [
    { icon: Users, value: DEMO_ATHLETES.length, label: t('admin.stats.activeAthletes'), color: 'text-olympic-blue', bg: 'bg-blue-50' },
    { icon: Inbox, value: DEMO_INQUIRIES.filter((i) => i.status === 'new').length, label: t('admin.stats.newInquiries'), color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { icon: Users, value: 3, label: t('admin.stats.activeSponsors'), color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Clock, value: DEMO_ATHLETES.filter((a) => !a.is_verified).length, label: t('admin.stats.pendingApproval'), color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'סקירה' },
    { id: 'athletes', label: t('admin.athletes.title') },
    { id: 'inquiries', label: t('admin.inquiries.title') },
  ]

  const exportCSV = () => {
    const rows = [['שם', 'ענף', 'עיר', 'סטטוס', 'מאומת']]
    DEMO_ATHLETES.forEach((a) => rows.push([a.full_name, a.sport, a.city, a.status, a.is_verified ? 'כן' : 'לא']))
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'athletes.csv'
    link.click()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">{t('admin.title')}</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 btn-outline text-sm py-2">
          <Download size={14} />
          ייצוא CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, value, label, color, bg }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-3xl font-bold text-dark mb-0.5">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm py-2 px-5 rounded-lg font-medium transition-colors ${
              activeTab === tab.id ? 'bg-white shadow text-olympic-blue' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="font-bold text-dark mb-4">ספורטאים לאישור</h2>
            {DEMO_ATHLETES.filter((a) => !a.is_verified).map((a) => (
              <div key={a.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <img src={a.avatar_url} alt={a.full_name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-dark">{a.full_name}</div>
                  <div className="text-xs text-gray-400">{a.sport}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-green-600 hover:text-green-700 p-1"><CheckCircle size={16} /></button>
                  <button className="text-red-400 hover:text-red-500 p-1"><XCircle size={16} /></button>
                </div>
              </div>
            ))}
            {DEMO_ATHLETES.filter((a) => !a.is_verified).length === 0 && (
              <p className="text-sm text-gray-400">אין ספורטאים ממתינים לאישור</p>
            )}
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-dark mb-4">פניות חסות אחרונות</h2>
            {DEMO_INQUIRIES.slice(0, 5).map((inq) => (
              <div key={inq.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-dark">{inq.company}</div>
                  <div className="text-xs text-gray-400">עבור {inq.athlete}</div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[inq.status]}`}>
                  {STATUS_LABELS[inq.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Athletes management */}
      {activeTab === 'athletes' && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">ספורטאי</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">ענף</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">סטטוס</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">אימות</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DEMO_ATHLETES.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={a.avatar_url} alt={a.full_name} className="w-9 h-9 rounded-lg object-cover" />
                      <span className="font-medium text-dark">{a.full_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{a.sport}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3">
                    {a.is_verified ? <VerifiedBadge /> : <span className="text-xs text-gray-400">ממתין</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-olympic-blue hover:underline">עריכה</button>
                      {!a.is_verified && (
                        <button className="text-xs text-green-600 hover:underline">אשר</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inquiries management */}
      {activeTab === 'inquiries' && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">חברה</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">ספורטאי</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">תקציב</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">סטטוס</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">תאריך</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DEMO_INQUIRIES.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-dark">{inq.company}</div>
                      <div className="text-xs text-gray-400">{inq.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{inq.athlete}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {inq.budget === 'enterprise' ? 'Enterprise' : inq.budget === 'high' ? 'גבוה' : 'בינוני'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[inq.status]}`}>
                      {STATUS_LABELS[inq.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{inq.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
