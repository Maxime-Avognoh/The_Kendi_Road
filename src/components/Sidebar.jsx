import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Send,
  BookOpen,
  History,
  Settings,
  X,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function NavItem({ to, icon: Icon, label, end = false, badge }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
        ${isActive
          ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500 pl-[10px]'
          : 'text-gray-400 hover:text-white hover:bg-[#1e1e2a]'
        }`
      }
    >
      <Icon size={16} className="flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge != null && badge > 0 && (
        <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { submissions } = useApp()

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onMobileClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-[260px] bg-[#0d0d14] border-r border-[#1e1e2a] z-30
        flex flex-col overflow-hidden transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-[#1e1e2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/30">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-black tracking-widest text-red-500 uppercase leading-none">
                MAESTRO
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">Conseiller Éditorial</div>
            </div>
          </div>
          <button onClick={onMobileClose} className="lg:hidden text-gray-500 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2">
              Principal
            </p>
            <div className="space-y-0.5">
              <NavItem to="/" icon={LayoutDashboard} label="Accueil" end />
              <NavItem to="/soumettre" icon={Send} label="Soumettre un texte" />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2">
              Ressources
            </p>
            <div className="space-y-0.5">
              <NavItem to="/guide" icon={BookOpen} label="Guide Éditorial" />
              <NavItem to="/historique" icon={History} label="Mes soumissions" badge={submissions.length} />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2">
              Configuration
            </p>
            <div className="space-y-0.5">
              <NavItem to="/parametres" icon={Settings} label="Paramètres API" />
            </div>
          </div>
        </nav>

        {/* Bottom quote */}
        <div className="p-4 border-t border-[#1e1e2a]">
          <div className="bg-[#111118] rounded-lg p-3">
            <p className="text-[10px] text-gray-500 italic leading-relaxed">
              "Les histoires ne sont pas ce qui arrive aux gens, mais comment les gens changent face à ce qui leur arrive."
            </p>
            <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wide">— Maestro</p>
          </div>
        </div>
      </aside>
    </>
  )
}
