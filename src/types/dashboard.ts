export type CommercialTier = 'Premium' | 'Boost' | 'Standard' | 'Base';

export interface ProjectData {
  project_id: number;
  project_name: string;
  city: string;
  street_address: string | null;
  description_char_count: number;
  delivery_date: string | null;
  construction_phase: string | null;
  brochure_available: boolean;
  photo_count: number;
  video_available: boolean;
  tool_3d_available: boolean;
  typology_count: number;
  typologies_all_priced: boolean;
  typologies_all_surfaced: boolean;
  units_with_floor: boolean;
  units_with_orientation: boolean;
  unit_count_by_typology_available: boolean;
  fiscal_device_declared: boolean;
  commercial_tier: CommercialTier;
  cqs_score: number;
  desc_sufficient: boolean;
}

export interface CriterionGap {
  label: string;
  fillRate: number;
  count: number;
  total: number;
}
