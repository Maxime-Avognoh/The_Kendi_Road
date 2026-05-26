import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { History, Trash2, Send, ArrowRight, Clock, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getCategoryById, getScoreLabel } from '../utils/categories.js'
import ScoreRing from '../components/ScoreRing.jsx'

export default function Historique() {
  const { submissions, deleteSubmission, clearHistory } = useApp()
  const [confirmClear, setConfirmClear] = useState(false)

  if (submissions.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-[#111118] border border-[#1e1e2a] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <History size={28} className="text-gray-600" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Aucune soumission</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-sm">
          Tu n'as pas encore soumis de texte pour analyse. Commence maintenant !
        </p>
        <Link to="/soumettre" className="btn-primary">
          <Send size={16} />
          Première soumission
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-red-500 rounded-full" />
            <h1 className="text-2xl font-black text-white tracking-tight">Mes Soumissions</h1>
          </div>
          <p className="text-gray-500 text-sm ml-3">{submissions.length} analyse{submissions.length > 1 ? 's' : ''} dans l'historique</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/soumettre" className="btn-primary">
            <Send size={14} />
            Nouvelle
          </Link>
          {confirmClear ? (
            <>
              <span className="text-xs text-gray-500">Effacer tout ?</span>
              <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-300 font-bold px-2">Oui</button>
              <button onClick={() => setConfirmClear(false)} className="text-xs text-gray-500 hover:text-gray-300 px-2">Non</button>
            </>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="btn-ghost text-gray-600 hover:text-red-400"
            >
              <Trash2 size={14} />
              Effacer tout
            </button>
          )}
        </div>
      </div>

      {/* Average score */}
      {submissions.length > 1 && (
        <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4 mb-6 flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <div className="text-2xl font-black text-white">
              {(submissions.reduce((sum, s) => sum + (s.feedback?.global_score || 0), 0) / submissions.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Moyenne générale</div>
          </div>
          <div className="flex-1 h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${((submissions.reduce((sum, s) => sum + (s.feedback?.global_score || 0), 0) / submissions.length) / 20) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">
            {getScoreLabel(submissions.reduce((sum, s) => sum + (s.feedback?.global_score || 0), 0) / submissions.length).label}
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {submissions.map(sub => {
          const cat = getCategoryById(sub.category)
          const { label, color } = getScoreLabel(sub.feedback?.global_score || 0)
          const date = new Date(sub.createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'short', year: 'numeric'
          })

          return (
            <div key={sub.id} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4 hover:border-[#2a2a38] transition-all">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Score */}
                <ScoreRing score={sub.feedback?.global_score || 0} size="sm" showLabel={false} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {cat && (
                      <span className={`text-xs font-bold ${cat.colorClass}`}>{cat.emoji} {cat.label}</span>
                    )}
                    {sub.subcategory && (
                      <span className="text-xs text-gray-600">· {sub.subcategory}</span>
                    )}
                    <span className={`text-xs font-bold ${color}`}>{label}</span>
                  </div>
                  <p className="text-sm font-semibold text-white truncate">
                    {sub.title || 'Sans titre'}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                    <Clock size={10} />
                    {date}
                  </p>
                </div>

                {/* Score number */}
                <div className="text-right flex-shrink-0">
                  <div className={`text-2xl font-black ${color}`}>{sub.feedback?.global_score || '?'}</div>
                  <div className="text-xs text-gray-600">/20</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link
                    to={`/feedback/${sub.id}`}
                    className="btn-secondary py-1.5 px-3 text-xs"
                  >
                    Voir <ArrowRight size={12} />
                  </Link>
                  <button
                    onClick={() => deleteSubmission(sub.id)}
                    className="delete-btn"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Verdict preview */}
              {sub.feedback?.verdict && (
                <div className="mt-2 pt-2 border-t border-[#1e1e2a]">
                  <p className="text-xs text-gray-500 italic truncate">"{sub.feedback.verdict}"</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
