import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, User, Eye, Brain, Clock, Zap, BookOpen, Heart, StickyNote, Swords } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const ROLE_COLORS = {
  Protagoniste: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Antagoniste: 'bg-red-500/20 text-red-400 border-red-500/30',
  Allié: 'bg-green-500/20 text-green-400 border-green-500/30',
  Rival: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Mentor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Neutre: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const STATUS_COLORS = {
  Vivant: 'bg-green-500/20 text-green-400',
  Décédé: 'bg-red-500/20 text-red-400',
  Disparu: 'bg-yellow-500/20 text-yellow-400',
  Inconnu: 'bg-gray-500/20 text-gray-400',
}

const POWER_LEVEL_COLORS = {
  Ordinaire: 'text-gray-400',
  Élite: 'text-blue-400',
  Exceptionnel: 'text-purple-400',
  Légendaire: 'text-amber-400',
  'Au-delà des limites': 'text-red-400',
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function InfoBlock({ label, value, accent }) {
  if (!value) return null
  return (
    <div>
      <span className="field-label">{label}</span>
      <p className={`field-value ${accent || ''}`}>{value}</p>
    </div>
  )
}

function SectionCard({ icon: Icon, title, color, children }) {
  const hasContent = React.Children.toArray(children).some(child => child)
  if (!hasContent) return null
  return (
    <div className="panel-section">
      <div className="section-title">
        <Icon size={14} />
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

export default function CharacterSheet() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { characters, deleteCharacter } = useApp()
  const char = characters.find(c => c.id === id)

  if (!char) {
    return (
      <div className="p-6 text-center py-24">
        <Swords size={40} className="text-gray-700 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">Personnage introuvable.</p>
        <Link to="/personnages" className="btn-secondary inline-flex">
          <ArrowLeft size={16} />Retour aux personnages
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Supprimer ${char.name} ? Cette action est irréversible.`)) {
      deleteCharacter(id)
      navigate('/personnages')
    }
  }

  const avatarColor = char.themeColor || '#e11d48'
  const initials = getInitials(char.name)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Link to="/personnages" className="btn-ghost">
          <ArrowLeft size={16} />Personnages
        </Link>
        <div className="flex-1" />
        <Link to={`/personnages/${id}/modifier`} className="btn-secondary">
          <Pencil size={14} />Modifier
        </Link>
        <button onClick={handleDelete} className="btn-secondary text-red-400 hover:text-red-300">
          <Trash2 size={14} />Supprimer
        </button>
      </div>

      {/* Hero section */}
      <div className="panel-section mb-4 flex gap-6 items-start flex-wrap">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-2xl flex-shrink-0"
            style={{ backgroundColor: avatarColor, boxShadow: `0 0 40px ${avatarColor}50` }}
          >
            {initials}
          </div>
          {char.powerLevel && (
            <span className={`text-xs font-bold uppercase tracking-wider ${POWER_LEVEL_COLORS[char.powerLevel] || 'text-gray-400'}`}>
              {char.powerLevel}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-black text-white mb-1 leading-none">{char.name}</h1>
          {char.nickname && (
            <p className="text-amber-400 text-base mb-3">« {char.nickname} »</p>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {char.role && (
              <span className={`badge border ${ROLE_COLORS[char.role] || 'bg-gray-500/20 text-gray-400'}`}>{char.role}</span>
            )}
            {char.status && (
              <span className={`badge ${STATUS_COLORS[char.status] || 'bg-gray-500/20 text-gray-400'}`}>{char.status}</span>
            )}
            {char.age && (
              <span className="badge bg-[#0a0a0f] text-gray-400 border border-[#1e1e2a]">{char.age} ans</span>
            )}
            {char.gender && (
              <span className="badge bg-[#0a0a0f] text-gray-400 border border-[#1e1e2a]">{char.gender}</span>
            )}
          </div>
          {char.quote && (
            <blockquote className="border-l-2 border-red-500/50 pl-3 text-gray-400 italic text-sm">
              "{char.quote}"
            </blockquote>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Apparence */}
        <SectionCard icon={Eye} title="Apparence physique" color="text-purple-400">
          <InfoBlock label="Taille & Corpulence" value={char.height} />
          <InfoBlock label="Cheveux" value={char.hairColor} />
          <InfoBlock label="Yeux" value={char.eyeColor} />
          <InfoBlock label="Traits distinctifs" value={char.distinctiveFeatures} />
          <InfoBlock label="Style vestimentaire" value={char.clothingStyle} />
        </SectionCard>

        {/* Personnalité */}
        <SectionCard icon={Brain} title="Personnalité" color="text-pink-400">
          <InfoBlock label="Personnalité générale" value={char.personality} />
          <InfoBlock label="Qualités" value={char.qualities} />
          <InfoBlock label="Défauts" value={char.flaws} />
          <InfoBlock label="Peurs profondes" value={char.fears} />
          <InfoBlock label="Motivations" value={char.motivations} />
          <InfoBlock label="Valeurs & Principes" value={char.values} />
        </SectionCard>

        {/* Histoire */}
        <SectionCard icon={Clock} title="Histoire" color="text-amber-400">
          <InfoBlock label="Passé & Origines" value={char.pastHistory} />
          <InfoBlock label="Événements clés" value={char.keyEvents} />
          <InfoBlock label="Traumatismes" value={char.traumas} />
          <InfoBlock label="Secrets" value={char.secrets} />
          <InfoBlock label="Famille & Proches" value={char.family} />
        </SectionCard>

        {/* Pouvoirs */}
        <SectionCard icon={Zap} title="Compétences & Pouvoirs" color="text-yellow-400">
          <InfoBlock label="Combat" value={char.combatSkills} />
          <InfoBlock label="Pouvoirs & Techniques" value={char.specialPowers} />
          <InfoBlock label="Compétences uniques" value={char.uniqueSkills} />
          <InfoBlock label="Faiblesses & Limites" value={char.weaknesses} />
        </SectionCard>

        {/* Arc narratif */}
        <SectionCard icon={BookOpen} title="Arc Narratif" color="text-green-400">
          <InfoBlock label="Objectifs" value={char.objectives} />
          <InfoBlock label="Conflits internes" value={char.internalConflicts} />
          <InfoBlock label="Évolution prévue" value={char.narrativeEvolution} />
          <InfoBlock label="Turning point" value={char.turningPoint} />
        </SectionCard>

        {/* Relations */}
        {char.relationshipNotes && (
          <SectionCard icon={Heart} title="Relations" color="text-red-400">
            <InfoBlock label="Relations avec les autres" value={char.relationshipNotes} />
          </SectionCard>
        )}

        {/* Notes */}
        {char.notes && (
          <SectionCard icon={StickyNote} title="Notes du mangaka" color="text-gray-400">
            <InfoBlock label="Notes libres" value={char.notes} />
          </SectionCard>
        )}
      </div>
    </div>
  )
}
