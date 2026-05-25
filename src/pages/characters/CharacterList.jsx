import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Users, Search, Pencil, Trash2, Eye } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const ROLE_COLORS = {
  'Protagoniste': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  'Antagoniste': 'bg-red-500/20 text-red-400 border border-red-500/30',
  'Allié': 'bg-green-500/20 text-green-400 border border-green-500/30',
  'Rival': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  'Mentor': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  'Neutre': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
}

const STATUS_COLORS = {
  'Vivant': 'bg-green-500/20 text-green-400',
  'Décédé': 'bg-red-500/20 text-red-400',
  'Disparu': 'bg-yellow-500/20 text-yellow-400',
  'Inconnu': 'bg-gray-500/20 text-gray-400',
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function getAvatarColor(character) {
  if (character.themeColor) return character.themeColor
  const colors = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#0891b2', '#be185d', '#0369a1']
  const name = character.name || ''
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function CharacterCard({ character, onDelete }) {
  const [hovering, setHovering] = useState(false)
  const avatarColor = getAvatarColor(character)
  const initials = getInitials(character.name)
  const roleClass = ROLE_COLORS[character.role] || ROLE_COLORS['Neutre']
  const statusClass = STATUS_COLORS[character.status] || STATUS_COLORS['Inconnu']

  return (
    <div
      className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5 hover:border-red-500/30 hover:bg-[#14141c] transition-all duration-200 relative group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={`absolute top-3 right-3 flex gap-1 transition-opacity duration-150 ${hovering ? 'opacity-100' : 'opacity-0'}`}>
        <Link
          to={`/personnages/${character.id}`}
          className="p-1.5 rounded bg-[#0a0a0f] text-gray-400 hover:text-blue-400 transition-colors"
          title="Voir le personnage"
          onClick={e => e.stopPropagation()}
        >
          <Eye size={14} />
        </Link>
        <Link
          to={`/personnages/${character.id}/modifier`}
          className="p-1.5 rounded bg-[#0a0a0f] text-gray-400 hover:text-amber-400 transition-colors"
          title="Modifier"
          onClick={e => e.stopPropagation()}
        >
          <Pencil size={14} />
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(character.id) }}
          className="p-1.5 rounded bg-[#0a0a0f] text-gray-400 hover:text-red-500 transition-colors"
          title="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <Link to={`/personnages/${character.id}`} className="block">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg"
            style={{ backgroundColor: avatarColor, boxShadow: `0 0 20px ${avatarColor}40` }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white truncate">{character.name}</h3>
            {character.nickname && (
              <p className="text-xs text-amber-400/80 truncate">"{character.nickname}"</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {character.role && (
            <span className={`badge ${roleClass}`}>{character.role}</span>
          )}
          {character.status && (
            <span className={`badge ${statusClass}`}>{character.status}</span>
          )}
          {character.age && (
            <span className="badge bg-[#0a0a0f] text-gray-500 border border-[#1e1e2a]">
              {character.age} ans
            </span>
          )}
        </div>

        {character.personality && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{character.personality}</p>
        )}
        {character.quote && !character.personality && (
          <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">"{character.quote}"</p>
        )}
      </Link>
    </div>
  )
}

export default function CharacterList() {
  const { characters, deleteCharacter } = useApp()
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')

  const filtered = characters.filter(c => {
    const matchSearch = !search || c.name?.toLowerCase().includes(search.toLowerCase())
    const matchRole = !filterRole || c.role === filterRole
    return matchSearch && matchRole
  })

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce personnage ? Cette action est irréversible.')) {
      deleteCharacter(id)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white tracking-tight">Personnages</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">
            {characters.length} personnage{characters.length !== 1 ? 's' : ''} créé{characters.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/personnages/nouveau" className="btn-primary">
          <Plus size={16} />
          Nouveau personnage
        </Link>
      </div>

      {characters.length > 0 && (
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Rechercher un personnage..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            className="input-field w-auto min-w-[160px]"
          >
            <option value="">Tous les rôles</option>
            {Object.keys(ROLE_COLORS).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      )}

      {characters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-[#111118] border border-[#1e1e2a] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users size={36} className="text-gray-700" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Aucun personnage pour l'instant</h2>
          <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
            Les héros, antagonistes et alliés de ton histoire t'attendent.
            Crée ton premier personnage pour commencer.
          </p>
          <Link to="/personnages/nouveau" className="btn-primary">
            <Plus size={16} />
            Créer mon premier personnage
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">Aucun personnage ne correspond à ta recherche.</p>
          <button
            onClick={() => { setSearch(''); setFilterRole('') }}
            className="text-red-500 hover:text-red-400 text-sm mt-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
