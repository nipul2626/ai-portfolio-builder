import { useEffect } from 'react';
import { useEditorStore } from '../store/editor-store';
import { debounce } from '../editor-utils';

export const useAutoSave = (portfolioId: string) => {
  const { sections, isDirty, setIsDirty, setLastSaved } = useEditorStore();

  // Debounced save function
  const saveToDatabase = debounce(async (sectionsToSave: any[]) => {
    try {
      console.log('[v0] Saving portfolio:', portfolioId);
      // In a real app, this would be an API call
      // await fetch(`/api/portfolios/${portfolioId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sections: sectionsToSave }),
      // });
      
      setLastSaved();
      setIsDirty(false);
      console.log('[v0] Auto-save completed');
    } catch (error) {
      console.error('[v0] Auto-save failed:', error);
    }
  }, 3000); // Save 3 seconds after last change

  useEffect(() => {
    if (isDirty) {
      saveToDatabase(sections);
    }
  }, [isDirty, sections, saveToDatabase]);
};
