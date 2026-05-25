import React, { useState } from 'react'
import { Shield, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useApp } from '../../context/AppContext.jsx'

const TYPE_STYLES = {
  'Organisation Secrète': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Clan': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Nation': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Empire': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Guilde': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Ordre': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Armée': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'Religion': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Gang': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Famille': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Autre': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const EMPTY_FORM = {
  name: '', type: '', motto: '', ideology: '', objectives: '',
  leader: '', notableMembers: '', symbols: '', territory: '',
  allies: '', enemies: '', methods: '', factionHistory: '', notes: ''
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="field-label">{label}</label>
      {children}
    </div>
  )
}

function FactionForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Le nom de la faction est obligatoire.')
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nom *">
          <input className="input-field" placeholder="Nom de la faction" value={form.name} onChange={set('name')} required />
        </Field>
        <Field label="Type">
          <select className="input-field" value={form.type} onChange={set('type')}>
            <option value="">— Choisir —</option>
            {Object.keys(TYPE_STYLES).map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Devise / Slogan">
          <input className="input-field" placeholder="Ex: L'ombre protège, la lumière trahit" value={form.motto} onChange={set('motto')} />
        </Field>
        <Field label="Chef / Dirigeant">
          <input className="input-field" placeholder="Nom du leader" value={form.leader} onChange={set('leader')} />
        </Field>
      </div>
      <Field label="Idéologie & Valeurs">
        <textarea className="textarea-field" rows={3} placeholder="Ce en quoi croit cette faction..." value={form.ideology} onChange={set('ideology')} />
      </Field>
      <Field label="Objectifs">
        <textarea className="textarea-field" rows={3} placeholder="Que cherche à accomplir cette faction ?" value={form.objectives} onChange={set('objectives')} />
      </Field>
      <Field label="Membres notables">
        <textarea className="textarea-field" rows={2} placeholder="Les figures importantes de la faction..." value={form.notableMembers} onChange={set('notableMembers')} />
      </Field>
      <Field label="Symboles & Apparence">
        <textarea className="textarea-field" rows={2} placeholder="Le sceau, les couleurs, l'uniforme, les symboles..." value={form.symbols} onChange={set('symbols')} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Territoire & Influence">
          <textarea className="textarea-field" rows={2} placeholder="Zones de contrôle, d'influence..." value={form.territory} onChange={set('territory')} />
        </Field>
        <Field label="Méthodes & Moyens">
          <textarea className="textarea-field" rows={2} placeholder="Comment agit-elle ? Force, corruption, diplomatie..." value={form.methods} onChange={set('methods')} />
        </Field>
        <Field label="Alliés">
          <textarea className="textarea-field" rows={2} placeholder="Factions, nations, personnages alliés..." value={form.allies} onChange={set('allies')} />
        </Field>
        <Field label="Ennemis">
          <textarea className="textarea-field" rows={2} placeholder="Leurs adversaires, rivaux, ennemis jurés..." value={form.enemies} onChange={set('enemies')} />
        </Field>
      </div>
      <Field label="Histoire de la faction">
        <textarea className="textarea-field" rows={3} placeholder="Comment est-elle née ? Son histoire..." value={form.factionHistory} onChange={set('factionHistory')} />
      </Field>
      <Field label="Notes">
        <textarea className="textarea-field" rows={2} placeholder="Notes libres..." value={form.notes} onChange={set('notes')} />
      </Field>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">
          <Save size={14} />
          Enregistrer
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          <X size={14} />
          Annuler
        </button>
      </div>
    </form>
  )
}

export default function Factions() {
  const { factions, addFaction, updateFaction, deleteFaction } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = factions.filter(f =>
    !search || f.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = (form) => {
    addFaction({ ...form, id: uuidv4() })
    setShowForm(false)
  }

  const handleUpdate = (form) => {
    updateFaction(editingId, form)
    setEditingId(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette faction ?')) deleteFaction(id)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white">Factions & Organisations</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">{factions.length} faction{factions.length !== 1 ? 's' : ''}</p>
        </div>
        {!showForm && (
          <button onClick={() => { setShowForm(true); setEditingId(null) }} className="btn-primary">
            <Plus size={16} />
            Nouvelle faction
          </button>
        )}
      </div>

      {showForm && (
        <div className="panel-section mb-6">
          <p className="section-title mb-4">
            <Shield size={14} />
            Nouvelle faction
          </p>
          <FactionForm
            initial={EMPTY_FORM}
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {factions.length > 0 && (
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Rechercher une faction..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
      )}

      {factions.length === 0 && !showForm ? (
        <div className="text-center py-20">
          <Shield size={40} className="text-gray-700 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Aucune faction créée</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Les clans, empires, guildes et ordres secrets de ton univers mangas attendent d'être définis.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={16} />
            Créer ma première faction
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(faction => (
            <div key={faction.id} className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden hover:border-red-500/20 transition-all">
              {editingId === faction.id ? (
                <div className="p-5">
                  <p className="section-title mb-4">
                    <Pencil size={14} />
                    Modifier la faction
                  </p>
                  <FactionForm
                    initial={faction}
                    onSave={handleUpdate}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Shield size={18} className="text-amber-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white truncate">{faction.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {faction.type && (
                            <span className={`badge border ${TYPE_STYLES[faction.type] || TYPE_STYLES['Autre']}`}>
                              {faction.type}
                            </span>
                          )}
                          {faction.leader && (
                            <span className="badge bg-[#0a0a0f] text-gray-500 border border-[#1e1e2a]">
                              Chef: {faction.leader}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setEditingId(faction.id)}
                        className="p-1.5 text-gray-500 hover:text-amber-400 transition-colors rounded"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(faction.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 transition-colors rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {faction.motto && (
                    <p className="text-xs text-amber-400/70 italic mb-2">"{faction.motto}"</p>
                  )}
                  {faction.ideology && (
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{faction.ideology}</p>
                  )}
                  {faction.objectives && !faction.ideology && (
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{faction.objectives}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
