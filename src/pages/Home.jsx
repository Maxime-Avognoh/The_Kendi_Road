import React from 'react'
import { Link } from 'react-router-dom'
import {
  Send, BookOpen, Sparkles, ArrowRight, Star, Zap, Heart, Flame,
  Target, TrendingUp, MessageSquare, Globe, User
} from 'lucide-react'
import { CATEGORIES } from '../utils/categories.js'
import { useApp } from '../context/AppContext.jsx'

const ICON_MAP = {
  Target, TrendingUp, BookOpen, Globe, User, MessageSquare, Flame
}

const MAESTRO_PILLARS = [
  {
    icon: Star,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    title: 'Notation /20 Multi-critères',
    desc: 'Chaque soumission est notée sur des critères précis adaptés à son type. Pas de notes génériques — une analyse chirurgicale.',
  },
  {
    icon: Zap,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    title: 'Feedback Professionnel',
    desc: 'Le niveau d\'exigence d\'un grand éditeur. Points forts, faiblesses, actions concrètes — pas de flatterie inutile.',
  },
  {
    icon: Heart,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    title: 'Spécialisé Action / Drame',
    desc: 'Expert des genres action, aventure, drame et émotionnel. Les registres qui font les grands mangas shōnen et shōjo.',
  },
  {
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    title: 'Guide Complet Intégré',
    desc: 'Chaque catégorie est accompagnée d\'un guide détaillé avec questions-clés pour maximiser la qualité de ta soumission.',
  },
]

function CategoryPreviewCard({ cat }) {
  const IconComponent = ICON_MAP[cat.icon] || Target
  return (
    <Link
      to="/soumettre"
      className={`group bg-[#111118] border border-[#1e1e2a] rounded-xl p-4 hover:${cat.borderClass} transition-all duration-200 hover:bg-[#14141c]`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-2xl flex-shrink-0 w-10 h-10 ${cat.bgClass} rounded-lg flex items-center justify-center`}>
          <span>{cat.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`text-sm font-bold text-white group-hover:${cat.colorClass} transition-colors`}>{cat.label}</h3>
            <ArrowRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors flex-shrink-0" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const { submissions } = useApp()

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">

      {/* Hero */}
      <div className="text-center py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
          <Sparkles size={14} className="text-red-400" />
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Conseiller Éditorial Manga & Littéraire</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight">
          Bienvenue chez{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            MAESTRO
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Soumets tes scénarios, personnages, chapitres ou world building et reçois un{' '}
          <span className="text-white font-semibold">feedback éditorial complet</span> avec notation{' '}
          <span className="text-red-400 font-bold">/20</span> par critères. Le niveau d'exigence d'un grand éditeur, pour forger la future star du manga.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/soumettre" className="btn-primary text-base px-6 py-3">
            <Send size={18} />
            Soumettre un texte
          </Link>
          <Link to="/guide" className="btn-secondary text-base px-6 py-3">
            <BookOpen size={18} />
            Voir le guide
          </Link>
        </div>
        {submissions.length > 0 && (
          <p className="mt-4 text-sm text-gray-600">
            Tu as{' '}
            <Link to="/historique" className="text-red-400 hover:underline font-medium">
              {submissions.length} soumission{submissions.length > 1 ? 's' : ''} analysée{submissions.length > 1 ? 's' : ''}
            </Link>
          </p>
        )}
      </div>

      {/* Pillars */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 bg-red-500 rounded-full" />
          <h2 className="text-lg font-black text-white uppercase tracking-wide">Ce que fait MAESTRO</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MAESTRO_PILLARS.map((pillar, i) => (
            <div key={i} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5 flex gap-4">
              <div className={`w-10 h-10 ${pillar.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <pillar.icon size={20} className={pillar.color} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{pillar.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-red-500 rounded-full" />
            <h2 className="text-lg font-black text-white uppercase tracking-wide">7 Catégories d'Analyse</h2>
          </div>
          <Link to="/soumettre" className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1">
            Soumettre <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CATEGORIES.map(cat => <CategoryPreviewCard key={cat.id} cat={cat} />)}
        </div>
      </div>

      {/* Quote / Manifesto */}
      <div className="bg-gradient-to-r from-red-950/30 to-[#111118] border border-red-900/30 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles size={24} className="text-red-400" />
        </div>
        <blockquote className="text-xl font-bold text-white mb-3 leading-relaxed max-w-2xl mx-auto">
          "Un auteur médiocre écrit ce qu'il veut raconter. Un grand auteur écrit ce que le lecteur a besoin de ressentir."
        </blockquote>
        <p className="text-red-500 font-bold text-sm uppercase tracking-widest">— Maestro, Conseiller Éditorial</p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['Action', 'Aventure', 'Drame', 'Émotion', 'Manga', 'Littérature'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-[#111118] border border-[#1e1e2a] rounded-full text-xs text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
