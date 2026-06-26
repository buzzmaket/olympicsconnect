interface Props {
  status: 'olympic' | 'hopeful' | 'retired'
}

const config = {
  olympic: { label: 'אולימפי', className: 'badge-olympic' },
  hopeful: { label: 'תקווה אולימפית', className: 'badge-hopeful' },
  retired: { label: 'בדימוס', className: 'bg-gray-100 text-gray-500 border border-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full' },
}

export default function StatusBadge({ status }: Props) {
  const c = config[status]
  return <span className={c.className}>{c.label}</span>
}
