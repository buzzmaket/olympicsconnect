import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'
import type { InquiryForm } from '../lib/api'

const schema = z.object({
  company_name: z.string().min(2, 'שם חברה נדרש'),
  contact_name: z.string().min(2, 'שם איש קשר נדרש'),
  contact_email: z.string().email('אימייל לא תקין'),
  phone: z.string().optional(),
  budget_range: z.enum(['low', 'mid', 'high', 'enterprise']),
  message: z.string().min(10, 'אנא כתוב הודעה קצרה'),
})

interface Props {
  athleteId: string
  athleteName: string
  onClose: () => void
}

export default function InquiryModal({ athleteId, athleteName, onClose }: Props) {
  const { t } = useTranslation()
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryForm>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: InquiryForm) => {
    setSending(true)
    try {
      await api.inquiries.create({ ...data, athlete_id: athleteId })
      setSuccess(true)
    } catch {
      alert('שגיאה בשליחת הפנייה')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-dark">{t('inquiry.title')}</h2>
            <p className="text-sm text-gray-500 mt-0.5">חסות עבור {athleteName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
            <X size={22} />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <Users size={56} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-dark mb-2">הפנייה נשלחה בהצלחה!</h3>
            <p className="text-gray-500 text-sm">{t('inquiry.success')}</p>
            <button onClick={onClose} className="btn-primary mt-6">סגור</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-dark mb-1 block">{t('inquiry.companyName')} *</label>
                <input {...register('company_name')} className="input-field w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
                {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-dark mb-1 block">{t('inquiry.contactName')} *</label>
                <input {...register('contact_name')} className="input-field w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
                {errors.contact_name && <p className="text-red-500 text-xs mt-1">{errors.contact_name.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-dark mb-1 block">{t('inquiry.email')} *</label>
                <input {...register('contact_email')} type="email" className="input-field w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
                {errors.contact_email && <p className="text-red-500 text-xs mt-1">{errors.contact_email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-dark mb-1 block">{t('inquiry.phone')}</label>
                <input {...register('phone')} type="tel" className="input-field w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-dark mb-1 block">{t('inquiry.budget')} *</label>
              <select {...register('budget_range')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue">
                <option value="low">{t('inquiry.budget_options.low')}</option>
                <option value="mid">{t('inquiry.budget_options.mid')}</option>
                <option value="high">{t('inquiry.budget_options.high')}</option>
                <option value="enterprise">{t('inquiry.budget_options.enterprise')}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-dark mb-1 block">{t('inquiry.message')} *</label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder={t('inquiry.messagePlaceholder')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-olympic-blue resize-none"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={sending} className="btn-primary w-full">
              {sending ? 'שולח...' : t('inquiry.send')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
