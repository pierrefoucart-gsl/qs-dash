import { ProjectData } from '@/types/dashboard';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardsProps {
  projects: ProjectData[];
}

export function KPICards({ projects }: KPICardsProps) {
  const totalProjects = projects.length;
  const avgScore = totalProjects > 0
    ? projects.reduce((sum, p) => sum + p.cqs_score, 0) / totalProjects
    : 0;
  const projectsAbove60 = projects.filter(p => p.cqs_score >= 60).length;
  const projectsBelow10 = projects.filter(p => p.cqs_score < 10).length;
  const percentAbove60 = totalProjects > 0 ? (projectsAbove60 / totalProjects) * 100 : 0;
  const percentBelow10 = totalProjects > 0 ? (projectsBelow10 / totalProjects) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-1">Total Projects</div>
          <div className="text-3xl font-bold text-gray-900">{totalProjects}</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-1">Average CQS Score</div>
          <div className="text-3xl font-bold text-gray-900">{avgScore.toFixed(1)}</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-2">% Scoring 60+</div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-gray-900">{percentAbove60.toFixed(0)}%</div>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">
              {projectsAbove60} projects
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-2">% Scoring Below 10</div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-gray-900">{percentBelow10.toFixed(0)}%</div>
            <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium">
              {projectsBelow10} projects
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
