import { useEffect } from 'react';
import { useEditorStore } from '../store/editor-store';
import { keyboardShortcuts, matchesShortcut } from '../editor-utils';

export const useEditorShortcuts = () => {
  const { undo, redo, canUndo, canRedo, selectedSectionId, deleteSection, setSelectedSectionId } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Undo: Ctrl+Z
      if (matchesShortcut(event, keyboardShortcuts.undo)) {
        event.preventDefault();
        if (canUndo()) {
          undo();
        }
      }

      // Redo: Ctrl+Shift+Z
      if (matchesShortcut(event, keyboardShortcuts.redo)) {
        event.preventDefault();
        if (canRedo()) {
          redo();
        }
      }

      // Delete: Delete key
      if (matchesShortcut(event, keyboardShortcuts.delete)) {
        if (selectedSectionId && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          deleteSection(selectedSectionId);
        }
      }

      // Deselect: Escape
      if (matchesShortcut(event, keyboardShortcuts.deselect)) {
        event.preventDefault();
        setSelectedSectionId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo, selectedSectionId, deleteSection, setSelectedSectionId]);
};
