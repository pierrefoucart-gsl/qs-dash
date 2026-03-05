import { CommercialTier } from '@/types/dashboard';

interface TierFilterProps {
  selectedTiers: CommercialTier[];
  onTiersChange: (tiers: CommercialTier[]) => void;
}

const TIER_COLORS: Record<CommercialTier, string> = {
  Premium: 'bg-blue-500 text-white border-blue-500',
  Boost: 'bg-sky-400 text-white border-sky-400',
  Standard: 'bg-gray-500 text-white border-gray-500',
  Base: 'bg-amber-500 text-white border-amber-500',
};

const TIER_COLORS_INACTIVE: Record<CommercialTier, string> = {
  Premium: 'bg-white text-blue-500 border-blue-500',
  Boost: 'bg-white text-sky-400 border-sky-400',
  Standard: 'bg-white text-gray-500 border-gray-500',
  Base: 'bg-white text-amber-500 border-amber-500',
};

const ALL_TIERS: CommercialTier[] = ['Premium', 'Boost', 'Standard', 'Base'];

export function TierFilter({ selectedTiers, onTiersChange }: TierFilterProps) {
  const allSelected = selectedTiers.length === ALL_TIERS.length;

  const toggleAll = () => {
    onTiersChange(allSelected ? [] : ALL_TIERS);
  };

  const toggleTier = (tier: CommercialTier) => {
    if (selectedTiers.includes(tier)) {
      onTiersChange(selectedTiers.filter(t => t !== tier));
    } else {
      onTiersChange([...selectedTiers, tier]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={toggleAll}
        className={`px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors ${
          allSelected
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-900 border-gray-900'
        }`}
      >
        All
      </button>
      {ALL_TIERS.map(tier => {
        const isSelected = selectedTiers.includes(tier);
        return (
          <button
            key={tier}
            onClick={() => toggleTier(tier)}
            className={`px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors ${
              isSelected ? TIER_COLORS[tier] : TIER_COLORS_INACTIVE[tier]
            }`}
          >
            {tier}
          </button>
        );
      })}
    </div>
  );
}
