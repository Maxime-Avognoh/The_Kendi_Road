import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ArrowLeft, Save, ChevronDown, ChevronUp, User, Eye, Brain, Clock, Zap, BookOpen, Heart, StickyNote } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const EMPTY_CHARACTER = {
  name: '', nickname: '', age: '', gender: '', role: '', status: 'Vivant', themeColor: '#e11d48',
  height: '', build: '', hairColor: '', eyeColor: '', distinctiveFeatures: '', clothingStyle: '',
  personality: '', qualities: '', flaws: '', fears: '', motivations: '', values: '', quote: '',
  pastHistory: '', keyEvents: '', traumas: '', secrets: '', family: '',
  combatSkills: '', specialPowers: '', uniqueSkills: '', weaknesses: '', powerLevel: '',
  objectives: '', internalConflicts: '', narrativeEvolution: '', turningPoint: '',
  relationshipNotes: '', notes: '',
}

const SECTIONS = [
  { key: 'identity', label: 'Identité', icon: User, color: 'text-blue-400' },
  { key: 'appearance', label: 'Apparence physique', icon: Eye, color: 'text-purple-400' },
  { key: 'personality', label: 'Personnalité', icon: Brain, color: 'text-pink-400' },
  { key: 'history', label: 'Histoire', icon: Clock, color: 'text-amber-400' },
  { key: 'powers', label: 'Compétences & Pouvoirs', icon: Zap, color: 'text-yellow-400' },
  { key: 'arc', label: 'Arc Narratif', icon: BookOpen, color: 'text-green-400' },
  { key: 'relations', label: 'Relations', icon: Heart, color: 'text-red-400' },
  { key: 'notes', label: 'Notes libres', icon: StickyNote, color: 'text-gray-400' },
]

function Section({ sectionKey, label, icon: Icon, color, children, hasData }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="panel-section">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between mb-0">
        <div className="flex items-center gap-2">
          <Icon size={14} className={color} />
          <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>{label}</span>
          {hasData && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
        </div>
        {open ? <ChevronUp size={14} className="text-gray-600" /> : <ChevronDown size={14} className="text-gray-600" />}
      </button>
      {open && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  )
}

export default function CharacterForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { characters, addCharacter, updateCharacter } = useApp()
  const [form, setForm] = useState(EMPTY_CHARACTER)
  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      const char = characters.find(c => c.id === id)
      if (char) setForm({ ...EMPTY_CHARACTER, ...char })
      else navigate('/personnages')
    }
  }, [id, characters, isEdit, navigate])

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Le nom du personnage est obligatoire.')
    if (isEdit) {
      updateCharacter(id, form)
      navigate(`/personnages/${id}`)
    } else {
      const newId = uuidv4()
      addCharacter({ ...form, id: newId })
      navigate(`/personnages/${newId}`)
    }
  }

  const hasIdentityData = !!(form.nickname || form.age || form.gender)
  const hasAppearanceData = !!(form.height || form.hairColor || form.eyeColor || form.distinctiveFeatures)
  const hasPersonalityData = !!(form.personality || form.qualities || form.flaws || form.fears || form.motivations)
  const hasHistoryData = !!(form.pastHistory || form.keyEvents || form.traumas || form.secrets)
  const hasPowersData = !!(form.combatSkills || form.specialPowers || form.weaknesses)
  const hasArcData = !!(form.objectives || form.internalConflicts || form.narrativeEvolution)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="btn-ghost">
          <ArrowLeft size={16} />Retour
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white">{isEdit ? 'Modifier le personnage' : 'Nouveau personnage'}</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* IDENTITÉ */}
        <Section sectionKey="identity" label="Identité" icon={User} color="text-blue-400" hasData={hasIdentityData}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Nom complet *">
                <input className="input-field" value={form.name} onChange={set('name')} placeholder="Ex: Kendi Ashura" required />
              </Field>
            </div>
            <Field label="Surnom / Titre">
              <input className="input-field" value={form.nickname} onChange={set('nickname')} placeholder="Ex: Le Fantôme Rouge" />
            </Field>
            <Field label="Âge">
              <input className="input-field" value={form.age} onChange={set('age')} placeholder="Ex: 17 ans" />
            </Field>
            <Field label="Genre">
              <select className="input-field" value={form.gender} onChange={set('gender')}>
                <option value="">Choisir...</option>
                <option>Masculin</option><option>Féminin</option>
                <option>Non-binaire</option><option>Autre</option>
              </select>
            </Field>
            <Field label="Rôle dans l'histoire">
              <select className="input-field" value={form.role} onChange={set('role')}>
                <option value="">Choisir...</option>
                <option>Protagoniste</option><option>Antagoniste</option>
                <option>Allié</option><option>Rival</option>
                <option>Mentor</option><option>Neutre</option>
              </select>
            </Field>
            <Field label="Statut">
              <select className="input-field" value={form.status} onChange={set('status')}>
                <option>Vivant</option><option>Décédé</option>
                <option>Disparu</option><option>Inconnu</option>
              </select>
            </Field>
            <Field label="Couleur de thème">
              <div className="flex items-center gap-3">
                <input type="color" value={form.themeColor} onChange={set('themeColor')}
                  className="w-10 h-10 rounded-lg border border-[#1e1e2a] bg-transparent cursor-pointer" />
                <div className="w-10 h-10 rounded-full border-2 border-[#1e1e2a] flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: form.themeColor }}>
                  {form.name ? form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) : 'AB'}
                </div>
                <span className="text-xs text-gray-500">Couleur de l'avatar</span>
              </div>
            </Field>
            <div className="col-span-2">
              <Field label="Citation personnelle">
                <input className="input-field" value={form.quote} onChange={set('quote')} placeholder="Une phrase qui définit ce personnage..." />
              </Field>
            </div>
          </div>
        </Section>

        {/* APPARENCE */}
        <Section sectionKey="appearance" label="Apparence physique" icon={Eye} color="text-purple-400" hasData={hasAppearanceData}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Taille & Corpulence">
              <input className="input-field" value={form.height} onChange={set('height')} placeholder="Ex: 1m78, athlétique" />
            </Field>
            <Field label="Couleur des cheveux">
              <input className="input-field" value={form.hairColor} onChange={set('hairColor')} placeholder="Ex: Noir, mi-longs" />
            </Field>
            <Field label="Couleur des yeux">
              <input className="input-field" value={form.eyeColor} onChange={set('eyeColor')} placeholder="Ex: Rouge sang" />
            </Field>
            <div className="col-span-2">
              <Field label="Traits distinctifs">
                <textarea className="textarea-field" rows={3} value={form.distinctiveFeatures} onChange={set('distinctiveFeatures')} placeholder="Cicatrices, tatouages, marques, particularités physiques..." />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Style vestimentaire">
                <textarea className="textarea-field" rows={2} value={form.clothingStyle} onChange={set('clothingStyle')} placeholder="Comment il s'habille en général, armure, tenue signature..." />
              </Field>
            </div>
          </div>
        </Section>

        {/* PERSONNALITÉ */}
        <Section sectionKey="personality" label="Personnalité" icon={Brain} color="text-pink-400" hasData={hasPersonalityData}>
          <Field label="Traits de personnalité généraux">
            <textarea className="textarea-field" rows={3} value={form.personality} onChange={set('personality')} placeholder="Décris la personnalité globale : introverti, impulsif, loyal, calculateur..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Qualités">
              <textarea className="textarea-field" rows={3} value={form.qualities} onChange={set('qualities')} placeholder="Courageux, empathique, déterminé..." />
            </Field>
            <Field label="Défauts">
              <textarea className="textarea-field" rows={3} value={form.flaws} onChange={set('flaws')} placeholder="Impulsif, arrogant, rancunier..." />
            </Field>
            <Field label="Peurs profondes">
              <textarea className="textarea-field" rows={3} value={form.fears} onChange={set('fears')} placeholder="Perdre ses proches, l'échec, sa propre nature..." />
            </Field>
            <Field label="Motivations">
              <textarea className="textarea-field" rows={3} value={form.motivations} onChange={set('motivations')} placeholder="Vengeance, protection, quête de vérité, liberté..." />
            </Field>
          </div>
          <Field label="Valeurs & Principes">
            <textarea className="textarea-field" rows={2} value={form.values} onChange={set('values')} placeholder="Ce en quoi il croit profondément, ses lignes rouges..." />
          </Field>
        </Section>

        {/* HISTOIRE */}
        <Section sectionKey="history" label="Histoire" icon={Clock} color="text-amber-400" hasData={hasHistoryData}>
          <Field label="Passé & Origines">
            <textarea className="textarea-field" rows={4} value={form.pastHistory} onChange={set('pastHistory')} placeholder="D'où vient ce personnage ? Son enfance, ses origines, sa famille..." />
          </Field>
          <Field label="Événements clés de sa vie">
            <textarea className="textarea-field" rows={3} value={form.keyEvents} onChange={set('keyEvents')} placeholder="Les moments qui ont forgé qui il est aujourd'hui..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Traumatismes">
              <textarea className="textarea-field" rows={3} value={form.traumas} onChange={set('traumas')} placeholder="Blessures psychologiques, pertes, trahisons..." />
            </Field>
            <Field label="Secrets">
              <textarea className="textarea-field" rows={3} value={form.secrets} onChange={set('secrets')} placeholder="Ce qu'il cache aux autres et parfois à lui-même..." />
            </Field>
          </div>
          <Field label="Famille & Proches">
            <textarea className="textarea-field" rows={2} value={form.family} onChange={set('family')} placeholder="Parents, frères/sœurs, maître, clan d'origine..." />
          </Field>
        </Section>

        {/* POUVOIRS */}
        <Section sectionKey="powers" label="Compétences & Pouvoirs" icon={Zap} color="text-yellow-400" hasData={hasPowersData}>
          <Field label="Capacités de combat">
            <textarea className="textarea-field" rows={3} value={form.combatSkills} onChange={set('combatSkills')} placeholder="Style de combat, maîtrise d'armes, arts martiaux..." />
          </Field>
          <Field label="Pouvoirs spéciaux & Techniques">
            <textarea className="textarea-field" rows={4} value={form.specialPowers} onChange={set('specialPowers')} placeholder="Techniques signatures, pouvoirs innés ou acquis, noms des techniques..." />
          </Field>
          <Field label="Compétences uniques (non-combat)">
            <textarea className="textarea-field" rows={2} value={form.uniqueSkills} onChange={set('uniqueSkills')} placeholder="Médecine, stratégie, infiltration, forge, magie de soin..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Faiblesses & Limites">
              <textarea className="textarea-field" rows={3} value={form.weaknesses} onChange={set('weaknesses')} placeholder="Ce qui peut l'arrêter, ses limites de puissance..." />
            </Field>
            <Field label="Niveau de puissance">
              <select className="input-field" value={form.powerLevel} onChange={set('powerLevel')}>
                <option value="">Non défini</option>
                <option>Ordinaire</option><option>Élite</option>
                <option>Exceptionnel</option><option>Légendaire</option>
                <option>Au-delà des limites</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* ARC NARRATIF */}
        <Section sectionKey="arc" label="Arc Narratif" icon={BookOpen} color="text-green-400" hasData={hasArcData}>
          <Field label="Objectifs principaux">
            <textarea className="textarea-field" rows={3} value={form.objectives} onChange={set('objectives')} placeholder="Ce que ce personnage cherche à accomplir dans l'histoire..." />
          </Field>
          <Field label="Conflits internes">
            <textarea className="textarea-field" rows={3} value={form.internalConflicts} onChange={set('internalConflicts')} placeholder="Ses dilemmes moraux, ses contradictions internes, ses doutes..." />
          </Field>
          <Field label="Évolution prévue">
            <textarea className="textarea-field" rows={3} value={form.narrativeEvolution} onChange={set('narrativeEvolution')} placeholder="Comment ce personnage va changer au fil de l'histoire..." />
          </Field>
          <Field label="Moment de rupture (Turning point)">
            <textarea className="textarea-field" rows={2} value={form.turningPoint} onChange={set('turningPoint')} placeholder="Le moment clé qui changera tout pour ce personnage..." />
          </Field>
        </Section>

        {/* RELATIONS */}
        <Section sectionKey="relations" label="Relations" icon={Heart} color="text-red-400" hasData={!!form.relationshipNotes}>
          <Field label="Notes sur les relations avec les autres personnages">
            <textarea className="textarea-field" rows={5} value={form.relationshipNotes} onChange={set('relationshipNotes')} placeholder="Décris ses relations : alliances, rivalités, liens familiaux, amours, trahisons..." />
          </Field>
        </Section>

        {/* NOTES */}
        <Section sectionKey="notes" label="Notes libres" icon={StickyNote} color="text-gray-400" hasData={!!form.notes}>
          <Field label="Notes du mangaka">
            <textarea className="textarea-field" rows={4} value={form.notes} onChange={set('notes')} placeholder="Inspirations, idées futures, références visuelles, notes de conception..." />
          </Field>
        </Section>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary flex-1 justify-center">
            <Save size={16} />{isEdit ? 'Enregistrer les modifications' : 'Créer le personnage'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
