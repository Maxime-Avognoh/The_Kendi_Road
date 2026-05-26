import React, { useState } from 'react'
import { Menu, Sparkles } from 'lucide-react'
import Sidebar from './Sidebar.jsx'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-[#1e1e2a] bg-[#0d0d14]">
          <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white p-1">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-red-500" />
            <span className="text-sm font-black text-red-500 uppercase tracking-widest">MAESTRO</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
