import { create } from 'zustand';
import type { ResumeSection } from '../data/types';
import { dummyResume } from '../data/dummyResume';

interface ResumeState {
  sections: ResumeSection[];
  setSections: (sections: ResumeSection[]) => void;
  updateSection: (type: string, newItems: ResumeSection['items']) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  sections: dummyResume,
  setSections: (sections) => set({ sections }),
  updateSection: (type, newItems) =>
    set((state) => ({
      sections: state.sections.map((sec) =>
        sec.type === type ? { ...sec, items: newItems } : sec
      ),
    })),
}));
