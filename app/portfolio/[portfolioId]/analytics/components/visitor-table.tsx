'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, Download } from 'lucide-react'

const mockVisitors = [
  {
    id: 1,
    timestamp: '2024-02-20 14:32',
    location: '🇺🇸 New York, US',
    device: '💻 Desktop',
    browser: 'Chrome',
    duration: '4m 32s',
    pages: 5,
    source: 'LinkedIn',
    status: 'New',
  },
  {
    id: 2,
    timestamp: '2024-02-20 14:15',
    location: '🇮🇳 Bangalore, IN',
    device: '📱 Mobile',
    browser: 'Safari',
    duration: '2m 15s',
    pages: 3,
    source: 'Google',
    status: 'New',
  },
  {
    id: 3,
    timestamp: '2024-02-20 13:45',
    location: '🇬🇧 London, UK',
    device: '💻 Desktop',
    browser: 'Firefox',
    duration: '6m 42s',
    pages: 7,
    source: 'Direct',
    status: 'Returning',
  },
  {
    id: 4,
    timestamp: '2024-02-20 13:20',
    location: '🇺🇸 San Francisco, US',
    device: '💻 Desktop',
    browser: 'Chrome',
    duration: '3m 18s',
    pages: 4,
    source: 'Twitter',
    status: 'New',
  },
  {
    id: 5,
    timestamp: '2024-02-20 12:55',
    location: '🇨🇦 Toronto, CA',
    device: '📱 Mobile',
    browser: 'Chrome',
    duration: '1m 45s',
    pages: 2,
    source: 'LinkedIn',
    status: 'New',
  },
]

export default function VisitorTable() {
  return (
    <div className="neu-card p-6 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Visitor Details</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Search visitors..."
            className="w-48 neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 text-sm"
          />
          <Button size="sm" variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a34]">
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Timestamp</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Device</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Browser</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Duration</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Pages</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Source</th>
              <th className="text-left py-3 px-4 font-semibold text-[#a0a0b8]">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-[#a0a0b8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockVisitors.map((visitor) => (
              <tr
                key={visitor.id}
                className="border-b border-[#1a1a24] hover:bg-[#12121a]/50 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 text-white text-xs">{visitor.timestamp}</td>
                <td className="py-3 px-4 text-white text-xs">{visitor.location}</td>
                <td className="py-3 px-4 text-white text-xs">{visitor.device}</td>
                <td className="py-3 px-4 text-white text-xs">{visitor.browser}</td>
                <td className="py-3 px-4 text-[#a0a0b8] text-xs">{visitor.duration}</td>
                <td className="py-3 px-4 text-[#a0a0b8] text-xs">{visitor.pages}</td>
                <td className="py-3 px-4 text-[#00f0ff] text-xs font-medium">{visitor.source}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    visitor.status === 'New'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {visitor.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <Button size="sm" variant="ghost" className="text-[#00f0ff] hover:bg-[#00f0ff]/10 h-6">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2a2a34]">
        <p className="text-xs text-[#a0a0b8]">Showing 1-5 of 1,234 visitors</p>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24] h-8 text-xs" disabled>
            Previous
          </Button>
          {[1, 2, 3, '...', 50].map((page, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={page === 1 ? 'default' : 'outline'}
              className={page === 1 ? 'bg-[#00f0ff] text-black h-8 text-xs' : 'border-[#2a2a34] text-white hover:bg-[#1a1a24] h-8 text-xs'}
            >
              {page}
            </Button>
          ))}
          <Button size="sm" variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24] h-8 text-xs">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
