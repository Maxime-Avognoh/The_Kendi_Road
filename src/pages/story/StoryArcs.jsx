import React, { useState } from 'react'
import { BookOpen, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useApp } from '../../context/AppContext.jsx'

const STATUS_STYLES = {
  'Planifié': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'En cours': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Terminé': 'bg-green-500/20 text-green-400 border-green-500/30',
}

const EMPTY_FORM = {
  title: '', order: '', status: 'Planifié', summary: '',
  estimatedChapters: '', mainCharacters: '', stakes: '', themes: '',
  climax: '', resolution: '', mangakaNotes: ''
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="field-label">{label}</label>
      {children}
    </div>
  )
}

function ArcForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert("Le titre de l'arc est obligatoire.")
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Field label="Titre de l'arc *">
            <input className="input-field" placeholder="Ex: L'Arc de la Fracture" value={form.title} onChange={set('title')} required />
          </Field>
        </div>
        <Field label="Numéro / Ordre">
          <input className="input-field" type="number" placeholder="Ex: 1" value={form.order} onChange={set('order')} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Statut">
          <select className="input-field" value={form.status} onChange={set('status')}>
            <option>Planifié</option>
            <option>En cours</option>
            <option>Terminé</option>
          </select>
        </Field>
        <Field label="Chapitres estimés">
          <input className="input-field" placeholder="Ex: 12-15 chapitres" value={form.estimatedChapters} onChange={set('estimatedChapters')} />
        </Field>
      </div>
      <Field label="Résumé">
        <textarea className="textarea-field" rows={4} placeholder="De quoi parle cet arc en substance..." value={form.summary} onChange={set('summary')} />
      </Field>
      <Field label="Personnages principaux">
        <textarea className="textarea-field" rows={2} placeholder="Les personnages au coeur de cet arc..." value={form.mainCharacters} onChange={set('mainCharacters')} />
      </Field>
      <Field label="Enjeux & Stakes">
        <textarea className="textarea-field" rows={3} placeholder="Ce qui est en jeu — vie, mort, liberté, identité..." value={form.stakes} onChange={set('stakes')} />
      </Field>
      <Field label="Thèmes centraux">
        <textarea className="textarea-field" rows={2} placeholder="Ex: Trahison, sacrifice, amitié, rédemption, vengeance..." value={form.themes} onChange={set('themes')} />
      </Field>
      <Field label="Climax">
        <textarea className="textarea-field" rows={3} placeholder="Le point culminant, la confrontation finale de l'arc..." value={form.climax} onChange={set('climax')} />
      </Field>
      <Field label="Résolution">
        <textarea className="textarea-field" rows={3} placeholder="Comment l'arc se conclut, ce qui change après..." value={form.resolution} onChange={set('resolution')} />
      </Field>
      <Field label="Notes du mangaka">
        <textarea className="textarea-field" rows={3} placeholder="Idées, inspirations, notes de conception..." value={form.mangakaNotes} onChange={set('mangakaNotes')} />
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

export default function StoryArcs() {
  const { storyArcs, addStoryArc, updateStoryArc, deleteStoryArc } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const sorted = [...storyArcs].sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const filtered = sorted.filter(a =>
    !search || a.title?.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = (form) => {
    addStoryArc({ ...form, id: uuidv4() })
    setShowForm(false)
  }

  const handleUpdate = (form) => {
    updateStoryArc(editingId, form)
    setEditingId(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cet arc narratif ?')) deleteStoryArc(id)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white">Arcs Narratifs</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">{storyArcs.length} arc{storyArcs.length !== 1 ? 's' : ''}</p>
        </div>
        {!showForm && (
          <button onClick={() => { setShowForm(true); setEditingId(null) }} className="btn-primary">
            <Plus size={16} />
            Nouvel arc
          </button>
        )}
      </div>

      {showForm && (
        <div className="panel-section mb-6">
          <p className="section-title mb-4">
            <BookOpen size={14} />
            Nouvel arc narratif
          </p>
          <ArcForm
            initial={EMPTY_FORM}
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {storyArcs.length > 0 && (
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Rechercher un arc..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
      )}

      {storyArcs.length === 0 && !showForm ? (
        <div className="text-center py-20">
          <BookOpen size={40} className="text-gray-700 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Aucun arc narratif planifié</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Structure ton histoire en arcs narratifs. Chaque arc est un chapitre majeur de l'aventure.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={16} />
            Planifier mon premier arc
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((arc, idx) => (
            <div key={arc.id} className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden hover:border-red-500/20 transition-all">
              {editingId === arc.id ? (
                <div className="p-5">
                  <p className="section-title mb-4">
                    <Pencil size={14} />
                    Modifier l'arc
                  </p>
                  <ArcForm
                    initial={arc}
                    onSave={handleUpdate}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-sm flex-shrink-0">
                        {arc.order || (idx + 1)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white truncate">{arc.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {arc.status && (
                            <span className={`badge border ${STATUS_STYLES[arc.status] || STATUS_STYLES['Planifié']}`}>
                              {arc.status}
                            </span>
                          )}
                          {arc.estimatedChapters && (
                            <span className="badge bg-[#0a0a0f] text-gray-500 border border-[#1e1e2a]">
                              {arc.estimatedChapters}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setEditingId(arc.id)}
                        className="p-1.5 text-gray-500 hover:text-amber-400 transition-colors rounded"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(arc.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 transition-colors rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {arc.summary && (
                    <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">{arc.summary}</p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {arc.themes && arc.themes.split(',').map((t, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#0a0a0f] text-gray-500 border border-[#1e1e2a]">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
