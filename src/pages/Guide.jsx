import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, ChevronDown, ChevronUp, Send, HelpCircle, CheckCircle,
  Lightbulb, Target, AlertCircle, Star
} from 'lucide-react'
import { CATEGORIES } from '../utils/categories.js'

const GENERAL_PRINCIPLES = [
  {
    icon: '⚡',
    title: 'Show, Don\'t Tell',
    content: 'La règle d\'or de toute narration. Ne dis jamais ce qu\'un personnage ressent — montre-le à travers ses actions, ses décisions, ses mots. "Il était triste" vs "Il fixa le vide pendant un long moment, les lèvres serrées, puis se leva sans un mot." La deuxième version crée de l\'empathie.'
  },
  {
    icon: '🏗️',
    title: 'Structure en 3 Actes',
    content: 'Tout récit efficace suit une structure : Acte 1 (mise en place, présentation du monde et du protagoniste), Acte 2 (montée en puissance, confrontation, obstacles), Acte 3 (climax et résolution). Cette structure s\'applique à une scène, un chapitre, un arc ou une saga entière.'
  },
  {
    icon: '🎯',
    title: 'Le Désir vs Le Besoin',
    content: 'Chaque protagoniste doit avoir quelque chose qu\'il VEUT (un objectif externe) et quelque chose dont il a BESOIN (une vérité interne). Le voyage consiste à comprendre que ce dont il avait besoin est plus important. Exemple : Naruto veut être Hokage (désir) mais a besoin d\'être accepté et aimé (besoin).'
  },
  {
    icon: '⚔️',
    title: 'Conflit à Tous les Niveaux',
    content: 'Le conflit n\'est pas seulement l\'action physique. Il existe à 4 niveaux : Interne (le personnage vs lui-même), Interpersonnel (personnage vs personnage), Social (personnage vs groupe/société), Cosmique (personnage vs forces plus grandes). Les meilleures histoires combinent tous ces niveaux.'
  },
  {
    icon: '🌊',
    title: 'Pacing & Rythme',
    content: 'Le rythme est la vitesse à laquelle ton histoire avance. Il doit varier : des scènes d\'action courtes et intenses, suivies de moments de respiration émotionnelle. En manga, c\'est la gestion des panneaux. En littérature, c\'est la longueur des phrases et des chapitres. Trop rapide = le lecteur est perdu. Trop lent = il décroche.'
  },
  {
    icon: '🔥',
    title: 'La Blessure Intérieure',
    content: 'Tout personnage mémorable a une plaie émotionnelle qui n\'est pas guérie — une peur, une honte, une perte. Cette blessure guide ses décisions (souvent irrationnellement), crée ses angles morts et définit son arc de transformation. Sans blessure, pas de voyage intérieur. Sans voyage intérieur, pas d\'empathie du lecteur.'
  },
  {
    icon: '💡',
    title: 'Le Thème comme Boussole',
    content: 'Le thème n\'est pas un message moral — c\'est une QUESTION que ton œuvre explore. "Qu\'est-ce que cela signifie d\'être humain ?" "La vengeance mène-t-elle à la paix ?" "Un monstre peut-il choisir d\'être bon ?" Chaque scène, chaque personnage, chaque événement doit répondre à cette question d\'une façon ou d\'une autre.'
  },
  {
    icon: '🎭',
    title: 'L\'Antagoniste comme Miroir',
    content: 'Le meilleur antagoniste n\'est pas "méchant" — il incarne la même aspiration que le protagoniste mais avec des moyens ou des valeurs opposés. Vegeta est l\'autre version de Goku (la fierté vs l\'humilité). Javert est l\'autre version de Valjean (la loi vs la grâce). Un bon antagoniste force le protagoniste à remettre ses propres valeurs en question.'
  },
]

const SCORING_BREAKDOWN = [
  { range: '18-20', label: 'Chef-d\'œuvre', color: 'text-yellow-400', bg: 'bg-yellow-400/10', desc: 'Niveau publication professionnel. Originalité, maîtrise technique et impact émotionnel exceptionnels.' },
  { range: '16-17', label: 'Excellent', color: 'text-green-400', bg: 'bg-green-400/10', desc: 'Très haut niveau. Quelques ajustements mineurs mais l\'ensemble est solide et impactant.' },
  { range: '14-15', label: 'Très bon', color: 'text-blue-400', bg: 'bg-blue-400/10', desc: 'Au-dessus de la moyenne. Concepts solides avec des éléments à affiner.' },
  { range: '12-13', label: 'Bon', color: 'text-cyan-400', bg: 'bg-cyan-400/10', desc: 'Fondations présentes mais plusieurs points importants à développer.' },
  { range: '10-11', label: 'Passable', color: 'text-amber-400', bg: 'bg-amber-400/10', desc: 'L\'essentiel est là mais nécessite un travail conséquent.' },
  { range: '8-9', label: 'À travailler', color: 'text-orange-400', bg: 'bg-orange-400/10', desc: 'Problèmes fondamentaux. Retour aux bases nécessaire sur ce critère.' },
  { range: '0-7', label: 'Insuffisant', color: 'text-red-400', bg: 'bg-red-400/10', desc: 'Ce point doit être repensé entièrement. Mais chaque expert a commencé quelque part.' },
]

const REFERENCES = [
  { title: 'Fullmetal Alchemist', type: 'Manga', lesson: 'Structure narrative parfaite, thème de l\'équivalence des échanges cohérent jusqu\'à la dernière page, personnages avec blessures intérieures claires.' },
  { title: 'Attack on Titan', type: 'Manga', lesson: 'World building millimétré, retournements narratifs audacieux, questionnement moral complexe. Chaque révélation récontextualise tout ce qu\'on a lu.' },
  { title: 'Vinland Saga', type: 'Manga', lesson: 'Arc de personnage extraordinaire. Thorfinn passe de la vengeance à la paix — une transformation sur des centaines de chapitres, toujours cohérente.' },
  { title: 'One Piece', type: 'Manga', lesson: 'Maître de la sérialisation : chaque arc semble auto-conclusif mais contribue au voyage global. Les personnages secondaires sont aussi riches que le protagoniste.' },
  { title: 'Demon Slayer', type: 'Manga', lesson: 'Exemple d\'impact émotionnel immédiat. La motivation du protagoniste est établie en quelques pages, universelle et bouleversante.' },
  { title: 'Berserk', type: 'Manga', lesson: 'Standard absolu pour la profondeur psychologique. Guts est une leçon de personnage avec blessure intérieure. L\'antagoniste Griffith est fascinant car compréhensible.' },
]

function CategoryGuideSection({ cat }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#14141c] transition-colors"
      >
        <span className="text-2xl flex-shrink-0">{cat.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white">{cat.label}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
        </div>
        <div className="text-gray-600">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-[#1e1e2a] pt-4 space-y-5">
          <p className="text-sm text-gray-300 leading-relaxed">{cat.longDescription}</p>

          {/* Sous-catégories */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Types de soumissions</p>
            <div className="flex flex-wrap gap-2">
              {cat.subcategories.map(sub => (
                <span key={sub} className={`px-2.5 py-1 ${cat.bgClass} ${cat.colorClass} border ${cat.borderClass} rounded-full text-xs font-medium`}>
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Guide tips */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-2 flex items-center gap-1">
              <Lightbulb size={10} /> Conseils pour maximiser ton feedback
            </p>
            <ul className="space-y-2">
              {cat.guide.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                  <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Questions */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-1">
              <HelpCircle size={10} /> Questions à te poser avant de soumettre
            </p>
            <ul className="space-y-2">
              {cat.guide.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                  <AlertCircle size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/soumettre"
            state={{ category: cat.id }}
            className={`inline-flex items-center gap-2 px-4 py-2 ${cat.bgClass} ${cat.colorClass} border ${cat.borderClass} rounded-lg text-xs font-bold hover:brightness-110 transition-all`}
          >
            <Send size={12} />
            Soumettre dans cette catégorie
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Guide() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 bg-red-500 rounded-full" />
          <h1 className="text-2xl font-black text-white tracking-tight">Guide Éditorial Complet</h1>
        </div>
        <p className="text-gray-500 text-sm ml-3">
          Le manuel de MAESTRO — tout ce que tu dois savoir pour soumettre et progresser
        </p>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-r from-red-950/30 to-[#111118] border border-red-900/30 rounded-xl p-6">
        <BookOpen size={24} className="text-red-400 mb-3" />
        <h2 className="text-base font-bold text-white mb-2">Ce guide est ton compagnon de progression</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          MAESTRO n'est pas là pour valider — il est là pour <span className="text-white font-semibold">transformer</span>.
          Chaque feedback est une session d'édition professionnelle. Pour en tirer le maximum, il faut comprendre comment fonctionne
          l'analyse, ce qu'on cherche dans chaque type de soumission, et surtout — comment utiliser les retours pour progresser réellement.
        </p>
      </div>

      {/* Scoring system */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-red-500 rounded-full" />
          <h2 className="text-base font-black text-white uppercase tracking-wide">Système de Notation</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          Chaque critère est noté sur 20 avec une précision décimale (ex: 14.5). Le score global est calculé selon
          les critères spécifiques à ta catégorie. Voici comment interpréter ta note :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SCORING_BREAKDOWN.map(s => (
            <div key={s.range} className={`${s.bg} border border-transparent rounded-lg p-3 flex items-start gap-3`}>
              <span className={`text-lg font-black ${s.color} flex-shrink-0 w-14 text-right`}>{s.range}</span>
              <div>
                <p className={`text-xs font-bold ${s.color}`}>{s.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Principles */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-red-500 rounded-full" />
          <h2 className="text-base font-black text-white uppercase tracking-wide">8 Principes Fondamentaux</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          Ces principes s'appliquent à TOUTES les catégories et forment la base de tout récit efficace. Maîtrise-les avant tout.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GENERAL_PRINCIPLES.map((p, i) => (
            <div key={i} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{p.icon}</span>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{p.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories guide */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-red-500 rounded-full" />
          <h2 className="text-base font-black text-white uppercase tracking-wide">Guide par Catégorie</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Clique sur chaque catégorie pour voir son guide détaillé, les types de soumissions acceptés, et les questions à te poser avant de soumettre.
        </p>
        <div className="space-y-3">
          {CATEGORIES.map(cat => <CategoryGuideSection key={cat.id} cat={cat} />)}
        </div>
      </div>

      {/* References */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-red-500 rounded-full" />
          <h2 className="text-base font-black text-white uppercase tracking-wide">Œuvres de Référence</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Ces œuvres représentent les standards éditoriaux que MAESTRO utilise comme références. Étude-les.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REFERENCES.map((ref, i) => (
            <div key={i} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star size={14} className="text-amber-400 flex-shrink-0" />
                <span className="text-sm font-bold text-white">{ref.title}</span>
                <span className="text-xs text-gray-600 border border-[#2a2a38] px-1.5 py-0.5 rounded">{ref.type}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{ref.lesson}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm mb-4">Tu as les clés. Il ne reste plus qu'à écrire.</p>
        <Link to="/soumettre" className="btn-primary text-base px-8 py-3">
          <Send size={18} />
          Soumettre maintenant
        </Link>
      </div>
    </div>
  )
}
