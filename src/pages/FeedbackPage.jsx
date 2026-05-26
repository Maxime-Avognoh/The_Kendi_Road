import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Share2, CheckCircle, AlertCircle, Target, Zap,
  BookOpen, Star, ChevronDown, ChevronUp, Flame, Trophy, Clock
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getCategoryById, getScoreLabel } from '../utils/categories.js'
import ScoreRing from '../components/ScoreRing.jsx'
import CriteriaCard from '../components/CriteriaCard.jsx'

const PRIORITY_CONFIG = {
  haute: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', label: 'PRIORITÉ HAUTE' },
  moyenne: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', label: 'PRIORITÉ MOYENNE' },
  basse: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', label: 'PRIORITÉ BASSE' },
}

function Section({ title, icon: Icon, iconColor = 'text-red-500', children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-red-500 rounded-full" />
        <p className="text-xs font-bold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
          <Icon size={12} />
          {title}
        </p>
      </div>
      {children}
    </div>
  )
}

export default function FeedbackPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { submissions, deleteSubmission } = useApp()
  const [showContent, setShowContent] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const submission = submissions.find(s => s.id === id)
  if (!submission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle size={40} className="text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Soumission introuvable</h2>
        <p className="text-gray-500 text-sm mb-4">Ce feedback n'existe plus dans l'historique.</p>
        <Link to="/historique" className="btn-primary">Voir l'historique</Link>
      </div>
    )
  }

  const { feedback, category, subcategory, title, content, createdAt } = submission
  const cat = getCategoryById(category)
  const { label: scoreLabel, color: scoreColor } = getScoreLabel(feedback.global_score)

  const handleDelete = () => {
    deleteSubmission(id)
    navigate('/historique')
  }

  const date = new Date(createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      {/* Back */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          Retour
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <Clock size={12} />
            {date}
          </span>
          {confirmDelete ? (
            <>
              <span className="text-xs text-gray-500">Supprimer ?</span>
              <button onClick={handleDelete} className="text-xs text-red-400 hover:text-red-300 font-bold">Oui</button>
              <button onClick={() => setConfirmDelete(false)} className="text-xs text-gray-500 hover:text-gray-300">Non</button>
            </>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="text-xs text-gray-600 hover:text-red-400 transition-colors">
              Supprimer
            </button>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#111118] to-[#0d0d14] border border-[#1e1e2a] rounded-2xl p-6 md:p-8">
        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {cat && (
            <span className={`flex items-center gap-1.5 px-3 py-1 ${cat.bgClass} border ${cat.borderClass} rounded-full text-xs font-bold ${cat.colorClass}`}>
              {cat.emoji} {cat.label}
            </span>
          )}
          {subcategory && (
            <span className="px-2.5 py-1 bg-[#0a0a0f] border border-[#1e1e2a] rounded-full text-xs text-gray-400">{subcategory}</span>
          )}
        </div>

        {title && (
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">"{title}"</h1>
        )}

        {/* Introduction from Maestro */}
        <div className="mt-4 p-4 bg-red-950/20 border border-red-900/30 rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2">Premier ressenti de MAESTRO</p>
          <p className="text-sm text-gray-300 leading-relaxed italic">"{feedback.introduction}"</p>
        </div>

        {/* Global score */}
        <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center">
            <ScoreRing score={feedback.global_score} size="lg" />
            <p className="text-xs text-gray-500 mt-2 text-center">Score Global</p>
          </div>
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-black mb-3 ${getScoreLabel(feedback.global_score).bg} ${getScoreLabel(feedback.global_score).color}`}>
              <Trophy size={14} />
              {scoreLabel}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{feedback.global_comment}</p>
          </div>
        </div>

        {/* Verdict */}
        {feedback.verdict && (
          <div className="mt-5 pt-4 border-t border-[#1e1e2a]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Verdict Final</p>
            <p className="text-base font-bold text-white italic">"{feedback.verdict}"</p>
          </div>
        )}
      </div>

      {/* Criteria */}
      <Section title="Analyse par Critères" icon={Target}>
        <div className="space-y-2">
          {(feedback.criteria || []).map((c, i) => (
            <CriteriaCard key={i} criterion={c} index={i} />
          ))}
        </div>
        {/* Score summary bar */}
        {feedback.criteria && feedback.criteria.length > 0 && (
          <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
            {feedback.criteria.map((c, i) => {
              const { color } = getScoreLabel(c.score)
              return (
                <div key={i} className="bg-[#111118] border border-[#1e1e2a] rounded-lg p-2 text-center">
                  <div className="text-xs">{c.icon || '📌'}</div>
                  <div className={`text-lg font-black ${color}`}>{c.score}</div>
                  <div className="text-[9px] text-gray-600 uppercase tracking-wide leading-tight mt-0.5">{c.name.split(' ')[0]}</div>
                </div>
              )
            })}
          </div>
        )}
      </Section>

      {/* Detailed feedback */}
      {feedback.detailed_feedback && (
        <Section title="Analyse Approfondie" icon={BookOpen}>
          <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{feedback.detailed_feedback}</p>
          </div>
        </Section>
      )}

      {/* What works / what needs work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedback.what_works && feedback.what_works.length > 0 && (
          <div className="bg-[#111118] border border-green-500/20 rounded-xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-3 flex items-center gap-1.5">
              <CheckCircle size={10} /> Ce qui fonctionne
            </p>
            <ul className="space-y-2.5">
              {feedback.what_works.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                  <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {feedback.what_needs_work && feedback.what_needs_work.length > 0 && (
          <div className="bg-[#111118] border border-amber-500/20 rounded-xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-1.5">
              <AlertCircle size={10} /> À améliorer
            </p>
            <ul className="space-y-2.5">
              {feedback.what_needs_work.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                  <AlertCircle size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action points */}
      {feedback.action_points && feedback.action_points.length > 0 && (
        <Section title="Plan d'Action" icon={Zap}>
          <div className="space-y-2">
            {feedback.action_points.map((point, i) => {
              const p = typeof point === 'string'
                ? { priority: 'moyenne', action: point }
                : point
              const cfg = PRIORITY_CONFIG[p.priority] || PRIORITY_CONFIG.moyenne
              return (
                <div key={i} className={`flex items-start gap-3 p-4 ${cfg.bg} border ${cfg.border} rounded-xl`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.color} flex-shrink-0 mt-0.5 w-20 text-right`}>
                    {cfg.label}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">{p.action}</p>
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* Reference works */}
      {feedback.reference_works && feedback.reference_works.length > 0 && (
        <Section title="Œuvres de Référence Suggérées" icon={Star}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {feedback.reference_works.map((ref, i) => (
              <div key={i} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4 flex items-start gap-2">
                <Star size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400 leading-relaxed">{ref}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Potential */}
      {feedback.potential_assessment && (
        <div className="bg-gradient-to-r from-purple-950/30 to-[#111118] border border-purple-900/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={18} className="text-purple-400" />
            <p className="text-sm font-bold text-white uppercase tracking-wide">Évaluation du Potentiel</p>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{feedback.potential_assessment}</p>
        </div>
      )}

      {/* Original content toggle */}
      <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden">
        <button
          onClick={() => setShowContent(!showContent)}
          className="w-full flex items-center justify-between p-4 hover:bg-[#14141c] transition-colors"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Texte soumis</span>
          {showContent ? <ChevronUp size={16} className="text-gray-600" /> : <ChevronDown size={16} className="text-gray-600" />}
        </button>
        {showContent && (
          <div className="px-4 pb-4 border-t border-[#1e1e2a] pt-3">
            <pre className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap font-mono">{content}</pre>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-wrap gap-3 pb-4">
        <Link to="/soumettre" className="btn-primary">
          <Zap size={16} />
          Nouvelle soumission
        </Link>
        <Link to="/historique" className="btn-secondary">
          <BookOpen size={16} />
          Voir l'historique
        </Link>
      </div>
    </div>
  )
}
