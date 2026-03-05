import { ProjectData, CriterionGap } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface CriterionGapChartProps {
  projects: ProjectData[];
}

const getCriterionGaps = (projects: ProjectData[]): CriterionGap[] => {
  if (projects.length === 0) return [];

  const total = projects.length;

  const criteria = [
    { label: 'Brochure available', check: (p: ProjectData) => p.brochure_available },
    { label: 'Video available', check: (p: ProjectData) => p.video_available },
    { label: '3D tool available', check: (p: ProjectData) => p.tool_3d_available },
    { label: 'All typologies surfaced', check: (p: ProjectData) => p.typologies_all_surfaced },
    { label: 'Units with floor', check: (p: ProjectData) => p.units_with_floor },
    { label: 'Units with orientation', check: (p: ProjectData) => p.units_with_orientation },
    { label: 'Unit count by typology', check: (p: ProjectData) => p.unit_count_by_typology_available },
    { label: 'Fiscal device declared', check: (p: ProjectData) => p.fiscal_device_declared },
    { label: 'Street-level address', check: (p: ProjectData) => p.street_address !== null },
    { label: 'Delivery date', check: (p: ProjectData) => p.delivery_date !== null },
    { label: 'Construction phase', check: (p: ProjectData) => p.construction_phase !== null },
    { label: 'Description sufficient', check: (p: ProjectData) => p.desc_sufficient },
  ];

  const gaps = criteria.map(({ label, check }) => {
    const count = projects.filter(check).length;
    const fillRate = (count / total) * 100;
    return { label, fillRate, count, total };
  });

  return gaps.sort((a, b) => a.fillRate - b.fillRate);
};

const getBarColor = (fillRate: number): string => {
  if (fillRate < 40) return '#FFC7CE';
  if (fillRate < 70) return '#FFEB9C';
  return '#C6EFCE';
};

export function CriterionGapChart({ projects }: CriterionGapChartProps) {
  const gaps = getCriterionGaps(projects);

  if (projects.length === 0) {
    return (
      <Card className="bg-gray-50 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#1F4E79]">
            Criterion Fill Gaps - lowest fill rate first
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No projects match the selected filters
          </div>
        </CardContent>
      </Card>
    );
  }

  const top3Gaps = gaps.slice(0, 3);

  return (
    <Card className="bg-gray-50 border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#1F4E79]">
          Criterion Fill Gaps - lowest fill rate first
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={gaps} layout="vertical" margin={{ left: 20, right: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
            <YAxis dataKey="label" type="category" width={180} stroke="#6B7280" fontSize={12} />
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
            <Bar dataKey="fillRate" radius={[0, 4, 4, 0]}>
              {gaps.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.fillRate)} />
              ))}
              <LabelList
                dataKey="fillRate"
                position="right"
                formatter={(value: number) => `${value.toFixed(1)}%`}
                style={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="space-y-3">
          <h3 className="text-md font-bold text-[#1F4E79]">Top 3 Quality Gaps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {top3Gaps.map((gap) => (
              <div
                key={gap.label}
                className="bg-white border-l-4 border-red-500 p-4 rounded shadow-sm"
              >
                <div className="text-sm font-bold text-gray-900 mb-1">{gap.label}</div>
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {gap.fillRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">
                  {(100 - gap.fillRate).toFixed(0)}% of projects missing this
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
