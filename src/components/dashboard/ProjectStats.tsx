'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { ProjectStats as ProjectStatsType } from '@/lib/data-analysis';

interface ProjectStatsProps {
  projects: ProjectStatsType[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  return (
    <div className="space-y-8 mt-8">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-bold mb-4 text-white">Project Content Scale</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projects}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="wordCount" name="Total Words" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="totalReadTime" name="Read Time (min)" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {projects.map((p) => (
            <div key={p.name} className="bg-black/20 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">{p.name}</h4>
              <p className="text-sm text-gray-400">Posts: <span className="text-white">{p.postCount}</span></p>
              <p className="text-sm text-gray-400">Words: <span className="text-white">{p.wordCount.toLocaleString()}</span></p>
              <p className="text-sm text-gray-400">Est. Read Time: <span className="text-white">{p.totalReadTime} min</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
