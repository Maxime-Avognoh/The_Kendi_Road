import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Globe,
  MapPin,
  Shield,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronRight,
  Swords,
  Menu,
  X
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function NavItem({ to, icon: Icon, label, end = false, indent = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group
        ${indent ? 'ml-4 pl-3' : ''}
        ${isActive
          ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500 pl-[10px]'
          : 'text-gray-400 hover:text-white hover:bg-[#1e1e2a]'
        }`
      }
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const location = useLocation()
  const { characters, locations, factions, storyArcs } = useApp()
  const [worldExpanded, setWorldExpanded] = useState(true)

  const isWorldActive = location.pathname.startsWith('/monde')

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-[#0d0d14] border-r border-[#1e1e2a] z-30
          flex flex-col overflow-hidden
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#1e1e2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Swords size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-black tracking-widest text-red-500 uppercase leading-none">
                The Kendi Road
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Manga Creator</div>
            </div>
          </div>
          <button
            onClick={onMobileClose}
            className="lg:hidden text-gray-500 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {/* GÉNÉRAL */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2">
              Général
            </p>
            <div className="space-y-0.5">
              <NavItem to="/" icon={LayoutDashboard} label="Dashboard" end />
            </div>
          </div>

          {/* CRÉATION */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2">
              Création
            </p>
            <div className="space-y-0.5">
              <NavItem to="/personnages" icon={Users} label="Personnages" />

              {/* Monde with sub-items */}
              <div>
                <button
                  onClick={() => setWorldExpanded(!worldExpanded)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${isWorldActive ? 'text-red-400' : 'text-gray-400 hover:text-white hover:bg-[#1e1e2a]'}
                  `}
                >
                  <Globe size={16} className="flex-shrink-0" />
                  <span className="flex-1 text-left">Monde</span>
                  {worldExpanded
                    ? <ChevronDown size={14} />
                    : <ChevronRight size={14} />
                  }
                </button>

                {worldExpanded && (
                  <div className="mt-0.5 space-y-0.5">
                    <NavLink
                      to="/monde"
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ml-4
                        ${isActive
                          ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500 pl-[10px]'
                          : 'text-gray-400 hover:text-white hover:bg-[#1e1e2a]'
                        }`
                      }
                    >
                      <Globe size={14} className="flex-shrink-0" />
                      <span>Vue d'ensemble</span>
                    </NavLink>
                    <NavLink
                      to="/monde/lieux"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ml-4
                        ${isActive
                          ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500 pl-[10px]'
                          : 'text-gray-400 hover:text-white hover:bg-[#1e1e2a]'
                        }`
                      }
                    >
                      <MapPin size={14} className="flex-shrink-0" />
                      <span>Lieux</span>
                    </NavLink>
                    <NavLink
                      to="/monde/factions"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ml-4
                        ${isActive
                          ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500 pl-[10px]'
                          : 'text-gray-400 hover:text-white hover:bg-[#1e1e2a]'
                        }`
                      }
                    >
                      <Shield size={14} className="flex-shrink-0" />
                      <span>Factions</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* HISTOIRE */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2">
              Histoire
            </p>
            <div className="space-y-0.5">
              <NavItem to="/arcs" icon={BookOpen} label="Arcs Narratifs" />
              <NavItem to="/timeline" icon={Clock} label="Timeline" />
            </div>
          </div>
        </nav>

        {/* Bottom stats */}
        <div className="p-4 border-t border-[#1e1e2a]">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#111118] rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-white">{characters.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Personnages</div>
            </div>
            <div className="bg-[#111118] rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-white">{locations.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Lieux</div>
            </div>
            <div className="bg-[#111118] rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-white">{factions.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Factions</div>
            </div>
            <div className="bg-[#111118] rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-white">{storyArcs.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Arcs</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
