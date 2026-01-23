'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { JobApplication } from '@/lib/data-analysis';

interface JobStatsProps {
  applications: JobApplication[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function JobStats({ applications }: JobStatsProps) {
  // Process Status Data
  const statusCounts: Record<string, number> = {};
  applications.forEach(app => {
    // Remove emojis and trim
    const cleanStatus = app.status.replace(/[\u{1F600}-\u{1F6FF}|[\u{2600}-\u{26FF}]/gu, '').trim() || 'Unknown';
    statusCounts[cleanStatus] = (statusCounts[cleanStatus] || 0) + 1;
  });

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  // Process Salary Data
  const salaryData = applications.map(app => {
    // Parse Salary: "$175K - $240K" -> 207.5
    const cleanSalary = app.salary.replace(/[^0-9\-\.]/g, '');
    let avgSalary = 0;

    if (cleanSalary.includes('-')) {
      const parts = cleanSalary.split('-').map(p => Number(p));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        avgSalary = (parts[0] + parts[1]) / 2;
      }
    } else {
      const val = Number(cleanSalary);
      if (!isNaN(val)) avgSalary = val;
    }

    // Parse Fit Score: "8/10" -> 8
    const cleanScore = app.fitScore.split('/')[0].replace(/[^0-9\.]/g, '');
    const score = Number(cleanScore);

    return {
      company: app.company.split('(')[0].trim(), // Truncate extra info
      salary: avgSalary,
      score: isNaN(score) ? 0 : score
    };
  }).filter(item => item.salary > 0); // Filter out unknown salaries

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-white">Application Status</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary vs Fit Score (Using Bar Chart as proxy for distribution for now) */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-white">Projected Salary (k) by Company</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#ccc" />
                <YAxis dataKey="company" type="category" width={100} stroke="#ccc" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="salary" fill="#82ca9d" name="Avg Salary (k)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
