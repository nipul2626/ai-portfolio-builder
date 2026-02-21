import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Section {
  id: string;
  name: string;
  type: 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'custom';
  content: {
    title?: string;
    description?: string;
    items?: any[];
    [key: string]: any;
  };
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    minHeight?: string;
    [key: string]: any;
  };
  order: number;
  visible: boolean;
  locked: boolean;
}

export interface HistoryState {
  past: Section[];
  present: Section[];
  future: Section[];
}

export interface CollaborativeUser {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  isActive: boolean;
  lastUpdate: number;
}

export interface EditorStore {
  // Sections
  sections: Section[];
  addSection: (section: Section) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (sections: Section[]) => void;
  
  // Selection
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  
  // History
  history: HistoryState;
  pushHistory: (sections: Section[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // UI State
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  activeTab: 'properties' | 'layers' | 'style';
  setActiveTab: (tab: 'properties' | 'layers' | 'style') => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  devicePreview: 'desktop' | 'tablet' | 'mobile';
  setDevicePreview: (device: 'desktop' | 'tablet' | 'mobile') => void;
  
  // AI & Collaboration
  aiAssistantOpen: boolean;
  setAiAssistantOpen: (open: boolean) => void;
  collaborativeUsers: CollaborativeUser[];
  setCollaborativeUsers: (users: CollaborativeUser[]) => void;
  
  // Auto-save
  lastSaved: number;
  setLastSaved: () => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Sections
        sections: [
          {
            id: '1',
            name: 'Hero Section',
            type: 'hero',
            content: {
              title: 'Your Name',
              description: 'Full Stack Developer & Designer',
            },
            styles: {
              backgroundColor: '#0a0a0f',
              textColor: '#ffffff',
              padding: '100px 20px',
              minHeight: '600px',
            },
            order: 0,
            visible: true,
            locked: false,
          },
        ],
        
        addSection: (section) =>
          set((state) => {
            const newSections = [...state.sections, section];
            return {
              sections: newSections,
              isDirty: true,
              history: {
                past: [...state.history.past, state.history.present],
                present: newSections,
                future: [],
              },
            };
          }),
        
        updateSection: (id, updates) =>
          set((state) => {
            const newSections = state.sections.map((section) =>
              section.id === id ? { ...section, ...updates } : section
            );
            return {
              sections: newSections,
              isDirty: true,
              history: {
                past: [...state.history.past, state.history.present],
                present: newSections,
                future: [],
              },
            };
          }),
        
        deleteSection: (id) =>
          set((state) => {
            const newSections = state.sections.filter((section) => section.id !== id);
            return {
              sections: newSections,
              selectedSectionId: null,
              isDirty: true,
              history: {
                past: [...state.history.past, state.history.present],
                present: newSections,
                future: [],
              },
            };
          }),
        
        reorderSections: (sections) =>
          set((state) => ({
            sections: sections.map((s, i) => ({ ...s, order: i })),
            isDirty: true,
            history: {
              past: [...state.history.past, state.history.present],
              present: sections.map((s, i) => ({ ...s, order: i })),
              future: [],
            },
          })),
        
        selectedSectionId: null,
        setSelectedSectionId: (id) => set({ selectedSectionId: id }),
        
        // History
        history: {
          past: [],
          present: [],
          future: [],
        },
        
        pushHistory: (sections) =>
          set((state) => ({
            history: {
              past: [...state.history.past, state.history.present],
              present: sections,
              future: [],
            },
          })),
        
        undo: () =>
          set((state) => {
            if (state.history.past.length === 0) return state;
            const newPast = state.history.past.slice(0, -1);
            const newPresent = state.history.past[state.history.past.length - 1];
            return {
              sections: newPresent,
              history: {
                past: newPast,
                present: newPresent,
                future: [state.history.present, ...state.history.future],
              },
            };
          }),
        
        redo: () =>
          set((state) => {
            if (state.history.future.length === 0) return state;
            const newPresent = state.history.future[0];
            const newFuture = state.history.future.slice(1);
            return {
              sections: newPresent,
              history: {
                past: [...state.history.past, state.history.present],
                present: newPresent,
                future: newFuture,
              },
            };
          }),
        
        canUndo: () => get().history.past.length > 0,
        canRedo: () => get().history.future.length > 0,
        
        // UI State
        sidebarWidth: 300,
        setSidebarWidth: (width) => set({ sidebarWidth: width }),
        rightPanelOpen: true,
        setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
        activeTab: 'properties',
        setActiveTab: (tab) => set({ activeTab: tab }),
        zoomLevel: 100,
        setZoomLevel: (level) => set({ zoomLevel: level }),
        devicePreview: 'desktop',
        setDevicePreview: (device) => set({ devicePreview: device }),
        
        // AI & Collaboration
        aiAssistantOpen: false,
        setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),
        collaborativeUsers: [],
        setCollaborativeUsers: (users) => set({ collaborativeUsers: users }),
        
        // Auto-save
        lastSaved: Date.now(),
        setLastSaved: () => set({ lastSaved: Date.now() }),
        isDirty: false,
        setIsDirty: (dirty) => set({ isDirty: dirty }),
      }),
      {
        name: 'portfolio-editor-store',
      }
    )
  )
);
