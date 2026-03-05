import { ProjectData, CommercialTier } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface ScoreBandChartProps {
  projects: ProjectData[];
}

const TIER_ORDER: CommercialTier[] = ['Premium', 'Boost', 'Standard', 'Base'];

const BAND_COLORS = {
  '0-10': '#FFC7CE',
  '10-40': '#FFCC99',
  '40-60': '#FFEB9C',
  '60-100': '#C6EFCE',
};

export function ScoreBandChart({ projects }: ScoreBandChartProps) {
  if (projects.length === 0) {
    return (
      <Card className="bg-gray-50 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#1F4E79]">
            Score Band Distribution
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

  const tierData = TIER_ORDER.map(tier => {
    const tierProjects = projects.filter(p => p.commercial_tier === tier);
    if (tierProjects.length === 0) return null;

    const band0_10 = tierProjects.filter(p => p.cqs_score < 10).length;
    const band10_40 = tierProjects.filter(p => p.cqs_score >= 10 && p.cqs_score < 40).length;
    const band40_60 = tierProjects.filter(p => p.cqs_score >= 40 && p.cqs_score < 60).length;
    const band60_100 = tierProjects.filter(p => p.cqs_score >= 60).length;

    return {
      tier,
      '0-10': band0_10,
      '10-40': band10_40,
      '40-60': band40_60,
      '60-100': band60_100,
      total: tierProjects.length,
    };
  }).filter(Boolean);

  const renderLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const percentage = (value / props.total) * 100;

    if (percentage < 5) return null;

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#333"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="500"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="bg-gray-50 border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#1F4E79]">
          Score Band Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tierData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="tier" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="0-10" stackId="a" fill={BAND_COLORS['0-10']}>
              <LabelList dataKey="0-10" content={renderLabel} />
            </Bar>
            <Bar dataKey="10-40" stackId="a" fill={BAND_COLORS['10-40']}>
              <LabelList dataKey="10-40" content={renderLabel} />
            </Bar>
            <Bar dataKey="40-60" stackId="a" fill={BAND_COLORS['40-60']}>
              <LabelList dataKey="40-60" content={renderLabel} />
            </Bar>
            <Bar dataKey="60-100" stackId="a" fill={BAND_COLORS['60-100']}>
              <LabelList dataKey="60-100" content={renderLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
          {Object.entries(BAND_COLORS).map(([band, color]) => (
            <div key={band} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
              <span className="text-gray-700">{band}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
