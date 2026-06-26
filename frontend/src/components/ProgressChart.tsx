import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot,
} from 'recharts'
import type { Achievement } from '../lib/api'

interface Props {
  achievements: Achievement[]
}

const medalScore = { gold: 3, silver: 2, bronze: 1, none: 0 }

export default function ProgressChart({ achievements }: Props) {
  const data = [...achievements]
    .sort((a, b) => a.year - b.year)
    .map((a) => ({
      year: a.year,
      score: medalScore[a.medal],
      competition: a.competition,
      medal: a.medal,
    }))

  if (data.length === 0) return null

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(v) => ['', 'ארד', 'כסף', 'זהב'][v] ?? ''}
            domain={[0, 3]}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(_: any, __: any, props: any) => [props.payload.competition, '']}
            labelFormatter={(l) => `שנת ${l}`}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#003DA5"
            strokeWidth={2.5}
            dot={<Dot r={5} fill="#C9A84C" stroke="#003DA5" strokeWidth={2} />}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
