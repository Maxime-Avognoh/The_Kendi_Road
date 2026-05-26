import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Send, ChevronRight, Loader2, AlertCircle, HelpCircle,
  ChevronDown, CheckCircle, BookOpen
} from 'lucide-react'
import { CATEGORIES, getCategoryById } from '../utils/categories.js'
import { submitForFeedback } from '../utils/apiClient.js'
import { useApp } from '../context/AppContext.jsx'
import { Link } from 'react-router-dom'

function CategoryCard({ cat, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(cat.id)}
      className={`
        w-full text-left p-4 rounded-xl border transition-all duration-200
        ${selected
          ? `${cat.bgClass} ${cat.borderClass} border-2`
          : 'bg-[#111118] border-[#1e1e2a] hover:border-[#2a2a38] hover:bg-[#14141c]'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl flex-shrink-0">{cat.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-sm font-bold ${selected ? cat.colorClass : 'text-white'}`}>{cat.label}</span>
            {selected && <CheckCircle size={16} className={cat.colorClass} />}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{cat.description}</p>
        </div>
      </div>
    </button>
  )
}

export default function Soumission() {
  const navigate = useNavigate()
  const location = useLocation()
  const { apiKey, addSubmission } = useApp()

  // Form state
  const [step, setStep] = useState(1) // 1: category, 2: details, 3: content
  const [category, setCategory] = useState(location.state?.category || '')
  const [subcategory, setSubcategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [context, setContext] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [showGuide, setShowGuide] = useState(false)

  // Submission state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cat = getCategoryById(category)
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category)
      setStep(2)
    }
  }, [location.state])

  const handleCategorySelect = (id) => {
    setCategory(id)
    setSubcategory('')
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() || content.trim().length < 50) {
      setError('Ton texte doit faire au moins 50 caractères.')
      return
    }
    if (!apiKey) {
      setError('Configure ta clé API dans les Paramètres avant de soumettre.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const feedback = await submitForFeedback({
        category, subcategory, title, content, context, additionalContext, apiKey,
      })
      const id = addSubmission({ category, subcategory, title, content, context, additionalContext }, feedback)
      navigate(`/feedback/${id}`)
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'analyse. Vérifie ta clé API et réessaie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 bg-red-500 rounded-full" />
          <h1 className="text-2xl font-black text-white tracking-tight">Soumettre un texte</h1>
        </div>
        <p className="text-gray-500 text-sm ml-3">
          Reçois un feedback éditorial complet avec notation /20 par critères
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { n: 1, label: 'Catégorie' },
          { n: 2, label: 'Détails' },
          { n: 3, label: 'Contenu' },
        ].map((s, i) => (
          <React.Fragment key={s.n}>
            <button
              onClick={() => s.n < step && setStep(s.n)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                ${step === s.n
                  ? 'bg-red-600 text-white'
                  : step > s.n
                    ? 'bg-green-500/10 text-green-400 border border-green-500/30 cursor-pointer hover:bg-green-500/20'
                    : 'bg-[#111118] text-gray-600 border border-[#1e1e2a] cursor-default'
                }`}
            >
              {step > s.n ? <CheckCircle size={12} /> : <span>{s.n}</span>}
              {s.label}
            </button>
            {i < 2 && <ChevronRight size={14} className="text-gray-700 flex-shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">Sélectionne la catégorie qui correspond le mieux à ce que tu souhaites soumettre :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CATEGORIES.map(c => (
              <CategoryCard key={c.id} cat={c} selected={category === c.id} onSelect={handleCategorySelect} />
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 bg-[#111118] border border-[#1e1e2a] rounded-lg">
            <HelpCircle size={14} className="text-gray-500 flex-shrink-0" />
            <p className="text-xs text-gray-500">
              Pas sûr de la catégorie ?{' '}
              <Link to="/guide" className="text-red-400 hover:underline">Consulte le guide</Link>{' '}
              pour voir les détails de chaque type.
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && cat && (
        <div className="space-y-5">
          {/* Category recap */}
          <div className={`${cat.bgClass} border ${cat.borderClass} rounded-xl p-4 flex items-center gap-3`}>
            <span className="text-2xl">{cat.emoji}</span>
            <div>
              <p className={`text-sm font-bold ${cat.colorClass}`}>{cat.label}</p>
              <p className="text-xs text-gray-500">{cat.description}</p>
            </div>
            <button onClick={() => setStep(1)} className="ml-auto text-xs text-gray-500 hover:text-white transition-colors">
              Changer
            </button>
          </div>

          {/* Guide toggle */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full flex items-center justify-between p-3 bg-[#111118] border border-[#1e1e2a] rounded-lg hover:bg-[#14141c] transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-gray-500" />
              <span className="text-xs text-gray-400 font-medium">Guide pour cette catégorie</span>
            </div>
            {showGuide ? <ChevronDown size={14} className="text-gray-600" /> : <ChevronRight size={14} className="text-gray-600" />}
          </button>

          {showGuide && (
            <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-2">Conseils clés</p>
                <ul className="space-y-1.5">
                  {cat.guide.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle size={11} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">Questions à te poser</p>
                <ul className="space-y-1.5">
                  {cat.guide.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <AlertCircle size={11} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Subcategory */}
          <div>
            <label className="field-label">Type de soumission <span className="text-gray-600">(optionnel)</span></label>
            <select
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
              className="input-field"
            >
              <option value="">— Sélectionner un type précis (optionnel) —</option>
              {cat.subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="field-label">Titre de l'œuvre ou de la soumission <span className="text-gray-600">(optionnel)</span></label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: L'Éveil du Dragon Noir — Chapitre 1"
              className="input-field"
            />
          </div>

          {/* Context */}
          <div>
            <label className="field-label">Contexte général <span className="text-gray-600">(optionnel mais recommandé)</span></label>
            <textarea
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder="Où en est-on dans l'histoire ? Quel est le contexte de cette soumission ? Qu'est-ce que tu essaies d'accomplir ?"
              rows={3}
              className="textarea-field"
            />
          </div>

          <button
            onClick={() => setStep(3)}
            className="btn-primary"
          >
            Continuer <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Step 3: Content */}
      {step === 3 && cat && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category + details recap */}
          <div className="flex flex-wrap gap-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 ${cat.bgClass} border ${cat.borderClass} rounded-full`}>
              <span>{cat.emoji}</span>
              <span className={`text-xs font-bold ${cat.colorClass}`}>{cat.label}</span>
            </div>
            {subcategory && (
              <span className="px-2.5 py-1 bg-[#111118] border border-[#1e1e2a] rounded-full text-xs text-gray-400">{subcategory}</span>
            )}
            {title && (
              <span className="px-2.5 py-1 bg-[#111118] border border-[#1e1e2a] rounded-full text-xs text-gray-400">"{title}"</span>
            )}
          </div>

          {/* Main content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="field-label mb-0">Ton texte *</label>
              <span className={`text-xs ${wordCount < 50 ? 'text-amber-500' : wordCount > 2000 ? 'text-blue-400' : 'text-gray-500'}`}>
                {wordCount} mots
              </span>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Colle ici ton scénario, chapitre, fiche personnage, world building, arc narratif... Sois aussi détaillé que possible pour obtenir le meilleur feedback."
              rows={16}
              className="textarea-field font-mono text-sm leading-relaxed"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Minimum 50 caractères. Plus ton texte est détaillé, plus le feedback sera précis.
            </p>
          </div>

          {/* Additional context */}
          <div>
            <label className="field-label">
              Questions spécifiques / Informations complémentaires{' '}
              <span className="text-gray-600">(optionnel)</span>
            </label>
            <textarea
              value={additionalContext}
              onChange={e => setAdditionalContext(e.target.value)}
              placeholder="Y a-t-il des aspects spécifiques sur lesquels tu veux un retour ? Des doutes particuliers ? Des contraintes à prendre en compte ?"
              rows={3}
              className="textarea-field"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* API key warning */}
          {!apiKey && (
            <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-400">
                Tu n'as pas encore configuré ta clé API Claude.{' '}
                <Link to="/parametres" className="underline font-medium">Configure-la ici</Link>{' '}
                pour pouvoir soumettre.
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-secondary"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={loading || !apiKey || !content.trim()}
              className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyse en cours... (peut prendre 30s)
                </>
              ) : (
                <>
                  <Send size={16} />
                  Envoyer pour analyse
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
