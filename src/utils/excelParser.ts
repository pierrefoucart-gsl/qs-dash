import * as XLSX from 'xlsx';
import { ProjectData, CommercialTier } from '@/types/dashboard';

const normalizeBoolean = (value: string | boolean | undefined): boolean => {
  if (typeof value === 'boolean') return value;
  return value?.toString().trim().toUpperCase() === 'YES';
};

export const parseExcelFile = async (file: File): Promise<{
  projects: ProjectData[],
  warnings: string[]
}> => {
  const warnings: string[] = [];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = 'CQS Export';
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
          reject(new Error(`Sheet "${sheetName}" not found in the Excel file`));
          return;
        }

        const rawData = XLSX.utils.sheet_to_json(worksheet);

        const requiredColumns = [
          'project_id', 'project_name', 'city', 'cqs_score', 'commercial_tier'
        ];

        if (rawData.length > 0) {
          const firstRow = rawData[0] as Record<string, unknown>;
          const missingColumns = requiredColumns.filter(col => !(col in firstRow));
          if (missingColumns.length > 0) {
            warnings.push(`Missing columns detected: ${missingColumns.join(', ')}`);
          }
        }

        const projects: ProjectData[] = rawData.map((row: any) => {
          const descriptionCharCount = Number(row.description_char_count) || 0;

          return {
            project_id: Number(row.project_id) || 0,
            project_name: String(row.project_name || ''),
            city: String(row.city || ''),
            street_address: row.street_address ? String(row.street_address) : null,
            description_char_count: descriptionCharCount,
            delivery_date: row.delivery_date ? String(row.delivery_date) : null,
            construction_phase: row.construction_phase ? String(row.construction_phase) : null,
            brochure_available: normalizeBoolean(row.brochure_available),
            photo_count: Number(row.photo_count) || 0,
            video_available: normalizeBoolean(row.video_available),
            tool_3d_available: normalizeBoolean(row.tool_3d_available),
            typology_count: Number(row.typology_count) || 0,
            typologies_all_priced: normalizeBoolean(row.typologies_all_priced),
            typologies_all_surfaced: normalizeBoolean(row.typologies_all_surfaced),
            units_with_floor: normalizeBoolean(row.units_with_floor),
            units_with_orientation: normalizeBoolean(row.units_with_orientation),
            unit_count_by_typology_available: normalizeBoolean(row.unit_count_by_typology_available),
            fiscal_device_declared: normalizeBoolean(row.fiscal_device_declared),
            commercial_tier: row.commercial_tier as CommercialTier,
            cqs_score: Number(row.cqs_score) || 0,
            desc_sufficient: descriptionCharCount >= 500
          };
        });

        resolve({ projects, warnings });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};
