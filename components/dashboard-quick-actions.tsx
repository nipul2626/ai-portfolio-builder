'use client';

import { Plus, Upload, Grid3X3 } from 'lucide-react';

function ActionCard({ icon: Icon, title, description, buttonText }: any) {
  return (
    <div className="neu-card rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-200 group cursor-pointer">
      <div className="w-20 h-20 bg-gradient-to-br from-cyan-DEFAULT/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
        <Icon className="w-10 h-10 text-cyan-DEFAULT group-hover:rotate-90 transition-transform duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
      <button className="px-6 py-2 bg-cyan-DEFAULT text-deep-bg font-semibold rounded-lg hover:scale-105 transition-transform text-sm">
        {buttonText}
      </button>
    </div>
  );
}

export function DashboardQuickActions() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
        <span className="relative">
          Quick Actions
          <div className="absolute bottom-0 left-0 h-1 bg-cyan-DEFAULT rounded-full w-32 animate-pulse" />
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          icon={Plus}
          title="Create New Portfolio"
          description="Start from scratch or use AI"
          buttonText="Get Started"
        />
        <ActionCard
          icon={Upload}
          title="Upload Resume"
          description="Auto-fill portfolio from resume"
          buttonText="Upload Now"
        />
        <ActionCard
          icon={Grid3X3}
          title="Browse Templates"
          description="Start with a professional design"
          buttonText="Explore"
        />
      </div>
    </div>
  );
}
