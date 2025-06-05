import { useResumeStore } from '../store/resumeStore';
import SectionList from '../components/SectionList';
import SectionEditor from '../components/SectionEditor';
import LatexExport from '../components/LatexExport';

export default function Home() {
  const sections = useResumeStore((s) => s.sections);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modular Resume Builder</h1>
      <SectionList />
      {sections
        .filter((section) => section.enabled)
        .map((section) => (
          <div key={section.type}>
            <h2 className="text-xl font-semibold mt-6 capitalize">{section.type}</h2>
            <SectionEditor sectionType={section.type} />
          </div>
        ))}

        <LatexExport />
    </div>
  );
}
