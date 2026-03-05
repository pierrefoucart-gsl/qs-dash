import { useState, useMemo } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TierFilter } from '@/components/TierFilter';
import { KPICards } from '@/components/KPICards';
import { ScoreBandChart } from '@/components/ScoreBandChart';
import { CriterionGapChart } from '@/components/CriterionGapChart';
import { EmptyState } from '@/components/EmptyState';
import { ProjectData, CommercialTier } from '@/types/dashboard';
import './App.css';

function App() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<CommercialTier[]>([
    'Premium',
    'Boost',
    'Standard',
    'Base',
  ]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => selectedTiers.includes(p.commercial_tier));
  }, [projects, selectedTiers]);

  const handleDataLoaded = (data: ProjectData[]) => {
    setProjects(data);
  };

  const handleReset = () => {
    setProjects([]);
    setSelectedTiers(['Premium', 'Boost', 'Standard', 'Base']);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#1F4E79]">
              CQS Inventory Quality Dashboard
            </h1>
          </div>

          <FileUpload
            onDataLoaded={handleDataLoaded}
            projectCount={projects.length}
            onReset={handleReset}
          />

          {projects.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Commercial Tier
              </label>
              <TierFilter
                selectedTiers={selectedTiers}
                onTiersChange={setSelectedTiers}
              />
            </div>
          )}
        </header>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <KPICards projects={filteredProjects} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScoreBandChart projects={filteredProjects} />
              <CriterionGapChart projects={filteredProjects} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
