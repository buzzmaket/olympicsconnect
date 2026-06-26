const BASE_URL = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'שגיאה לא ידועה' }))
    throw new Error(err.detail || 'שגיאה בשרת')
  }
  return res.json()
}

export const api = {
  athletes: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : ''
      return request<AthletesResponse>(`/athletes${qs}`)
    },
    get: (id: string) => request<Athlete>(`/athletes/${id}`),
    create: (data: Partial<Athlete>) =>
      request<Athlete>('/athletes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Athlete>) =>
      request<Athlete>(`/athletes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/athletes/${id}`, { method: 'DELETE' }),
    publish: (id: string) =>
      request<Athlete>(`/athletes/${id}/publish`, { method: 'POST' }),
    achievements: {
      list: (id: string) => request<Achievement[]>(`/athletes/${id}/achievements`),
      add: (id: string, data: Partial<Achievement>) =>
        request<Achievement>(`/athletes/${id}/achievements`, {
          method: 'POST',
          body: JSON.stringify(data),
        }),
    },
  },
  achievements: {
    update: (id: string, data: Partial<Achievement>) =>
      request<Achievement>(`/achievements/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/achievements/${id}`, { method: 'DELETE' }),
  },
  inquiries: {
    create: (data: InquiryForm) =>
      request<SponsorshipInquiry>('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
    list: () => request<SponsorshipInquiry[]>('/inquiries'),
    get: (id: string) => request<SponsorshipInquiry>(`/inquiries/${id}`),
    updateStatus: (id: string, status: InquiryStatus) =>
      request<SponsorshipInquiry>(`/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
  },
  admin: {
    stats: () => request<AdminStats>('/admin/stats'),
    pending: () => request<Athlete[]>('/admin/athletes/pending'),
  },
}

// Types
export interface Athlete {
  id: string
  user_id?: string
  full_name: string
  sport: string
  age: number
  city: string
  status: 'olympic' | 'hopeful' | 'retired'
  gender: 'male' | 'female'
  bio: string
  values: string[]
  avatar_url: string
  is_verified: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  achievements?: Achievement[]
  sponsors?: Sponsor[]
  coaches?: Coach[]
}

export interface AthletesResponse {
  athletes: Athlete[]
  total: number
  page: number
  per_page: number
}

export interface Achievement {
  id: string
  athlete_id: string
  year: number
  competition: string
  medal: 'gold' | 'silver' | 'bronze' | 'none'
  description: string
  is_olympic: boolean
}

export interface SponsorshipInquiry {
  id: string
  athlete_id: string
  company_name: string
  contact_name: string
  contact_email: string
  message: string
  budget_range: 'low' | 'mid' | 'high' | 'enterprise'
  status: InquiryStatus
  created_at: string
}

export type InquiryStatus = 'new' | 'reviewing' | 'accepted' | 'rejected'

export interface InquiryForm {
  athlete_id: string
  company_name: string
  contact_name: string
  contact_email: string
  phone?: string
  message: string
  budget_range: 'low' | 'mid' | 'high' | 'enterprise'
}

export interface Sponsor {
  id: string
  athlete_id: string
  company_name: string
  logo_url: string
  start_date: string
  end_date?: string
  is_active: boolean
}

export interface Coach {
  name: string
  role: string
}

export interface AdminStats {
  total_athletes: number
  active_athletes: number
  new_inquiries: number
  active_sponsors: number
  pending_approval: number
}
