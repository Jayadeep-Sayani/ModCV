import type { ResumeSection } from './types';

export const dummyResume: ResumeSection[] = [
  {
    type: 'summary',
    enabled: true,
    items: [
      {
        id: 'summary-1',
        title: 'Experienced software engineer with a focus on frontend and performance.',
        enabled: true,
      },
    ],
  },
  {
    type: 'experience',
    enabled: true,
    items: [
      {
        id: 'exp-1',
        title: 'Frontend Developer',
        subtitle: 'TechCorp',
        dateRange: 'Jan 2021 – Present',
        bullets: ['Led migration to React 18', 'Improved page speed by 40%'],
        enabled: true,
      },
      {
        id: 'exp-2',
        title: 'UI Engineer',
        subtitle: 'Designify',
        dateRange: '2019 – 2020',
        bullets: ['Built design system', 'Collaborated with product managers'],
        enabled: false,
      },
    ],
  },
  {
    type: 'projects',
    enabled: true,
    items: [
      {
        id: 'proj-1',
        title: 'Modular Resume Builder',
        dateRange: '2024',
        bullets: ['Built in React', 'Exports LaTeX'],
        enabled: true,
      },
    ],
  },
];
