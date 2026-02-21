import { Section } from './store/editor-store';

// Generate unique IDs
export const generateId = (): string => {
  return `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Default templates for different section types
export const sectionTemplates: Record<string, Partial<Section>> = {
  hero: {
    name: 'Hero Section',
    type: 'hero',
    content: {
      title: 'Welcome to My Portfolio',
      description: 'Full Stack Developer & Designer',
      image: '/placeholder-hero.jpg',
    },
    styles: {
      backgroundColor: '#0a0a0f',
      textColor: '#ffffff',
      padding: '100px 20px',
      minHeight: '600px',
    },
  },
  about: {
    name: 'About Section',
    type: 'about',
    content: {
      title: 'About Me',
      description: 'I\'m a passionate developer with expertise in modern web technologies.',
    },
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: '80px 20px',
      minHeight: '400px',
    },
  },
  skills: {
    name: 'Skills Section',
    type: 'skills',
    content: {
      title: 'Skills',
      items: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Node.js', level: 80 },
      ],
    },
    styles: {
      backgroundColor: '#0a0a0f',
      textColor: '#ffffff',
      padding: '80px 20px',
      minHeight: '400px',
    },
  },
  projects: {
    name: 'Projects Section',
    type: 'projects',
    content: {
      title: 'My Projects',
      items: [
        { title: 'Project 1', description: 'Description here' },
        { title: 'Project 2', description: 'Description here' },
      ],
    },
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: '80px 20px',
      minHeight: '500px',
    },
  },
  contact: {
    name: 'Contact Section',
    type: 'contact',
    content: {
      title: 'Get In Touch',
      description: 'Feel free to reach out to me',
    },
    styles: {
      backgroundColor: '#0a0a0f',
      textColor: '#ffffff',
      padding: '80px 20px',
      minHeight: '400px',
    },
  },
  custom: {
    name: 'Custom Section',
    type: 'custom',
    content: {
      title: 'Custom Section',
      description: 'Add your custom content here',
    },
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: '60px 20px',
      minHeight: '300px',
    },
  },
};

// Create a new section from template
export const createSectionFromTemplate = (
  type: Section['type'],
  overrides?: Partial<Section>
): Section => {
  const template = sectionTemplates[type] || sectionTemplates.custom;
  return {
    id: generateId(),
    name: template.name || 'Section',
    type: type as Section['type'],
    content: template.content || {},
    styles: template.styles || {},
    order: 0,
    visible: true,
    locked: false,
    ...overrides,
  };
};

// CSS-in-JS for applying styles to canvas elements
export const stylesToCss = (styles: Record<string, any>): React.CSSProperties => {
  const cssProps: React.CSSProperties = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    
    // Convert snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    (cssProps as any)[camelKey] = value;
  });
  
  return cssProps;
};

// Color validation
export const isValidColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
  
  return hexRegex.test(color) || rgbRegex.test(color) || rgbaRegex.test(color);
};

// Hex to RGB conversion
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// RGB to Hex conversion
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Export canvas to JSON
export const exportToJSON = (sections: Section[]): string => {
  return JSON.stringify(sections, null, 2);
};

// Import from JSON
export const importFromJSON = (json: string): Section[] => {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    throw new Error('Invalid format');
  } catch (error) {
    console.error('Failed to import JSON:', error);
    return [];
  }
};

// Generate HTML preview
export const generateHTMLPreview = (sections: Section[]): string => {
  const sectionsHTML = sections
    .map(
      (section) => `
    <section id="${section.id}" style="
      background-color: ${section.styles.backgroundColor || '#ffffff'};
      color: ${section.styles.textColor || '#000000'};
      padding: ${section.styles.padding || '40px 20px'};
      min-height: ${section.styles.minHeight || '300px'};
    ">
      <div class="container">
        <h2>${section.content.title || section.name}</h2>
        <p>${section.content.description || ''}</p>
      </div>
    </section>
  `
    )
    .join('\n');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
      </style>
    </head>
    <body>
      ${sectionsHTML}
    </body>
    </html>
  `;
};

// Keyboard shortcuts mapping
export const keyboardShortcuts = {
  undo: { keys: ['ctrl', 'z'], label: 'Undo' },
  redo: { keys: ['ctrl', 'shift', 'z'], label: 'Redo' },
  delete: { keys: ['delete'], label: 'Delete' },
  duplicate: { keys: ['ctrl', 'd'], label: 'Duplicate' },
  save: { keys: ['ctrl', 's'], label: 'Save' },
  deselect: { keys: ['escape'], label: 'Deselect' },
};

// Check if keyboard shortcut matches
export const matchesShortcut = (
  event: KeyboardEvent,
  shortcut: typeof keyboardShortcuts[keyof typeof keyboardShortcuts]
): boolean => {
  const pressed = {
    ctrl: event.ctrlKey || event.metaKey,
    shift: event.shiftKey,
    alt: event.altKey,
  };

  return shortcut.keys.every((key) => {
    if (key === 'delete') return event.key === 'Delete' || event.key === 'Backspace';
    if (key === 'escape') return event.key === 'Escape';
    return (pressed as any)[key] === true;
  });
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format date for last saved timestamp
export const formatLastSaved = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp).toLocaleDateString();
};
