'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { formatLastSaved } from '@/lib/editor-utils';
import { ChevronDown, Save, Undo2, Redo2, Eye, Settings, Share2, MoreVertical, Home } from 'lucide-react';

interface EditorTopBarProps {
  portfolioName: string;
  portfolioId: string;
  onSave?: () => void;
}

export const EditorTopBar: React.FC<EditorTopBarProps> = ({
  portfolioName,
  portfolioId,
  onSave,
}) => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    zoomLevel,
    setZoomLevel,
    devicePreview,
    setDevicePreview,
    lastSaved,
    isDirty,
    setIsDirty,
  } = useEditorStore();

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [editingName, setEditingName] = useState(portfolioName);
  const [showMenu, setShowMenu] = useState(false);

  const handleNameSave = () => {
    // In a real app, this would update the portfolio name
    setIsNameEditing(false);
  };

  const handleSave = () => {
    onSave?.();
    setIsDirty(false);
  };

  return (
    <div className="bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e] border-b border-[#00f0ff]/20 backdrop-blur-lg">
      <div className="flex items-center justify-between h-16 px-6 gap-4">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-3 min-w-0">
          <a href="/" className="text-[#00f0ff] hover:text-[#ff00ff] transition-colors">
            <Home size={20} />
          </a>
          
          <div className="h-6 w-px bg-[#00f0ff]/20"></div>

          {isNameEditing ? (
            <input
              autoFocus
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
              className="bg-[#0f0f1f] text-white px-3 py-1 rounded border border-[#00f0ff]/30 focus:border-[#00f0ff] outline-none text-sm"
            />
          ) : (
            <div
              onClick={() => setIsNameEditing(true)}
              className="cursor-pointer hover:text-[#00f0ff] transition-colors text-sm font-medium text-gray-200 truncate"
            >
              {portfolioName}
            </div>
          )}
        </div>

        {/* Center: Undo/Redo, Zoom, Device */}
        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 px-2 py-1 bg-[#0f0f1f] rounded border border-[#00f0ff]/20">
            <button
              onClick={() => canUndo() && undo()}
              disabled={!canUndo()}
              className="p-1.5 hover:bg-[#00f0ff]/20 rounded disabled:opacity-50 disabled:cursor-not-allowed text-[#00f0ff]"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
            </button>
            <div className="h-4 w-px bg-[#00f0ff]/20"></div>
            <button
              onClick={() => canRedo() && redo()}
              disabled={!canRedo()}
              className="p-1.5 hover:bg-[#00f0ff]/20 rounded disabled:opacity-50 disabled:cursor-not-allowed text-[#00f0ff]"
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 size={16} />
            </button>
          </div>

          {/* Zoom Control */}
          <div className="flex items-center gap-1 px-2 py-1 bg-[#0f0f1f] rounded border border-[#00f0ff]/20">
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              className="text-xs text-gray-400 hover:text-[#00f0ff] transition-colors"
            >
              −
            </button>
            <span className="text-xs text-gray-300 min-w-[40px] text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
              className="text-xs text-gray-400 hover:text-[#00f0ff] transition-colors"
            >
              +
            </button>
          </div>

          {/* Device Preview */}
          <div className="flex items-center gap-1 px-2 py-1 bg-[#0f0f1f] rounded border border-[#00f0ff]/20">
            <select
              value={devicePreview}
              onChange={(e) => setDevicePreview(e.target.value as any)}
              className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer"
            >
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Right: Save, Preview, Settings, More */}
        <div className="flex items-center gap-2">
          {/* Last Saved */}
          <div className="text-xs text-gray-500 min-w-[100px] text-right">
            {isDirty ? (
              <span className="text-yellow-500">Unsaved changes</span>
            ) : (
              <span>Saved {formatLastSaved(lastSaved)}</span>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#00f0ff] to-[#0099cc] text-[#0a0a0f] rounded font-medium text-sm hover:shadow-lg hover:shadow-[#00f0ff]/50 transition-all"
          >
            <Save size={16} />
            Save
          </button>

          {/* Preview Button */}
          <button className="p-1.5 hover:bg-[#00f0ff]/20 rounded text-[#00f0ff] transition-colors">
            <Eye size={16} />
          </button>

          {/* Settings Button */}
          <button className="p-1.5 hover:bg-[#00f0ff]/20 rounded text-[#00f0ff] transition-colors">
            <Settings size={16} />
          </button>

          {/* Share Button */}
          <button className="p-1.5 hover:bg-[#00f0ff]/20 rounded text-[#00f0ff] transition-colors">
            <Share2 size={16} />
          </button>

          {/* More Options */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 hover:bg-[#00f0ff]/20 rounded text-[#00f0ff] transition-colors"
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0f0f1f] border border-[#00f0ff]/30 rounded-lg shadow-xl z-50">
                <a href="#" className="block px-4 py-2 hover:bg-[#00f0ff]/10 text-sm text-gray-300">
                  Publish
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-[#00f0ff]/10 text-sm text-gray-300">
                  Download
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-[#00f0ff]/10 text-sm text-gray-300 border-t border-[#00f0ff]/20">
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-red-500/10 text-sm text-red-400 border-t border-[#00f0ff]/20"
                >
                  Delete Portfolio
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
