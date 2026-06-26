import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera, Plus, Eye, Save } from 'lucide-react'
import { DEMO_ATHLETES } from '../../lib/demoData'
import MedalBadge from '../../components/MedalBadge'

const profileSchema = z.object({
  full_name: z.string().min(2),
  sport: z.string().min(2),
  city: z.string().min(2),
  bio: z.string().min(10),
  age: z.number().min(14).max(60),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function AthletePortalPage() {
  const { t } = useTranslation()
  const athlete = DEMO_ATHLETES[0]
  const [activeTab, setActiveTab] = useState<'profile' | 'achievements' | 'inquiries' | 'preview'>('profile')
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: athlete.full_name,
      sport: athlete.sport,
      city: athlete.city,
      bio: athlete.bio,
      age: athlete.age,
    },
  })

  const onSave = (_data: ProfileForm) => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'profile', label: t('portal.editProfile') },
    { id: 'achievements', label: t('portal.myAchievements') },
    { id: 'inquiries', label: t('portal.myInquiries') },
    { id: 'preview', label: t('portal.preview') },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img src={athlete.avatar_url} alt={athlete.full_name} className="w-16 h-16 rounded-xl object-cover" />
          <button className="absolute -bottom-1 -left-1 bg-olympic-blue text-white rounded-full p-1">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-dark">{athlete.full_name}</h1>
          <p className="text-gray-500 text-sm">{athlete.sport}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 text-sm py-2 px-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'bg-white shadow text-olympic-blue' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit(onSave)} className="card p-6 space-y-5">
          <h2 className="text-lg font-bold text-dark">{t('portal.editProfile')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-dark mb-1 block">שם מלא *</label>
              <input {...register('full_name')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-dark mb-1 block">ענף ספורט *</label>
              <input {...register('sport')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-dark mb-1 block">עיר *</label>
              <input {...register('city')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
            </div>
            <div>
              <label className="text-sm font-medium text-dark mb-1 block">גיל *</label>
              <input {...register('age', { valueAsNumber: true })} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-dark mb-1 block">סיפור אישי *</label>
            <textarea {...register('bio')} rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue resize-none" />
          </div>

          <div>
            <label className="text-sm font-medium text-dark mb-1 block">תמונת פרופיל</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 hover:border-olympic-blue cursor-pointer transition-colors">
              <Camera size={24} className="mx-auto mb-2" />
              <p className="text-sm">{t('portal.uploadPhoto')}</p>
            </div>
          </div>

          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save size={16} />
            {saved ? 'נשמר!' : t('portal.saveChanges')}
          </button>
        </form>
      )}

      {/* Achievements tab */}
      {activeTab === 'achievements' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark">{t('portal.myAchievements')}</h2>
            <button className="flex items-center gap-2 text-sm btn-primary py-2">
              <Plus size={14} />
              {t('portal.addAchievement')}
            </button>
          </div>
          <div className="space-y-3">
            {athlete.achievements?.map((ach) => (
              <div key={ach.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <MedalBadge medal={ach.medal} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-dark">{ach.competition}</span>
                </div>
                <span className="text-sm text-gray-400">{ach.year}</span>
                <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">מחק</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiries tab */}
      {activeTab === 'inquiries' && (
        <div className="card p-6">
          <h2 className="text-lg font-bold text-dark mb-4">{t('portal.myInquiries')}</h2>
          <div className="space-y-3">
            {[
              { company: 'Samsung Israel', status: 'accepted', budget: 'high' },
              { company: 'Maccabi Health', status: 'reviewing', budget: 'mid' },
              { company: 'Bank Hapoalim', status: 'new', budget: 'enterprise' },
            ].map((inq, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <span className="font-medium text-dark text-sm">{inq.company}</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  inq.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  inq.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {inq.status === 'accepted' ? 'אושר' : inq.status === 'reviewing' ? 'בבדיקה' : 'חדש'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview tab */}
      {activeTab === 'preview' && (
        <div>
          <div className="flex items-center gap-2 mb-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <Eye size={16} className="text-yellow-600" />
            <p className="text-sm text-yellow-700">{t('portal.preview')} — כך הפרופיל שלך נראה לנותני חסות</p>
          </div>
          <div className="card p-6 opacity-80">
            <div className="flex items-center gap-4 mb-4">
              <img src={athlete.avatar_url} alt={athlete.full_name} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h2 className="text-xl font-bold text-dark">{athlete.full_name}</h2>
                <p className="text-gray-500">{athlete.sport} · {athlete.city}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{athlete.bio}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {athlete.achievements?.slice(0, 3).map((a) => (
                <MedalBadge key={a.id} medal={a.medal} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
