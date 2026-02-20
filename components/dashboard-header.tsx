'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, LogOut, User } from 'lucide-react';

export function DashboardHeader() {
  const [greeting, setGreeting] = useState('Good morning');
  const [time, setTime] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    };

    updateGreeting();
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-80 right-0 h-20 bg-deep-bg/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 z-40">
      {/* Left side - Greeting */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold gradient-text font-heading">
          {greeting}, John
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{time}</p>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="hidden lg:flex items-center gap-2 neu-card-inset px-4 py-2 rounded-lg w-80 focus-within:ring-2 focus-within:ring-cyan-DEFAULT transition-all">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search portfolios, templates..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-deep-card rounded-lg transition-colors group"
          >
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-cyan-DEFAULT group-hover:animate-bounce" />
            {notifications > 0 && (
              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 neu-card rounded-lg p-4 shadow-lg">
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="p-3 bg-deep-card rounded-lg hover:bg-deep-card/80 transition-colors">
                    <p className="text-sm font-medium text-foreground">Portfolio view milestone</p>
                    <p className="text-xs text-muted-foreground mt-1">Your portfolio reached 100 views!</p>
                    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-cyan-DEFAULT hover:bg-deep-card rounded transition-colors">
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 hover:bg-deep-card rounded-lg transition-colors group"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-muted-foreground group-hover:text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground group-hover:text-cyan-DEFAULT" />
          )}
        </button>

        {/* User menu */}
        <div className="relative group">
          <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-DEFAULT to-secondary flex items-center justify-center font-bold text-deep-bg hover:scale-105 transition-transform">
            JD
          </button>
          <div className="absolute right-0 mt-2 w-48 neu-card rounded-lg p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-deep-card rounded-lg transition-colors text-sm text-foreground">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-deep-card rounded-lg transition-colors text-sm text-red-500">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
