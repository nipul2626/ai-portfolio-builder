'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface PortfolioData {
  // Step 1: Purpose & Template
  purpose: 'showcase' | 'hire-me' | 'freelance' | '';
  template: 'minimal' | 'creative' | 'corporate' | 'startup' | '';

  // Step 2: Basic Information
  fullName: string;
  headline: string;
  bio: string;
  profileImage: string | null;
  location: string;

  // Step 3: Skills & Technologies
  skills: string[];
  technologies: string[];
  expertise: string[];

  // Step 4: Projects & Experience
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    image: string | null;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;

  // Step 5: Contact & Social
  email: string;
  phone: string;
  website: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
    behance: string;
    instagram: string;
  };

  // Step 6: Theme & Customization
  theme: 'dark' | 'light' | 'auto';
  primaryColor: string;
  fontFamily: 'inter' | 'poppins' | 'playfair' | 'roboto';
  layout: 'sidebar' | 'header' | 'fullwidth';
  customizations: {
    showStats: boolean;
    showTestimonials: boolean;
    showBlog: boolean;
    animationsEnabled: boolean;
  };
}

interface WizardContextType {
  currentStep: number;
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isComplete: boolean;
  validateStep: (step: number) => boolean;
  resetWizard: () => void;
}

const defaultData: PortfolioData = {
  purpose: '',
  template: '',
  fullName: '',
  headline: '',
  bio: '',
  profileImage: null,
  location: '',
  skills: [],
  technologies: [],
  expertise: [],
  projects: [],
  experience: [],
  email: '',
  phone: '',
  website: '',
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    dribbble: '',
    behance: '',
    instagram: '',
  },
  theme: 'dark',
  primaryColor: '#00d9ff',
  fontFamily: 'inter',
  layout: 'sidebar',
  customizations: {
    showStats: true,
    showTestimonials: true,
    showBlog: false,
    animationsEnabled: true,
  },
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<PortfolioData>(defaultData);

  const updateData = useCallback((newData: Partial<PortfolioData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 6) {
      setCurrentStep(step);
    }
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return data.purpose !== '' && data.template !== '';
      case 2:
        return data.fullName !== '' && data.headline !== '' && data.bio !== '';
      case 3:
        return data.skills.length > 0 && data.technologies.length > 0;
      case 4:
        return data.projects.length > 0 || data.experience.length > 0;
      case 5:
        return data.email !== '';
      case 6:
        return true;
      default:
        return false;
    }
  }, [data]);

  const isComplete = data.purpose !== '' && data.fullName !== '' && data.email !== '';

  const resetWizard = useCallback(() => {
    setCurrentStep(1);
    setData(defaultData);
  }, []);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        data,
        updateData,
        nextStep,
        prevStep,
        goToStep,
        isComplete,
        validateStep,
        resetWizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}
