// ─── Définition complète des catégories éditoriales ─────────────────────────

export const CATEGORIES = [
  {
    id: 'scenario',
    label: 'Scénario Global',
    emoji: '🎯',
    icon: 'Target',
    color: 'red',
    colorClass: 'text-red-400',
    bgClass: 'bg-red-500/10',
    borderClass: 'border-red-500/30',
    activeBg: 'bg-red-600',
    description: 'Pitch, synopsis, concept général de ton œuvre',
    longDescription: 'Ton scénario global est le cœur de ton œuvre. C\'est ici que tu présentes le concept, les enjeux principaux, l\'histoire en résumé. On évalue l\'originalité du concept, la solidité de la structure et le potentiel de sérialisation.',
    subcategories: ['Pitch / Logline', 'Synopsis court (1 page)', 'Synopsis détaillé', 'Concept & Univers', 'Thèse de l\'œuvre'],
    guide: {
      title: 'Comment soumettre un scénario',
      tips: [
        'Présente les enjeux principaux en moins de 3 phrases (le pitch)',
        'Identifie clairement ton protagoniste et son conflit central',
        'Explique ce qui rend ton concept UNIQUE — qu\'est-ce qu\'on n\'a jamais vu ?',
        'Décris la fin attendue, même grossièrement — une histoire sans direction n\'est pas une histoire',
        'Mentionne tes inspirations — cela aide à comprendre ton univers de référence',
      ],
      questions: [
        'Quel est le thème central de ton œuvre en une phrase ?',
        'Qu\'est-ce que ton protagoniste veut ? Qu\'est-ce dont il a besoin ?',
        'Quel est le conflit principal qui motive chaque tome ?',
        'Quelle est la fin ultime de ta saga ?',
      ]
    }
  },
  {
    id: 'chapitre',
    label: 'Chapitre / Scène',
    emoji: '📖',
    icon: 'BookOpen',
    color: 'blue',
    colorClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/30',
    activeBg: 'bg-blue-600',
    description: 'Un chapitre complet, une scène clé, une séquence',
    longDescription: 'L\'analyse de chapitre est l\'un des exercices les plus précieux. On décortique le rythme, l\'impact de chaque beat narratif, la qualité des dialogues et la manière dont la scène fait avancer l\'histoire.',
    subcategories: ['Chapitre d\'introduction', 'Chapitre d\'action', 'Scène émotionnelle', 'Scène de révélation', 'Climax / Boss fight', 'Épilogue / Dénouement'],
    guide: {
      title: 'Comment soumettre un chapitre',
      tips: [
        'Donne le contexte : où en est-on dans l\'histoire ?',
        'Précise le nombre de pages approximatif ou de panneaux pensés',
        'Indique si c\'est un premier jet ou une version retravaillée',
        'Mentionne les émotions que tu veux que le lecteur ressente',
        'Si tu as des dialogues, assure-toi qu\'ils sont clairement attribués',
      ],
      questions: [
        'Quel est l\'objectif de ce chapitre dans l\'arc global ?',
        'Qu\'est-ce qui change pour le personnage à la fin de ce chapitre ?',
        'Quel est le "cliffhanger" ou la note finale ?',
        'Quels personnages apparaissent et quel est leur état émotionnel ?',
      ]
    }
  },
  {
    id: 'personnage',
    label: 'Personnage',
    emoji: '⚔️',
    icon: 'User',
    color: 'amber',
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    activeBg: 'bg-amber-600',
    description: 'Fiche personnage, backstory, psychologie, pouvoirs',
    longDescription: 'Un personnage mémorable est la colonne vertébrale de tout manga réussi. On analyse sa profondeur psychologique, la cohérence de ses actions, son arc de transformation et son potentiel émotionnel sur le lecteur.',
    subcategories: ['Protagoniste', 'Antagoniste', 'Personnage de soutien', 'Rival', 'Mentor', 'Personnage secondaire'],
    guide: {
      title: 'Comment soumettre une fiche personnage',
      tips: [
        'Va au-delà des caractéristiques physiques — l\'apparence seule ne fait pas un personnage',
        'Définit clairement sa blessure intérieure (trauma, peur profonde)',
        'Explique son code moral : qu\'est-ce qu\'il ne ferait JAMAIS ? Et pourquoi ?',
        'Décris comment il évolue du début à la fin de l\'histoire',
        'Montre ses contradictions — les meilleurs personnages sont paradoxaux',
      ],
      questions: [
        'Quelle est la peur profonde de ce personnage ?',
        'Quel mensonge se raconte-t-il sur lui-même ?',
        'Qu\'est-ce qui va le forcer à changer ?',
        'Comment est-il différent à la fin de l\'histoire ?',
      ]
    }
  },
  {
    id: 'worldbuilding',
    label: 'World Building',
    emoji: '🌍',
    icon: 'Globe',
    color: 'green',
    colorClass: 'text-green-400',
    bgClass: 'bg-green-500/10',
    borderClass: 'border-green-500/30',
    activeBg: 'bg-green-600',
    description: 'Univers, magie, géopolitique, cultures, règles du monde',
    longDescription: 'Un monde bien construit donne de la profondeur et de la crédibilité à ton histoire. On évalue la cohérence interne des règles, l\'originalité des concepts et comment l\'univers sert l\'histoire plutôt que de la ralentir.',
    subcategories: ['Système de magie / Pouvoirs', 'Géographie & Cartographie', 'Histoire & Chronologie', 'Cultures & Sociétés', 'Organisations & Institutions', 'Technologie & Sciences'],
    guide: {
      title: 'Comment soumettre du world building',
      tips: [
        'Définis les règles AVANT les exceptions — un système solide a des limites claires',
        'Montre comment le monde influence la vie quotidienne des personnages',
        'Évite le "info-dump" — présente l\'univers via des exemples concrets',
        'Chaque élément du monde doit servir l\'histoire ou les thèmes',
        'Teste la cohérence : appliquer tes règles crée-t-il des problèmes logiques ?',
      ],
      questions: [
        'Quelles sont les règles absolues de ton système (magie, technologie...) ?',
        'Quelles en sont les limites et le coût ?',
        'Comment cet aspect du monde crée-t-il du conflit dans ton histoire ?',
        'Qui contrôle ce système et pourquoi c\'est important ?',
      ]
    }
  },
  {
    id: 'arc',
    label: 'Arc Narratif',
    emoji: '🌊',
    icon: 'TrendingUp',
    color: 'purple',
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/30',
    activeBg: 'bg-purple-600',
    description: 'Un arc complet, saga, structure dramatique',
    longDescription: 'L\'arc narratif est la progression dramatique d\'une partie de ton histoire. On analyse la structure en actes, la montée des enjeux, les retournements, le développement des personnages et la satisfaction de la résolution.',
    subcategories: ['Arc de présentation', 'Arc de développement', 'Arc de climax', 'Arc de conclusion', 'Arc secondaire (side story)'],
    guide: {
      title: 'Comment soumettre un arc narratif',
      tips: [
        'Présente l\'arc avec un début, un milieu et une fin clairs',
        'Identifie le conflit central de l\'arc (différent du conflit global)',
        'Montre comment les personnages changent au cours de cet arc',
        'Décris le climax et ce qui le rend mémorable',
        'Explique le lien avec le récit global et les arcs suivants',
      ],
      questions: [
        'Quel est l\'enjeu principal de cet arc ?',
        'Qui grandit et comment à la fin de cet arc ?',
        'Quel est le twist ou la révélation de cet arc ?',
        'Comment cet arc change-t-il le statu quo de l\'histoire ?',
      ]
    }
  },
  {
    id: 'dialogue',
    label: 'Dialogue / Écriture',
    emoji: '💬',
    icon: 'MessageSquare',
    color: 'cyan',
    colorClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    borderClass: 'border-cyan-500/30',
    activeBg: 'bg-cyan-600',
    description: 'Dialogues, monologues, qualité d\'écriture, style',
    longDescription: 'Les dialogues révèlent les personnages et font avancer l\'histoire. On évalue l\'authenticité des voix, la fluidité, le sous-texte et l\'efficacité de chaque échange. En manga, chaque bulle doit gagner sa place.',
    subcategories: ['Dialogue entre personnages', 'Monologue intérieur', 'Discours de boss / Villain speech', 'Confrontation émotionnelle', 'Exposition dialoguée', 'Style narratif général'],
    guide: {
      title: 'Comment soumettre des dialogues',
      tips: [
        'Indique qui parle et dans quel contexte émotionnel',
        'Lis tes dialogues à voix haute — si ça sonne faux, c\'est faux',
        'Chaque personnage doit avoir une voix UNIQUE (vocabulaire, rythme, tics)',
        'Le sous-texte est roi : ce qui n\'est pas dit est souvent plus puissant',
        'Évite les dialogues "miroir" (répéter ce qu\'on vient de dire)',
      ],
      questions: [
        'Qu\'est-ce que chaque personnage veut dans cette scène ?',
        'Qu\'est-ce qu\'ils cachent ou ne peuvent pas dire directement ?',
        'Comment leur façon de parler révèle leur personnalité ?',
        'Qu\'est-ce qui change dans la relation après ce dialogue ?',
      ]
    }
  },
  {
    id: 'theme',
    label: 'Thème & Message',
    emoji: '🔥',
    icon: 'Flame',
    color: 'orange',
    colorClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    borderClass: 'border-orange-500/30',
    activeBg: 'bg-orange-600',
    description: 'Thèmes, messages, symbolisme, philosophie de l\'œuvre',
    longDescription: 'Les grandes œuvres disent quelque chose sur l\'humanité. On analyse la profondeur et la cohérence du thème central, son universalité et comment il s\'exprime à travers chaque aspect de l\'histoire.',
    subcategories: ['Thème principal', 'Thème secondaire', 'Symbolisme', 'Message moral / Philosophie', 'Critique sociale'],
    guide: {
      title: 'Comment soumettre une analyse thématique',
      tips: [
        'Articule ton thème en une phrase simple ("Cette histoire parle de...")',
        'Montre comment le thème s\'exprime dans les personnages, le monde et les événements',
        'Distingue le SUJET (famille) du THÈME (les liens familiaux forgent l\'identité)',
        'Évite la moralisation directe — montre, ne dis pas',
        'Identifie si ton thème a des nuances ou des contradictions intentionnelles',
      ],
      questions: [
        'Quelle vérité sur la vie humaine ton œuvre explore-t-elle ?',
        'Comment ton protagoniste incarne-t-il ou remet-il en question ce thème ?',
        'Y a-t-il un antagoniste qui représente la thèse opposée ?',
        'Quel est le "statement" final de l\'œuvre sur ce thème ?',
      ]
    }
  },
]

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id)
}

export const CRITERIA_BY_CATEGORY = {
  scenario: [
    { name: 'Originalité & Concept', emoji: '💡' },
    { name: 'Structure Narrative', emoji: '🏗️' },
    { name: 'Cohérence & Logique Interne', emoji: '⚖️' },
    { name: 'Potentiel Émotionnel', emoji: '❤️' },
    { name: 'Complexité & Profondeur', emoji: '🌊' },
    { name: 'Potentiel Commercial & Sérialisation', emoji: '📈' },
  ],
  chapitre: [
    { name: 'Pacing & Rythme', emoji: '⚡' },
    { name: 'Impact Dramatique', emoji: '💥' },
    { name: 'Avancement Narratif', emoji: '➡️' },
    { name: 'Dialogues & Voix', emoji: '💬' },
    { name: 'Description & Atmosphère', emoji: '🌅' },
    { name: 'Accroche & Cliffhanger', emoji: '🎣' },
  ],
  personnage: [
    { name: 'Profondeur Psychologique', emoji: '🧠' },
    { name: 'Cohérence Comportementale', emoji: '🎭' },
    { name: 'Arc de Transformation', emoji: '🔄' },
    { name: 'Originalité & Mémorabilité', emoji: '⭐' },
    { name: 'Impact Émotionnel sur le Lecteur', emoji: '💗' },
    { name: 'Relations & Dynamiques', emoji: '🤝' },
  ],
  worldbuilding: [
    { name: 'Cohérence & Logique Interne', emoji: '⚖️' },
    { name: 'Originalité & Créativité', emoji: '✨' },
    { name: 'Richesse des Détails', emoji: '🎨' },
    { name: 'Intégration Narrative', emoji: '🔗' },
    { name: 'Potentiel d\'Exploration', emoji: '🗺️' },
  ],
  arc: [
    { name: 'Structure & Progression', emoji: '📐' },
    { name: 'Tension Dramatique', emoji: '⚡' },
    { name: 'Développement des Personnages', emoji: '🌱' },
    { name: 'Climax & Résolution', emoji: '🏔️' },
    { name: 'Thème & Message Central', emoji: '🔥' },
    { name: 'Satisfaction du Lecteur', emoji: '🎯' },
  ],
  dialogue: [
    { name: 'Authenticité des Voix', emoji: '🎭' },
    { name: 'Rythme & Fluidité', emoji: '🌊' },
    { name: 'Sous-texte & Profondeur', emoji: '🔍' },
    { name: 'Exposition Naturelle', emoji: '🌿' },
    { name: 'Tension & Conflit Verbal', emoji: '⚔️' },
  ],
  theme: [
    { name: 'Clarté du Message', emoji: '💡' },
    { name: 'Profondeur Philosophique', emoji: '🌌' },
    { name: 'Universalité & Résonance', emoji: '🌍' },
    { name: 'Cohérence avec le Récit', emoji: '🔗' },
    { name: 'Originalité de la Perspective', emoji: '👁️' },
  ],
}

export function getScoreLabel(score) {
  if (score >= 18) return { label: 'Chef-d\'œuvre', color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
  if (score >= 16) return { label: 'Excellent', color: 'text-green-400', bg: 'bg-green-400/10' }
  if (score >= 14) return { label: 'Très bon', color: 'text-blue-400', bg: 'bg-blue-400/10' }
  if (score >= 12) return { label: 'Bon', color: 'text-cyan-400', bg: 'bg-cyan-400/10' }
  if (score >= 10) return { label: 'Passable', color: 'text-amber-400', bg: 'bg-amber-400/10' }
  if (score >= 8) return { label: 'À travailler', color: 'text-orange-400', bg: 'bg-orange-400/10' }
  return { label: 'Insuffisant', color: 'text-red-400', bg: 'bg-red-400/10' }
}
