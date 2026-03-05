import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseExcelFile } from '@/utils/excelParser';
import { ProjectData } from '@/types/dashboard';

interface FileUploadProps {
  onDataLoaded: (data: ProjectData[]) => void;
  projectCount: number;
  onReset: () => void;
}

export function FileUpload({ onDataLoaded, projectCount, onReset }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { projects, warnings } = await parseExcelFile(file);
      if (warnings.length > 0) {
        setError(warnings[0]);
      }
      onDataLoaded(projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setIsLoading(false);
    }
  }, [onDataLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (projectCount > 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium">
          {projectCount} projects loaded
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop your Excel file here, or
        </p>
        <label htmlFor="file-upload">
          <Button variant="outline" disabled={isLoading} asChild>
            <span className="cursor-pointer">
              {isLoading ? 'Loading...' : 'Browse files'}
            </span>
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
            disabled={isLoading}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Excel file with sheet named "CQS Export"
        </p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
