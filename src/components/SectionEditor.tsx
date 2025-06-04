import { useResumeStore } from '../store/resumeStore';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Switch } from '@headlessui/react';

type SectionEditorProps = {
  sectionType: string;
};

function SortableItem({ item, onToggle }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 border rounded p-2 mb-2 flex items-center justify-between"
    >
      <div className="cursor-grab pr-2" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="flex-1">
        <p className="font-medium">{item.title}</p>
        {item.subtitle && (
          <p className="text-sm text-gray-500">{item.subtitle}</p>
        )}
      </div>
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <Switch
          checked={item.enabled !== false}
          onChange={onToggle}
          className={`${
            item.enabled ? 'bg-blue-600' : 'bg-gray-300'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="inline-block h-4 w-4 transform bg-white rounded-full transition" />
        </Switch>
      </div>
    </div>
  );
}

export default function SectionEditor({ sectionType }: SectionEditorProps) {
  const { sections, updateSection } = useResumeStore();
  const section = sections.find((s) => s.type === sectionType);

  if (!section) return null;

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = section.items.findIndex((i) => i.id === active.id);
    const newIndex = section.items.findIndex((i) => i.id === over.id);
    const newItems = arrayMove(section.items, oldIndex, newIndex);
    updateSection(sectionType, newItems);
  };

  return (
    <div className="ml-6 mb-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={section.items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {section.items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onToggle={() => {
                const updated = section.items.map((i) =>
                  i.id === item.id ? { ...i, enabled: !i.enabled } : i
                );
                updateSection(sectionType, updated);
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
