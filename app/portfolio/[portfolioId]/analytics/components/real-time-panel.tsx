'use client'

const recentEvents = [
  {
    time: '2s ago',
    text: 'User from New York viewed Projects',
  },
  {
    time: '15s ago',
    text: 'Resume downloaded from LinkedIn',
  },
  {
    time: '1m ago',
    text: 'User from London viewed About',
  },
  {
    time: '3m ago',
    text: 'User from Singapore viewed Contact',
  },
  {
    time: '5m ago',
    text: 'Portfolio viewed from Google Search',
  },
]

export default function RealTimePanel() {
  return (
    <div className="neu-card p-6 rounded-lg space-y-4 sticky top-96">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <h3 className="text-lg font-bold text-white">Right Now</h3>
      </div>

      <p className="text-sm font-medium text-white">3 visitors online</p>

      {/* Active Pages */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#a0a0b8] uppercase">Active Pages</p>
        {[
          { page: 'Projects', count: 2 },
          { page: 'About', count: 1 },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-[#12121a] rounded-lg border border-[#1a1a24]">
            <span className="text-xs font-medium text-white">{item.page}</span>
            <span className="text-xs bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded-full">
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#a0a0b8] uppercase">Recent Events</p>
        {recentEvents.map((event, idx) => (
          <div key={idx} className="p-2 bg-[#12121a] rounded-lg border border-[#1a1a24] animate-fadeIn">
            <p className="text-xs text-white">{event.text}</p>
            <p className="text-xs text-[#a0a0b8] mt-1">{event.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
