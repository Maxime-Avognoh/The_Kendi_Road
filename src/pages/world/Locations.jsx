import React, { useState } from 'react'
import { MapPin, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useApp } from '../../context/AppContext.jsx'

const TYPE_STYLES = {
  'Ville': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Village': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Forêt': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Montagne': 'bg-stone-500/20 text-stone-400 border-stone-500/30',
  'Mer': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Désert': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Donjon': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Pays': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Territoire': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Sanctuaire': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Autre': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const EMPTY_FORM = {
  name: '', type: '', description: '', narrativeImportance: '',
  population: '', atmosphere: '', locationHistory: '', associatedCharacters: '', notes: ''
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="field-label">{label}</label>
      {children}
    </div>
  )
}

function LocationForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Le nom du lieu est obligatoire.')
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nom *">
          <input className="input-field" placeholder="Nom du lieu" value={form.name} onChange={set('name')} required />
        </Field>
        <Field label="Type">
          <select className="input-field" value={form.type} onChange={set('type')}>
            <option value="">— Choisir —</option>
            {Object.keys(TYPE_STYLES).map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Description générale">
        <textarea className="textarea-field" rows={3} placeholder="Décris ce lieu..." value={form.description} onChange={set('description')} />
      </Field>
      <Field label="Importance narrative">
        <textarea className="textarea-field" rows={2} placeholder="Pourquoi ce lieu est-il important pour l'histoire ?" value={form.narrativeImportance} onChange={set('narrativeImportance')} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Habitants / Population">
          <textarea className="textarea-field" rows={2} placeholder="Qui y vit ?" value={form.population} onChange={set('population')} />
        </Field>
        <Field label="Particularités / Ambiance">
          <textarea className="textarea-field" rows={2} placeholder="L'atmosphère, les sons, les odeurs..." value={form.atmosphere} onChange={set('atmosphere')} />
        </Field>
      </div>
      <Field label="Histoire du lieu">
        <textarea className="textarea-field" rows={3} placeholder="Son passé, son origine..." value={form.locationHistory} onChange={set('locationHistory')} />
      </Field>
      <Field label="Personnages associés">
        <textarea className="textarea-field" rows={2} placeholder="Les personnages liés à ce lieu..." value={form.associatedCharacters} onChange={set('associatedCharacters')} />
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

export default function Locations() {
  const { locations, addLocation, updateLocation, deleteLocation } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = locations.filter(l =>
    !search || l.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = (form) => {
    addLocation({ ...form, id: uuidv4() })
    setShowForm(false)
  }

  const handleUpdate = (form) => {
    updateLocation(editingId, form)
    setEditingId(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce lieu ?')) deleteLocation(id)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white">Lieux</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">{locations.length} lieu{locations.length !== 1 ? 'x' : ''}</p>
        </div>
        {!showForm && (
          <button onClick={() => { setShowForm(true); setEditingId(null) }} className="btn-primary">
            <Plus size={16} />
            Ajouter un lieu
          </button>
        )}
      </div>

      {showForm && (
        <div className="panel-section mb-6">
          <p className="section-title mb-4">
            <MapPin size={14} />
            Nouveau lieu
          </p>
          <LocationForm
            initial={EMPTY_FORM}
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {locations.length > 0 && (
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Rechercher un lieu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
      )}

      {locations.length === 0 && !showForm ? (
        <div className="text-center py-20">
          <MapPin size={40} className="text-gray-700 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Aucun lieu créé</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Les villes, donjons, sanctuaires et terres lointaines de ton univers t'attendent.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={16} />
            Créer mon premier lieu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(location => (
            <div key={location.id} className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden hover:border-red-500/20 transition-all">
              {editingId === location.id ? (
                <div className="p-5">
                  <p className="section-title mb-4">
                    <Pencil size={14} />
                    Modifier le lieu
                  </p>
                  <LocationForm
                    initial={location}
                    onSave={handleUpdate}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white truncate">{location.name}</h3>
                        {location.type && (
                          <span className={`badge border mt-1 ${TYPE_STYLES[location.type] || TYPE_STYLES['Autre']}`}>
                            {location.type}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setEditingId(location.id)}
                        className="p-1.5 text-gray-500 hover:text-amber-400 transition-colors rounded"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 transition-colors rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {location.description && (
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{location.description}</p>
                  )}
                  {location.narrativeImportance && (
                    <p className="text-xs text-gray-600 mt-2 italic line-clamp-1">Importance: {location.narrativeImportance}</p>
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
