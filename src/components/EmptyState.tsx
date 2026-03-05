import { ChartBar as BarChart3, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EmptyState() {
  return (
    <div className="space-y-8">
      <div className="text-center py-16">
        <BarChart3 className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          CQS Inventory Quality Dashboard
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Upload your Excel file with the "CQS Export" sheet to view comprehensive quality metrics,
          score distributions, and criterion fill gap analysis.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Upload className="h-4 w-4" />
          <span>Drag and drop your file above to get started</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#1F4E79]">Dashboard Preview</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Total Projects', 'Average CQS Score', '% Scoring 60+', '% Scoring Below 10'].map((title) => (
            <Card key={title} className="bg-gray-50 border border-gray-200 opacity-50">
              <CardContent className="pt-6">
                <div className="text-sm text-gray-600 mb-1">{title}</div>
                <div className="text-3xl font-bold text-gray-300">--</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-50 border border-gray-200 opacity-50">
            <CardContent className="pt-6">
              <div className="text-lg font-bold text-[#1F4E79] mb-4">
                Score Band Distribution
              </div>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-gray-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border border-gray-200 opacity-50">
            <CardContent className="pt-6">
              <div className="text-lg font-bold text-[#1F4E79] mb-4">
                Criterion Fill Gaps
              </div>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-gray-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
