import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScorePieChartProps {
  score: number;
  size?: number;
}

const getColor = (score: number) => {
  if (score >= 80) return "#22c55e"; // green-500
  if (score >= 50) return "#eab308"; // yellow-500
  return "#ef4444"; // red-500
};

export const ScorePieChart = ({ score, size = 80 }: ScorePieChartProps) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const color = getColor(score);

  return (
    <ResponsiveContainer width={size} height={size}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={size * 0.3}
          outerRadius={size * 0.4}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          <Cell key="cell-0" fill={color} />
          <Cell key="cell-1" fill="#e2e8f0" /> {/* tailwindcss gray-200 */}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold" fill={color}>
          {score}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};