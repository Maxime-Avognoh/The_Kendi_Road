import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  MapPin,
  Shield,
  BookOpen,
  Clock,
  Plus,
  Swords,
  Zap,
  Heart,
  Flame,
  Star,
  ArrowRight,
  Lightbulb,
  Globe
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const MANGA_TIPS = [
  {
    icon: Swords,
    title: "Conflit & Tension",
    tip: "Chaque scène doit contenir une forme de conflit — physique, émotionnel ou moral. Le conflit fait avancer l'histoire.",
    color: "text-red-400"
  },
  {
    icon: Heart,
    title: "Arcs émotionnels",
    tip: "Les meilleurs personnages d'action ont une blessure intérieure qui guide leurs décisions. La force vient toujours de la vulnérabilité.",
    color: "text-pink-400"
  },
  {
    icon: Zap,
    title: "Rythme & Pacing",
    tip: "Alterne les scènes d'action intense avec des moments de calme. Le contraste rend les climax encore plus percutants.",
    color: "text-amber-400"
  },
  {
    icon: Flame,
    title: "Thèmes profonds",
    tip: "Action/aventure sans thème c'est du bruit. Pose-toi la question : qu'est-ce que mon histoire dit sur l'humanité ?",
    color: "text-orange-400"
  },
  {
    icon: Star,
    title: "Révélations",
    tip: "Les meilleures twists sont ceux qui étaient visibles en relecture. Plante tes indices dès le début.",
    color: "text-purple-400"
  },
  {
    icon: Lightbulb,
    title: "Show, don't tell",
    tip: "Montre la personnalité à travers les actions. Un héros courageux saute au danger sans hésiter, il ne dit pas 'je suis courageux'.",
    color: "text-cyan-400"
  }
]

function StatCard({ icon: Icon, label, count, to, color }) {
  return (
    <Link
      to={to}
      className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5 hover:border-red-500/30 hover:bg-[#14141c] transition-all duration-200 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</p>
          <p className="text-3xl font-black text-white">{count}</p>
        </div>
        <div className={`p-2 rounded-lg bg-[#0a0a0f] ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
        <span>Voir tout</span>
        <ArrowRight size={12} />
      </div>
    </Link>
  )
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function getAvatarColor(character) {
  if (character.themeColor) return character.themeColor
  const colors = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#0891b2']
  const name = character.name || ''
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

const ROLE_COLORS = {
  'Protagoniste': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  'Antagoniste': 'bg-red-500/20 text-red-400 border border-red-500/30',
  'Allié': 'bg-green-500/20 text-green-400 border border-green-500/30',
  'Rival': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  'Mentor': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  'Neutre': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
}

export default function Dashboard() {
  const { characters, locations, factions, storyArcs, timelineEvents } = useApp()
  const isEmpty = characters.length === 0 && locations.length === 0 && factions.length === 0 && storyArcs.length === 0

  const recentCharacters = [...characters]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 3)

  if (isEmpty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Swords size={40} className="text-red-500" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            Commence ton aventure
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Ton atelier manga est vide. Crée ton premier personnage et donne vie à ton histoire.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <Link to="/personnages/nouveau" className="btn-primary">
            <Plus size={16} />
            Créer un personnage
          </Link>
          <Link to="/monde" className="btn-secondary">
            <Globe size={16} />
            Construire le monde
          </Link>
          <Link to="/arcs" className="btn-secondary">
            <BookOpen size={16} />
            Planifier un arc
          </Link>
        </div>

        <div className="w-full max-w-4xl">
          <p className="section-title justify-center mb-6">
            <Lightbulb size={14} />
            Conseils pour ton manga
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MANGA_TIPS.map((tip, i) => (
              <div key={i} className="panel-section text-left">
                <div className="flex items-center gap-2 mb-2">
                  <tip.icon size={16} className={tip.color} />
                  <span className="text-sm font-semibold text-white">{tip.title}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 bg-red-500 rounded-full" />
          <h1 className="text-2xl font-black text-white tracking-tight">
            Atelier Manga
          </h1>
        </div>
        <p className="text-gray-500 text-sm ml-3">
          Bienvenue dans ton espace de création — <span className="text-amber-400">The Kendi Road</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Personnages" count={characters.length} to="/personnages" color="text-blue-400" />
        <StatCard icon={MapPin} label="Lieux" count={locations.length} to="/monde/lieux" color="text-green-400" />
        <StatCard icon={Shield} label="Factions" count={factions.length} to="/monde/factions" color="text-amber-400" />
        <StatCard icon={BookOpen} label="Arcs Narratifs" count={storyArcs.length} to="/arcs" color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Characters */}
        <div className="lg:col-span-2">
          <div className="panel-section">
            <div className="flex items-center justify-between mb-4">
              <p className="section-title mb-0">
                <Users size={14} />
                Personnages récents
              </p>
              <Link to="/personnages" className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1">
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>

            {recentCharacters.length === 0 ? (
              <div className="text-center py-8">
                <Users size={32} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">Aucun personnage créé</p>
                <Link to="/personnages/nouveau" className="text-red-500 hover:text-red-400 text-sm mt-2 inline-flex items-center gap-1">
                  <Plus size={12} /> Créer le premier
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentCharacters.map(char => {
                  const avatarColor = getAvatarColor(char)
                  const initials = getInitials(char.name)
                  const roleClass = ROLE_COLORS[char.role] || ROLE_COLORS['Neutre']
                  return (
                    <Link
                      key={char.id}
                      to={`/personnages/${char.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#0a0a0f] transition-colors group"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: avatarColor }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-white">{char.name}</span>
                          {char.role && (
                            <span className={`badge ${roleClass}`}>{char.role}</span>
                          )}
                        </div>
                        {char.personality && (
                          <p className="text-xs text-gray-600 mt-0.5 truncate">{char.personality}</p>
                        )}
                      </div>
                      <ArrowRight size={14} className="text-gray-700 group-hover:text-gray-400 flex-shrink-0" />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="panel-section">
          <p className="section-title">
            <Zap size={14} />
            Actions rapides
          </p>
          <div className="space-y-2">
            <Link to="/personnages/nouveau" className="btn-primary w-full justify-center">
              <Plus size={14} />
              Nouveau personnage
            </Link>
            <Link to="/monde/lieux" className="btn-secondary w-full justify-center">
              <MapPin size={14} />
              Ajouter un lieu
            </Link>
            <Link to="/monde/factions" className="btn-secondary w-full justify-center">
              <Shield size={14} />
              Créer une faction
            </Link>
            <Link to="/arcs" className="btn-secondary w-full justify-center">
              <BookOpen size={14} />
              Nouvel arc narratif
            </Link>
            <Link to="/timeline" className="btn-secondary w-full justify-center">
              <Clock size={14} />
              Ajouter un événement
            </Link>
          </div>

          <div className="mt-5 pt-4 border-t border-[#1e1e2a]">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <div className="text-lg font-black text-amber-400">{timelineEvents.length}</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wide">Événements</div>
              </div>
              <div>
                <div className="text-lg font-black text-amber-400">
                  {storyArcs.filter(a => a.status === 'En cours').length}
                </div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wide">Arcs actifs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div>
        <p className="section-title">
          <Lightbulb size={14} />
          Conseils du mangaka
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MANGA_TIPS.map((tip, i) => (
            <div key={i} className="panel-section">
              <div className="flex items-center gap-2 mb-2">
                <tip.icon size={15} className={tip.color} />
                <span className="text-sm font-semibold text-white">{tip.title}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
