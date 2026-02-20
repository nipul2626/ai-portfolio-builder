'use client';

import { WizardProvider } from '@/contexts/wizard-context';
import PortfolioWizard from '@/components/portfolio-wizard';

export default function WizardPage() {
  return (
    <WizardProvider>
      <PortfolioWizard />
    </WizardProvider>
  );
}
