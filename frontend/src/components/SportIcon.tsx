const sportEmojis: Record<string, string> = {
  'התעמלות אמנותית': '🎀',
  'שחייה': '🏊',
  'קייקינג': '🚣',
  'טניס': '🎾',
  'ג\'ודו': '🥋',
  "גרו": '🥋',
  'אופניים': '🚴',
  'שייט': '⛵',
  'קרב מגע': '🥊',
  'אתלטיקה': '🏃',
  'כדורסל': '🏀',
  'כדורגל': '⚽',
  'גלישה': '🏄',
  'טריאתלון': '🏅',
  'ירי': '🎯',
  'default': '🏅',
}

interface Props {
  sport: string
  size?: number
}

export default function SportIcon({ sport, size = 20 }: Props) {
  const emoji = sportEmojis[sport] ?? sportEmojis.default
  return (
    <span style={{ fontSize: size }} title={sport} role="img" aria-label={sport}>
      {emoji}
    </span>
  )
}
