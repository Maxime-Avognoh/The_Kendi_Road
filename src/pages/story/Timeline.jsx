import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Clock, Plus, Pencil, Trash2, X, Save, Sword, Star, Skull, Eye, Users, AlertTriangle, Globe } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const EPOCHS = ["Avant l'histoire", "Début de l'histoire", 'Arc 1', 'Arc 2', 'Arc 3', 'Arc 4', 'Arc 5', 'Épilogue']
const EVENT_TYPES = ['Événement mondial', 'Événement personnel', 'Bataille', 'Révélation', 'Mort', 'Naissance', 'Rencontre', 'Trahison', 'Alliance', 'Destruction', 'Découverte', 'Autre']
const IMPORTANCE = ['Majeur', 'Mineur']

const TYPE_ICONS = {
  'Bataille': Sword,
  'Révélation': Eye,
  'Mort': Skull,
  'Naissance': Star,
  'Rencontre': Users,
  'Trahison': AlertTriangle,
  'Événement mondial': Globe,
}

const TYPE_COLORS = {
  'Événement mondial': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Événement personnel': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Bataille': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Révélation': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Mort': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Naissance': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Rencontre': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Trahison': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Alliance': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Destruction': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Découverte': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
}

const EPOCH_COLORS = {
  "Avant l'histoire": 'bg-gray-500/10 border-gray-500/30 text-gray-400',
  "Début de l'histoire": 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  'Arc 1': 'bg-green-500/10 border-green-500/30 text-green-400',
  'Arc 2': 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  'Arc 3': 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  'Arc 4': 'bg-red-500/10 border-red-500/30 text-red-400',
  'Arc 5': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  'Épilogue': 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
}

const EMPTY_EVENT = { title: '', order: '', epoch: "Avant l'histoire", type: '', description: '', characters: '', consequences: '', importance: 'Majeur' }

function Field({ label, children }) {
  return <div><label className="field-label">{label}</label>{children}</div>
}

function EventModal({ event, onSave, onClose }) {
  const [form, setForm] = useState(event || EMPTY_EVENT)
  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert("Le titre de l'événement est obligatoire.")
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-[#0d0d14] border border-[#1e1e2a] rounded-2xl w-full max-w-xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-[#1e1e2a]">
          <h2 className="text-lg font-bold text-white">{event ? "Modifier l'événement" : 'Nouvel événement'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-1"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2"><Field label="Titre *"><input className="input-field" value={form.title} onChange={set('title')} placeholder="Ex: La Chute de la Tour Noire" required /></Field></div>
            <Field label="Ordre"><input type="number" className="input-field" value={form.order} onChange={set('order')} placeholder="1" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Époque"><select className="input-field" value={form.epoch} onChange={set('epoch')}>{EPOCHS.map(e => <option key={e}>{e}</option>)}</select></Field>
            <Field label="Type d'événement"><select className="input-field" value={form.type} onChange={set('type')}><option value="">Choisir...</option>{EVENT_TYPES.map(t => <option key={t}>{t}</option>)}</select></Field>
          </div>
          <Field label="Importance"><div className="flex gap-3">{IMPORTANCE.map(imp => (<label key={imp} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-all ${form.importance === imp ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-[#1e1e2a] text-gray-500 hover:border-gray-500'}`}><input type="radio" name="importance" value={imp} checked={form.importance === imp} onChange={set('importance')} className="hidden" />{imp}</label>))}</div></Field>
          <Field label="Description"><textarea className="textarea-field" rows={3} value={form.description} onChange={set('description')} placeholder="Qu'est-ce qui s'est passé exactement ?" /></Field>
          <Field label="Personnages impliqués"><input className="input-field" value={form.characters} onChange={set('characters')} placeholder="Qui était présent, impliqué dans cet événement ?" /></Field>
          <Field label="Conséquences"><textarea className="textarea-field" rows={2} value={form.consequences} onChange={set('consequences')} placeholder="Qu'est-ce que cet événement a changé dans le monde / pour les personnages ?" /></Field>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 justify-center"><Save size={14} />{event ? 'Enregistrer' : "Ajouter l'événement"}</button>
            <button type="button" onClick={onClose} className="btn-secondary">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Timeline() {
  const { timelineEvents, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent } = useApp()
  const [modal, setModal] = useState(null)
  const [filterEpoch, setFilterEpoch] = useState('')

  const sorted = [...timelineEvents]
    .filter(e => !filterEpoch || e.epoch === filterEpoch)
    .sort((a, b) => {
      const epochOrder = EPOCHS.indexOf(a.epoch) - EPOCHS.indexOf(b.epoch)
      if (epochOrder !== 0) return epochOrder
      return (Number(a.order) || 999) - (Number(b.order) || 999)
    })

  const handleSave = (form) => {
    if (modal === 'create') addTimelineEvent({ ...form, id: uuidv4() })
    else updateTimelineEvent(modal.id, form)
    setModal(null)
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) deleteTimelineEvent(id)
  }

  // Group by epoch
  const grouped = {}
  sorted.forEach(event => {
    if (!grouped[event.epoch]) grouped[event.epoch] = []
    grouped[event.epoch].push(event)
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {modal && <EventModal event={modal === 'create' ? null : modal} onSave={handleSave} onClose={() => setModal(null)} />}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white">Timeline</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">{timelineEvents.length} événement{timelineEvents.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal('create')} className="btn-primary"><Plus size={16} />Nouvel événement</button>
      </div>

      {timelineEvents.length > 0 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          <button onClick={() => setFilterEpoch('')} className={`badge px-3 py-1 border text-xs ${!filterEpoch ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-[#1e1e2a] text-gray-500'}`}>
            Toutes les époques
          </button>
          {EPOCHS.filter(ep => timelineEvents.some(e => e.epoch === ep)).map(ep => (
            <button key={ep} onClick={() => setFilterEpoch(ep)} className={`badge px-3 py-1 border text-xs ${filterEpoch === ep ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-[#1e1e2a] text-gray-500 hover:border-gray-500'}`}>
              {ep}
            </button>
          ))}
        </div>
      )}

      {timelineEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-[#111118] border border-[#1e1e2a] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock size={36} className="text-gray-700" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Timeline vide</h2>
          <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">Retrace la chronologie de ton univers : passé lointain, événements fondateurs, et moments clés de ton histoire.</p>
          <button onClick={() => setModal('create')} className="btn-primary"><Plus size={16} />Ajouter le premier événement</button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([epoch, events]) => {
            const epochClass = EPOCH_COLORS[epoch] || 'bg-gray-500/10 border-gray-500/30 text-gray-400'
            return (
              <div key={epoch}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 ${epochClass}`}>
                  <Clock size={11} />{epoch}
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1e1e2a]" />
                  <div className="space-y-4">
                    {events.map((event, idx) => {
                      const TypeIcon = TYPE_ICONS[event.type] || Clock
                      const typeClass = TYPE_COLORS[event.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      const isMajor = event.importance === 'Majeur'
                      return (
                        <div key={event.id} className="relative group">
                          <div className={`absolute -left-7 top-4 w-3 h-3 rounded-full border-2 flex-shrink-0 ${isMajor ? 'bg-red-500 border-red-400' : 'bg-[#1e1e2a] border-gray-600'}`} />
                          <div className={`panel-section card-hover ${isMajor ? '' : 'opacity-80'}`}>
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-bold ${isMajor ? 'text-white text-base' : 'text-gray-300 text-sm'}`}>{event.title}</h3>
                                {event.type && <span className={`badge border text-[10px] ${typeClass}`}><TypeIcon size={10} className="mr-0.5" />{event.type}</span>}
                                {!isMajor && <span className="badge bg-gray-500/10 text-gray-600 border border-gray-600/20 text-[10px]">Mineur</span>}
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <button onClick={() => setModal(event)} className="p-1 rounded bg-[#0a0a0f] text-gray-400 hover:text-amber-400 transition-colors"><Pencil size={12} /></button>
                                <button onClick={() => handleDelete(event.id, event.title)} className="p-1 rounded bg-[#0a0a0f] text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                              </div>
                            </div>
                            {event.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{event.description}</p>}
                            <div className="flex flex-wrap gap-4 mt-2">
                              {event.characters && <div><span className="field-label">Personnages</span><p className="text-xs text-gray-400">{event.characters}</p></div>}
                              {event.consequences && <div className="flex-1"><span className="field-label">Conséquences</span><p className="text-xs text-gray-400">{event.consequences}</p></div>}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
