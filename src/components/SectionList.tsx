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
import { useResumeStore } from '../store/resumeStore';
import { useState } from 'react';

import { Switch } from '@headlessui/react';

import { GripVertical } from 'lucide-react';

function SortableItem({ id, label, enabled, onToggle }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-sm rounded p-3 mb-2 flex justify-between items-center"
    >
      {/* Drag Handle */}
      <div className="cursor-grab pr-2" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>

      {/* Label */}
      <span className="capitalize flex-1">{label}</span>

      {/* Toggle - stop drag when interacting */}
      <div
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()} // prevents drag
      >
        <Switch
          checked={enabled}
          onChange={onToggle}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-300'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="inline-block h-4 w-4 transform bg-white rounded-full transition" />
        </Switch>
      </div>
    </div>
  );
}

export default function SectionList() {
  const { sections, setSections } = useResumeStore();
  const [sectionOrder, setSectionOrder] = useState(sections.map((s) => s.type));

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      setSectionOrder(newOrder);

      const sorted = newOrder.map((type) =>
        sections.find((s) => s.type === type)!
      );
      setSections(sorted);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
        {sections.map((section) => (
          <SortableItem
            key={section.type}
            id={section.type}
            label={section.type}
            enabled={section.enabled}
            onToggle={() =>
              setSections(
                sections.map((s) =>
                  s.type === section.type ? { ...s, enabled: !s.enabled } : s
                )
              )
            }
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
