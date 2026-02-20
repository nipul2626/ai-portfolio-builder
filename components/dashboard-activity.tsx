'use client';

import { Sparkles, FileText, Wand2, Rocket, Trophy } from 'lucide-react';

interface Activity {
  id: string;
  type: 'portfolio_created' | 'resume_uploaded' | 'ai_edit' | 'published' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'portfolio_created',
    title: 'Portfolio Created',
    description: '"Full Stack Developer" portfolio created',
    timestamp: '2 hours ago',
    icon: <Sparkles className="w-5 h-5 text-cyan-DEFAULT" />,
  },
  {
    id: '2',
    type: 'resume_uploaded',
    title: 'Resume Uploaded',
    description: 'Updated portfolio with new resume',
    timestamp: '5 hours ago',
    icon: <FileText className="w-5 h-5 text-secondary" />,
  },
  {
    id: '3',
    type: 'ai_edit',
    title: 'AI Edit Made',
    description: 'AI improved your portfolio description',
    timestamp: '1 day ago',
    icon: <Wand2 className="w-5 h-5 text-cyan-DEFAULT" />,
  },
  {
    id: '4',
    type: 'published',
    title: 'Portfolio Published',
    description: '"Web Design Portfolio" is now live',
    timestamp: '2 days ago',
    icon: <Rocket className="w-5 h-5 text-secondary" />,
  },
  {
    id: '5',
    type: 'milestone',
    title: 'View Milestone',
    description: 'Your portfolio reached 1,000 views!',
    timestamp: '3 days ago',
    icon: <Trophy className="w-5 h-5 text-yellow-400" />,
  },
];

export function DashboardActivity() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground font-heading">Recent Activity</h2>
        <button className="text-cyan-DEFAULT text-sm hover:underline transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {/* Timeline connector */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-DEFAULT to-secondary opacity-20" />

        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="neu-card rounded-lg p-4 flex items-start gap-4 hover:scale-102 transition-all duration-200 relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-4 top-8 w-6 h-6 bg-deep-bg rounded-full border-2 border-cyan-DEFAULT flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-DEFAULT rounded-full" />
            </div>

            {/* Icon */}
            <div className="w-10 h-10 bg-deep-card rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              {activity.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
              <p className="text-xs text-muted-foreground/60 mt-2">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
