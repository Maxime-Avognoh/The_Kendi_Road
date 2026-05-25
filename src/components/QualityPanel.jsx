import React, { useState } from 'react'
import { AlertCircle, AlertTriangle, Lightbulb, ChevronDown, ChevronUp, BookOpen, CheckCircle } from 'lucide-react'
import QualityGauge, { SectionBar } from './QualityGauge.jsx'

// ─── Advice Item ──────────────────────────────────────────────────────────────
function AdviceItem({ item }) {
  const config = {
    error: {
      icon: <AlertCircle size={14} />,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
      label: 'Manque',
    },
    warning: {
      icon: <AlertTriangle size={14} />,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      label: 'Important',
    },
    tip: {
      icon: <Lightbulb size={14} />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      label: 'Conseil',
    },
  }[item.level] || {}

  return (
    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs ${config.bg}`}>
      <span className={`mt-0.5 flex-shrink-0 ${config.color}`}>{config.icon}</span>
      <p className="text-gray-300 leading-relaxed">{item.text}</p>
    </div>
  )
}

// ─── Africa Tip Card ──────────────────────────────────────────────────────────
function AfricaTipCard({ tip }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-purple-500/20 bg-purple-500/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-purple-500/10 transition-colors"
      >
        <span className="text-xl flex-shrink-0">{tip.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-purple-300">{tip.titre}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            <span className="line-through text-gray-600">{tip.cliche}</span>
          </p>
        </div>
        <span className="text-purple-400 flex-shrink-0 mt-0.5">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2.5">
          <p className="text-xs text-gray-300 leading-relaxed border-t border-purple-500/10 pt-2.5">
            {tip.conseil}
          </p>
          {tip.exemples && (
            <div className="space-y-1">
              <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                Idées concrètes
              </p>
              <ul className="space-y-1">
                {tip.exemples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-purple-500 mt-0.5 flex-shrink-0">→</span>
                    {ex}
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

// ─── Main Quality Panel ───────────────────────────────────────────────────────
export default function QualityPanel({ analysis, title = 'Qualité de la fiche', compact = false }) {
  const [tab, setTab] = useState('conseils')
  const { overallScore, sections, advice, label, color, africaTips } = analysis

  const errors = advice.filter(a => a.level === 'error')
  const warnings = advice.filter(a => a.level === 'warning')
  const tips = advice.filter(a => a.level === 'tip')

  return (
    <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#1e1e2a]">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{title}</p>

        {/* Gauge + sections */}
        <div className={`flex ${compact ? 'gap-4 items-center' : 'flex-col gap-4'}`}>
          <div className="flex justify-center">
            <QualityGauge score={overallScore} color={color} label={label} size={compact ? 100 : 130} />
          </div>

          {sections.length > 0 && (
            <div className="flex-1 space-y-2.5">
              {sections.map((s, i) => (
                <SectionBar key={i} {...s} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1e1e2a]">
        <button
          onClick={() => setTab('conseils')}
          className={`flex-1 px-3 py-2.5 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            tab === 'conseils'
              ? 'text-white border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <AlertTriangle size={12} />
          Conseils
          {advice.length > 0 && (
            <span className="bg-red-500/20 text-red-400 rounded-full px-1.5 text-[10px] font-bold">
              {advice.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('afrique')}
          className={`flex-1 px-3 py-2.5 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            tab === 'afrique'
              ? 'text-white border-b-2 border-purple-500'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <BookOpen size={12} />
          Anti-clichés
        </button>
      </div>

      {/* Tab content */}
      <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
        {tab === 'conseils' && (
          <>
            {advice.length === 0 ? (
              <div className="flex flex-col items-center py-6 gap-2 text-center">
                <CheckCircle size={24} className="text-green-500" />
                <p className="text-sm font-semibold text-green-400">Très bien développé !</p>
                <p className="text-xs text-gray-500">Continue à enrichir les détails.</p>
              </div>
            ) : (
              <>
                {errors.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      Indispensable
                    </p>
                    {errors.map((a, i) => <AdviceItem key={i} item={a} />)}
                  </div>
                )}
                {warnings.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                      Important
                    </p>
                    {warnings.map((a, i) => <AdviceItem key={i} item={a} />)}
                  </div>
                )}
                {tips.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                      Pour aller plus loin
                    </p>
                    {tips.map((a, i) => <AdviceItem key={i} item={a} />)}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {tab === 'afrique' && (
          <div className="space-y-2">
            <div className="px-2 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-xs text-purple-300 leading-relaxed">
                🌍 Ton manga se passe dans une <strong>Afrique fictive</strong>. Ces conseils t'aident à créer quelque chose d'original, ancré dans des réalités riches, loin des clichés habituels.
              </p>
            </div>
            {(africaTips || []).map((tip, i) => (
              <AfricaTipCard key={i} tip={tip} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
