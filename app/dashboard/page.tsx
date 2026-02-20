'use client';

import { DashboardBackground } from '@/components/dashboard-background';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardStats } from '@/components/dashboard-stats';
import { DashboardQuickActions } from '@/components/dashboard-quick-actions';
import { DashboardPortfolioGrid } from '@/components/dashboard-portfolio-grid';
import { DashboardActivity } from '@/components/dashboard-activity';
import { DashboardAIAssistant } from '@/components/dashboard-ai-assistant';

export default function DashboardPage() {
  return (
    <div className="bg-deep-bg min-h-screen">
      <DashboardBackground />

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Header */}
      <DashboardHeader />

      {/* Main content */}
      <div className="ml-80 pt-24 px-8 pb-12 relative z-10">
        {/* Stats overview */}
        <DashboardStats />

        {/* Quick actions */}
        <DashboardQuickActions />

        {/* Portfolio grid */}
        <DashboardPortfolioGrid />

        {/* Activity feed */}
        <DashboardActivity />
      </div>

      {/* AI Assistant */}
      <DashboardAIAssistant />
    </div>
  );
}
