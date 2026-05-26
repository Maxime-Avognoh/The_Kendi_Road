import React, { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react'
import { getScoreLabel } from '../utils/categories.js'

export default function CriteriaCard({ criterion, index }) {
  const [expanded, setExpanded] = useState(false)
  const { label, color, bg } = getScoreLabel(criterion.score)

  const barColor =
    criterion.score >= 18 ? 'bg-yellow-400' :
    criterion.score >= 16 ? 'bg-green-400' :
    criterion.score >= 14 ? 'bg-blue-400' :
    criterion.score >= 12 ? 'bg-cyan-400' :
    criterion.score >= 10 ? 'bg-amber-400' :
    criterion.score >= 8  ? 'bg-orange-400' :
    'bg-red-400'

  const fillPercent = (criterion.score / 20) * 100

  return (
    <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden transition-all duration-200 hover:border-[#2a2a38]">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        <span className="text-2xl flex-shrink-0">{criterion.icon || '📌'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-semibold text-white truncate">{criterion.name}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg} ${color}`}>{label}</span>
              <span className="text-lg font-black text-white">{criterion.score}<span className="text-xs text-gray-500">/20</span></span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${barColor}`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
        <div className="text-gray-600 flex-shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[#1e1e2a] pt-3 space-y-3">
          <p className="text-sm text-gray-300 leading-relaxed">{criterion.comment}</p>

          {criterion.strengths && criterion.strengths.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-1.5">Ce qui fonctionne</p>
              <ul className="space-y-1">
                {criterion.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {criterion.improvements && criterion.improvements.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-1.5">À améliorer</p>
              <ul className="space-y-1">
                {criterion.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <AlertCircle size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
