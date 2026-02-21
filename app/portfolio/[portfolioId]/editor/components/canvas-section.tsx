'use client';

import React from 'react';
import { Section } from '@/lib/store/editor-store';
import { stylesToCss } from '@/lib/editor-utils';
import { Trash2 } from 'lucide-react';
import { useEditorStore } from '@/lib/store/editor-store';

interface CanvasSectionProps {
  section: Section;
  isSelected: boolean;
}

export const CanvasSection: React.FC<CanvasSectionProps> = ({ section, isSelected }) => {
  const { deleteSection } = useEditorStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSection(section.id);
  };

  const sectionContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{section.content.title || 'Hero Title'}</h1>
            <p className="text-xl text-gray-600">{section.content.description || 'Hero Description'}</p>
          </div>
        );

      case 'about':
        return (
          <div>
            <h2 className="text-4xl font-bold mb-6">{section.content.title || 'About'}</h2>
            <p className="text-lg leading-relaxed max-w-2xl">{section.content.description || 'About content here'}</p>
          </div>
        );

      case 'skills':
        return (
          <div>
            <h2 className="text-4xl font-bold mb-8">{section.content.title || 'Skills'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.content.items?.map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div>
            <h2 className="text-4xl font-bold mb-8">{section.content.title || 'Projects'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.content.items?.map((item, idx) => (
                <div key={idx} className="p-6 border-2 border-gray-300 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">{section.content.title || 'Contact'}</h2>
            <p className="text-lg mb-6">{section.content.description || 'Get in touch'}</p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Email</button>
              <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">LinkedIn</button>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-4xl font-bold mb-4">{section.content.title || 'Custom Section'}</h2>
            <p className="text-lg">{section.content.description || 'Custom content here'}</p>
          </div>
        );
    }
  };

  return (
    <div
      style={stylesToCss(section.styles)}
      className="relative group transition-all"
    >
      <div className="max-w-4xl mx-auto px-6">
        {sectionContent()}
      </div>

      {/* Delete Button on Hover */}
      {isSelected && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete section (Delete key)"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};
