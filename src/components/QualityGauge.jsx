import React, { useEffect, useState } from 'react'

// ─── Gauge SVG arc ────────────────────────────────────────────────────────────
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  if (Math.abs(endAngle - startAngle) < 0.1) return ''
  const start = polarToCartesian(cx, cy, r, Math.min(endAngle, startAngle + 359.9))
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

// ─── Main Gauge Component ─────────────────────────────────────────────────────
export default function QualityGauge({ score = 0, color = '#ef4444', size = 130, label = '' }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100)
    return () => clearTimeout(timer)
  }, [score])

  const cx = 50
  const cy = 50
  const r = 38
  const startAngle = -130
  const endAngle = 130
  const totalSweep = endAngle - startAngle
  const fillAngle = startAngle + (animatedScore / 100) * totalSweep

  const bgPath = arcPath(cx, cy, r, startAngle, endAngle)
  const fillPath = animatedScore > 0 ? arcPath(cx, cy, r, startAngle, fillAngle) : ''

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 100 86"
        style={{ transition: 'all 0.6s ease' }}
      >
        {/* Shadow glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={bgPath}
          fill="none"
          stroke="#1e1e2a"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Score fill with transition */}
        {fillPath && (
          <path
            d={fillPath}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          />
        )}

        {/* Score number */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="20"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          {animatedScore}
        </text>

        {/* /100 */}
        <text
          x="50"
          y="63"
          textAnchor="middle"
          fill="#4b5563"
          fontSize="7"
          fontFamily="system-ui"
        >
          /100
        </text>
      </svg>

      {label && (
        <span
          className="text-xs font-semibold tracking-wide uppercase"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

// ─── Section bar ──────────────────────────────────────────────────────────────
export function SectionBar({ label, score, icon }) {
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 150)
    return () => clearTimeout(t)
  }, [score])

  const color =
    score < 30 ? '#ef4444'
    : score < 55 ? '#f97316'
    : score < 75 ? '#eab308'
    : '#22c55e'

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400 flex items-center gap-1.5">
          <span>{icon}</span>
          {label}
        </span>
        <span className="font-semibold" style={{ color }}>
          {score}%
        </span>
      </div>
      <div className="h-1.5 bg-[#1e1e2a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${animated}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
