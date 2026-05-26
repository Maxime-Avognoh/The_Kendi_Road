import React from 'react'
import { getScoreLabel } from '../utils/categories.js'

export default function ScoreRing({ score, size = 'lg', showLabel = true }) {
  const radius = size === 'lg' ? 54 : size === 'md' ? 38 : 26
  const stroke = size === 'lg' ? 8 : size === 'md' ? 6 : 5
  const dim = (radius + stroke) * 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(Math.max(score, 0), 20) / 20
  const dashOffset = circumference * (1 - progress)
  const { label, color } = getScoreLabel(score)

  const scoreColor =
    score >= 18 ? '#facc15' :
    score >= 16 ? '#4ade80' :
    score >= 14 ? '#60a5fa' :
    score >= 12 ? '#22d3ee' :
    score >= 10 ? '#fbbf24' :
    score >= 8  ? '#fb923c' :
    '#f87171'

  const fontSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-xl' : 'text-sm'
  const subSize  = size === 'lg' ? 'text-xs' : 'text-[9px]'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2} cy={dim / 2} r={radius}
            fill="none"
            stroke="#1e1e2a"
            strokeWidth={stroke}
          />
          <circle
            cx={dim / 2} cy={dim / 2} r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-black text-white leading-none`}>{score}</span>
          <span className={`${subSize} text-gray-500 font-medium`}>/20</span>
        </div>
      </div>
      {showLabel && (
        <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>{label}</span>
      )}
    </div>
  )
}
