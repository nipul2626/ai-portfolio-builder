'use client';

import React from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { stylesToCss } from '@/lib/editor-utils';
import { CanvasSection } from './canvas-section';

export const Canvas: React.FC = () => {
  const { sections, selectedSectionId, setSelectedSectionId, zoomLevel, devicePreview } = useEditorStore();

  const getDeviceWidth = () => {
    switch (devicePreview) {
      case 'mobile':
        return 375;
      case 'tablet':
        return 768;
      case 'desktop':
      default:
        return 1200;
    }
  };

  const canvasWidth = getDeviceWidth();
  const scale = zoomLevel / 100;

  return (
    <div className="flex-1 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] overflow-auto">
      {/* Canvas Container */}
      <div className="min-h-full p-8 flex justify-center items-start">
        <div
          style={{
            width: canvasWidth,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'all 0.3s ease',
          }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Sections */}
          {sections.length > 0 ? (
            sections.map((section) => (
              <div
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`relative cursor-pointer transition-all ${
                  selectedSectionId === section.id
                    ? 'ring-2 ring-[#00f0ff] ring-offset-2 ring-offset-white'
                    : 'hover:ring-1 hover:ring-[#00f0ff] hover:ring-offset-1 hover:ring-offset-white'
                }`}
              >
                <CanvasSection section={section} isSelected={selectedSectionId === section.id} />
              </div>
            ))
          ) : (
            <div className="h-96 flex flex-col items-center justify-center bg-gray-50">
              <p className="text-gray-400 text-lg">No sections added yet</p>
              <p className="text-gray-300 text-sm mt-2">Add a section from the left panel to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
