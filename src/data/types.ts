export type ResumeSectionType = 'summary' | 'experience' | 'projects' | 'awards' | 'education';

export interface ResumeItem {
  id: string;
  title: string;
  subtitle?: string;
  dateRange?: string;
  bullets?: string[];
  enabled?: boolean;
}

export interface ResumeSection {
  type: ResumeSectionType;
  items: ResumeItem[];
  enabled: boolean;
}
