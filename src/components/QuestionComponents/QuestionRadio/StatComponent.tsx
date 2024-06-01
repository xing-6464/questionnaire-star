import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'

function format(n: number) {
  return (n * 100).toFixed(2)
}

function StatComponent({ stat }: QuestionRadioStatPropsType) {
  // count求和
  const sum = React.useMemo(() => {
    let s = 0
    stat.forEach(i => (s += i.count))
    return s
  }, [stat])

  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={i => `${i.name}: ${format(i.count / sum)}`}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
