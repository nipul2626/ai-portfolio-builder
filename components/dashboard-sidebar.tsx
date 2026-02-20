'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Folder,
  Plus,
  BarChart3,
  Grid3X3,
  Settings,
  Crown,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
  { icon: Folder, label: 'My Portfolios', href: '/dashboard/portfolios', id: 'portfolios' },
  { icon: Plus, label: 'Create New', href: '/dashboard/create', id: 'create' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics', id: 'analytics' },
  { icon: Grid3X3, label: 'Templates', href: '/dashboard/templates', id: 'templates' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', id: 'settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="w-80 bg-deep-surface neu-card border-r border-border fixed left-0 top-0 h-screen flex flex-col">
      {/* Logo section */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-DEFAULT to-secondary rounded-lg flex items-center justify-center font-bold text-lg group-hover:glow-cyan transition-all">
            AI
          </div>
          <div>
            <div className="font-heading text-xl font-bold gradient-text">Portfolio</div>
            <div className="text-xs text-muted-foreground">AI Builder</div>
          </div>
        </Link>
      </div>

      {/* User profile card */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-DEFAULT to-secondary rounded-full flex items-center justify-center text-xl font-bold text-deep-bg ring-2 ring-cyan-DEFAULT hover:scale-105 transition-transform">
            JD
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground text-sm">John Doe</div>
            <div className="text-xs text-muted-foreground">john@example.com</div>
            <Link href="/dashboard/profile" className="text-xs text-cyan-DEFAULT hover:underline mt-1 inline-block">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredIcon(item.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'neu-card ring-2 ring-cyan-DEFAULT bg-deep-card'
                  : 'hover:neu-card hover:bg-deep-card/50'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'text-cyan-DEFAULT' : 'text-muted-foreground group-hover:text-cyan-DEFAULT'
                  } ${hoveredIcon === item.id ? 'animate-pulse' : ''}`}
                />
              </div>
              <span
                className={`font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1 h-6 bg-cyan-DEFAULT rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-cyan-DEFAULT/20 to-secondary/20 rounded-lg p-4 group hover:shadow-lg hover:shadow-cyan-DEFAULT/20 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <Crown className="w-6 h-6 text-secondary animate-float-slow" />
            <span className="text-xs bg-secondary/30 text-secondary px-2 py-1 rounded">New</span>
          </div>
          <h3 className="font-semibold text-foreground text-sm mb-1">Upgrade to Pro</h3>
          <p className="text-xs text-muted-foreground mb-3">Unlock unlimited portfolios</p>
          <button className="w-full py-2 px-3 bg-cyan-DEFAULT text-deep-bg font-semibold rounded-lg hover:scale-105 transition-transform text-sm">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
