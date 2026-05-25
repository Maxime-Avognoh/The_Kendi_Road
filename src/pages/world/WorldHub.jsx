import React, { useState } from 'react'
import { Globe, Map, BookOpen, Zap, Users2, Save, Pencil, Eye } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const TABS = [
  { key: 'world', label: 'Le Monde', icon: Globe },
  { key: 'geography', label: 'Géographie', icon: Map },
  { key: 'history', label: 'Histoire', icon: BookOpen },
  { key: 'powers', label: 'Système de Pouvoirs', icon: Zap },
  { key: 'society', label: 'Société', icon: Users2 },
]

function Field({ label, children }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  )
}

function ViewField({ label, value }) {
  if (!value) return null
  return (
    <div>
      <span className="field-label">{label}</span>
      <p className="field-value whitespace-pre-wrap">{value}</p>
    </div>
  )
}

export default function WorldHub() {
  const { worldData, updateWorldData } = useApp()
  const [activeTab, setActiveTab] = useState('world')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({})

  const startEdit = () => {
    setDraft({ ...worldData })
    setEditing(true)
  }

  const cancelEdit = () => {
    setDraft({})
    setEditing(false)
  }

  const saveEdit = () => {
    updateWorldData(draft)
    setEditing(false)
    setDraft({})
  }

  const set = (field) => (e) => setDraft(prev => ({ ...prev, [field]: e.target.value }))
  const data = editing ? draft : worldData

  const isEmpty = !worldData.worldName && !worldData.description

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white">World Building</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">Construis l'univers de ton manga</p>
        </div>
        {!editing ? (
          <button onClick={startEdit} className="btn-secondary">
            <Pencil size={14} />{isEmpty ? 'Commencer' : 'Modifier'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={saveEdit} className="btn-primary"><Save size={14} />Sauvegarder</button>
            <button onClick={cancelEdit} className="btn-secondary">Annuler</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                : 'text-gray-500 hover:text-white hover:bg-[#1e1e2a]'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {isEmpty && !editing ? (
        <div className="panel-section text-center py-16">
          <Globe size={40} className="text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Ton monde n'a pas encore de nom</h2>
          <p className="text-gray-500 text-sm mb-6">Commence à construire l'univers de ton manga.</p>
          <button onClick={startEdit} className="btn-primary mx-auto">
            <Pencil size={14} />Commencer le world building
          </button>
        </div>
      ) : (
        <div className="panel-section space-y-5">
          {activeTab === 'world' && (editing ? (
            <>
              <Field label="Nom du monde / Univers"><input className="input-field" value={data.worldName || ''} onChange={set('worldName')} placeholder="Ex: Terres d'Ashura, Le Royaume des Cinq Nations..." /></Field>
              <Field label="Description générale"><textarea className="textarea-field" rows={4} value={data.description || ''} onChange={set('description')} placeholder="En quelques phrases, décris l'essence de ton monde..." /></Field>
              <Field label="Époque & Ère"><input className="input-field" value={data.era || ''} onChange={set('era')} placeholder="Ex: Ère des Anciens, 3ème Âge, ère industrielle avec magie..." /></Field>
              <Field label="Ambiance générale"><textarea className="textarea-field" rows={3} value={data.atmosphere || ''} onChange={set('atmosphere')} placeholder="Ex: monde post-apocalyptique, empire médiéval corrompu, terre sauvage à explorer..." /></Field>
            </>
          ) : (
            <>
              {worldData.worldName && <h2 className="text-2xl font-black text-amber-400">{worldData.worldName}</h2>}
              <ViewField label="Description" value={worldData.description} />
              <ViewField label="Époque & Ère" value={worldData.era} />
              <ViewField label="Ambiance" value={worldData.atmosphere} />
            </>
          ))}

          {activeTab === 'geography' && (editing ? (
            <>
              <Field label="Description géographique"><textarea className="textarea-field" rows={4} value={data.geography || ''} onChange={set('geography')} placeholder="Continents, océans, grandes régions, terrain général..." /></Field>
              <Field label="Régions & Territoires importants"><textarea className="textarea-field" rows={4} value={data.regions || ''} onChange={set('regions')} placeholder="Les grandes zones, leurs noms et caractéristiques..." /></Field>
              <Field label="Climat dominant"><textarea className="textarea-field" rows={2} value={data.climate || ''} onChange={set('climate')} placeholder="Types de climat, saisons particulières, phénomènes météo spéciaux..." /></Field>
              <Field label="Ressources importantes"><textarea className="textarea-field" rows={2} value={data.resources || ''} onChange={set('resources')} placeholder="Minéraux rares, plantes magiques, ressources qui créent des conflits..." /></Field>
            </>
          ) : (
            <>
              <ViewField label="Description géographique" value={worldData.geography} />
              <ViewField label="Régions & Territoires" value={worldData.regions} />
              <ViewField label="Climat dominant" value={worldData.climate} />
              <ViewField label="Ressources importantes" value={worldData.resources} />
            </>
          ))}

          {activeTab === 'history' && (editing ? (
            <>
              <Field label="Origines du monde"><textarea className="textarea-field" rows={4} value={data.worldOrigins || ''} onChange={set('worldOrigins')} placeholder="Comment ce monde a-t-il été créé ? Les mythes fondateurs, les dieux, les origines..." /></Field>
              <Field label="Grandes guerres & Conflits passés"><textarea className="textarea-field" rows={4} value={data.greatWars || ''} onChange={set('greatWars')} placeholder="Les guerres qui ont façonné le monde actuel..." /></Field>
              <Field label="Événements fondateurs"><textarea className="textarea-field" rows={3} value={data.foundingEvents || ''} onChange={set('foundingEvents')} placeholder="Les moments qui ont tout changé dans l'histoire de ce monde..." /></Field>
              <Field label="État actuel du monde"><textarea className="textarea-field" rows={3} value={data.currentState || ''} onChange={set('currentState')} placeholder="Où en est le monde au début de ton histoire ? Tensions en cours..." /></Field>
            </>
          ) : (
            <>
              <ViewField label="Origines du monde" value={worldData.worldOrigins} />
              <ViewField label="Grandes guerres & Conflits" value={worldData.greatWars} />
              <ViewField label="Événements fondateurs" value={worldData.foundingEvents} />
              <ViewField label="État actuel" value={worldData.currentState} />
            </>
          ))}

          {activeTab === 'powers' && (editing ? (
            <>
              <Field label="Nom du système de pouvoirs"><input className="input-field" value={data.powerSystemName || ''} onChange={set('powerSystemName')} placeholder="Ex: Aura, Ki, Magie des Âmes, Haki, Chakra..." /></Field>
              <Field label="Origines du pouvoir"><textarea className="textarea-field" rows={3} value={data.powerOrigins || ''} onChange={set('powerOrigins')} placeholder="D'où vient ce pouvoir ? Don des dieux, mutation, entraînement, héritage..." /></Field>
              <Field label="Types de pouvoirs existants"><textarea className="textarea-field" rows={4} value={data.powerTypes || ''} onChange={set('powerTypes')} placeholder="Liste les différents types, catégories, éléments, styles..." /></Field>
              <Field label="Comment acquérir le pouvoir"><textarea className="textarea-field" rows={2} value={data.powerAcquisition || ''} onChange={set('powerAcquisition')} placeholder="Naissance, entraînement, catalyseur, rituel, pacte..." /></Field>
              <Field label="Règles & Limitations"><textarea className="textarea-field" rows={3} value={data.powerLimits || ''} onChange={set('powerLimits')} placeholder="Ce qu'un pouvoir ne peut PAS faire. Les coûts, les risques, les contre-mesures..." /></Field>
              <Field label="Rareté & Hiérarchie"><textarea className="textarea-field" rows={2} value={data.powerRarity || ''} onChange={set('powerRarity')} placeholder="Qui a le pouvoir ? Rang des puissants, organisations de contrôle..." /></Field>
            </>
          ) : (
            <>
              {worldData.powerSystemName && <h3 className="text-xl font-bold text-amber-400">{worldData.powerSystemName}</h3>}
              <ViewField label="Origines" value={worldData.powerOrigins} />
              <ViewField label="Types de pouvoirs" value={worldData.powerTypes} />
              <ViewField label="Comment acquérir le pouvoir" value={worldData.powerAcquisition} />
              <ViewField label="Règles & Limitations" value={worldData.powerLimits} />
              <ViewField label="Rareté & Hiérarchie" value={worldData.powerRarity} />
            </>
          ))}

          {activeTab === 'society' && (editing ? (
            <>
              <Field label="Structure sociale"><textarea className="textarea-field" rows={3} value={data.socialStructure || ''} onChange={set('socialStructure')} placeholder="Classes sociales, castes, systèmes de gouvernement, hiérarchies..." /></Field>
              <Field label="Religions & Croyances"><textarea className="textarea-field" rows={3} value={data.religions || ''} onChange={set('religions')} placeholder="Dieux vénérés, religions dominantes, sectes, cultes..." /></Field>
              <Field label="Niveau technologique"><textarea className="textarea-field" rows={2} value={data.technology || ''} onChange={set('technology')} placeholder="Médiéval, industriel, futuriste, magie-tech, quel niveau..." /></Field>
              <Field label="Langues parlées"><input className="input-field" value={data.languages || ''} onChange={set('languages')} placeholder="Langues communes, langues anciennes, dialectes régionaux..." /></Field>
              <Field label="Économie & Monnaie"><textarea className="textarea-field" rows={2} value={data.economy || ''} onChange={set('economy')} placeholder="Commerce, monnaie, ressources rares qui ont de la valeur..." /></Field>
            </>
          ) : (
            <>
              <ViewField label="Structure sociale" value={worldData.socialStructure} />
              <ViewField label="Religions & Croyances" value={worldData.religions} />
              <ViewField label="Niveau technologique" value={worldData.technology} />
              <ViewField label="Langues parlées" value={worldData.languages} />
              <ViewField label="Économie & Monnaie" value={worldData.economy} />
            </>
          ))}
        </div>
      )}
    </div>
  )
}
