import { CheckCircle } from 'lucide-react'

export default function VerifiedBadge() {
  return (
    <span title="מאומת על ידי הוועד האולימפי">
      <CheckCircle size={18} className="text-olympic-blue fill-olympic-blue stroke-white" />
    </span>
  )
}
