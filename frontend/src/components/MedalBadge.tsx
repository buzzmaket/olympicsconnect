interface Props {
  medal: 'gold' | 'silver' | 'bronze' | 'none'
  size?: 'sm' | 'md'
}

const config = {
  gold: { emoji: '🥇', label: 'זהב', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  silver: { emoji: '🥈', label: 'כסף', className: 'bg-gray-50 text-gray-600 border-gray-200' },
  bronze: { emoji: '🥉', label: 'ארד', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  none: { emoji: '🏆', label: 'הישג', className: 'bg-blue-50 text-blue-600 border-blue-200' },
}

export default function MedalBadge({ medal, size = 'sm' }: Props) {
  const c = config[medal]
  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full font-semibold ${c.className} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      }`}
    >
      <span>{c.emoji}</span>
      <span>{c.label}</span>
    </span>
  )
}
