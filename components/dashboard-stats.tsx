'use client';

import { useEffect, useState } from 'react';
import { Folder, Eye, Download, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  change: string;
  isPositive: boolean;
}

function StatCard({ icon, label, value, change, isPositive }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const increment = value / 30;
    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        if (prev >= value) {
          clearInterval(interval);
          return value;
        }
        return prev + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <div
      className="neu-card rounded-lg p-6 hover:scale-105 transition-transform duration-200 cursor-pointer"
      onMouseEnter={() => setInView(true)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-deep-card rounded-lg flex items-center justify-center text-lg group hover:glow-cyan transition-all">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>

      <div className="mb-2">
        <div className="text-4xl font-bold text-foreground">
          {Math.round(displayValue)}
        </div>
      </div>

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Folder className="w-6 h-6 text-cyan-DEFAULT" />}
        label="Total Portfolios"
        value={12}
        change="+2 this week"
        isPositive
      />
      <StatCard
        icon={<Eye className="w-6 h-6 text-cyan-DEFAULT" />}
        label="Total Views"
        value={2547}
        change="+124 this week"
        isPositive
      />
      <StatCard
        icon={<Download className="w-6 h-6 text-secondary" />}
        label="Resume Downloads"
        value={89}
        change="+15 this week"
        isPositive
      />
      <StatCard
        icon={<Sparkles className="w-6 h-6 text-secondary" />}
        label="AI Assists Used"
        value={34}
        change="23 remaining"
        isPositive
      />
    </div>
  );
}
