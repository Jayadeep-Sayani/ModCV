import { useResumeStore } from '../store/resumeStore';
import { generateLatexFromSections } from '../utils/latexGenerator';

export default function LatexExport() {
  const sections = useResumeStore((s) => s.sections);
  const latex = generateLatexFromSections(sections);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Generated LaTeX</h2>
      <textarea
        value={latex}
        readOnly
        rows={20}
        className="w-full p-2 border rounded font-mono text-sm"
      />
    </div>
  );
}
