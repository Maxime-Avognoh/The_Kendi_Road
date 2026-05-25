// ─────────────────────────────────────────────────────────────────────────────
// Quality Analyzer — The Kendi Road
// Calcule un score de qualité et génère des conseils ciblés
// ─────────────────────────────────────────────────────────────────────────────

const hasContent = (val, minLen = 5) =>
  val && typeof val === 'string' && val.trim().length >= minLen

// ─── CONSEILS ANTI-CLICHÉS AFRIQUE FICTIVE ───────────────────────────────────
export const AFRICA_TIPS = {
  lieux: [
    {
      icon: '🏙️',
      titre: 'Pense au-delà de la savane',
      cliche: 'Savane + cases = image réductrice',
      conseil: 'L\'Afrique fictive peut avoir des mégalopoles architecturales, des cités de pierre monumentales (comme le Grand Zimbabwe), des cités portuaires cosmopolites (comme Zanzibar ou Mombasa), des oasis-villes souterraines dans le désert, ou des forêts-labyrinthes quasi-mythiques. La diversité géographique est immense.',
      exemples: [
        'Cité marchande bâtie autour d\'un carrefour de routes caravanières',
        'Port cosmopolite style Zanzibar avec 12 cultures qui cohabitent',
        'Ruines d\'un empire oublié englouties par la forêt',
        'Cité flottante sur un lac du rift africain',
        'Forêt sacrée interdite aux non-initiés',
        'Capitale construite dans et autour d\'une montagne sacrée',
      ],
    },
    {
      icon: '⚗️',
      titre: 'Une technologie propre et originale',
      cliche: 'Primitif vs technologie étrangère importée',
      conseil: 'Les civilisations africaines ont maîtrisé des savoirs avancés : métallurgie du fer et de l\'acier (forgerons du Mali dès le 2500 av. J.-C.), astronomie (les Dogon connaissaient Sirius B sans télescope), architecture monumentale (Lalibela, pyramides du Soudan), hydraulique. Ton monde peut avoir une technologie sui generis, ni "primitive" ni une copie de l\'Occident.',
      exemples: [
        'Métallurgie sacrée réservée à une caste de forgerons-sorciers',
        'Cartographie des étoiles comme base d\'un système de navigation et de pouvoirs',
        'Architecture vivante en terre pisé et pierre volcanique',
        'Système d\'irrigation sophistiqué géré par des ingénieurs-prêtres',
      ],
    },
  ],
  personnages: [
    {
      icon: '👑',
      titre: 'Des rôles variés et inattendus',
      cliche: 'Le guerrier tribal, la reine exotique, le sorcier mystérieux sans logique',
      conseil: 'Pense à des marchands-stratèges qui mènent des guerres économiques, des griots (gardiens de mémoire et maîtres de la parole), des astronomes-prophètes, des forgeronnes dont les armes ont une âme propre, des diplomates qui naviguent entre plusieurs empires, des philosophes qui remettent en question les traditions.',
      exemples: [
        'Le griot qui retourne des batailles avec ses paroles — et ses mensonges',
        'La forgeronne dont chaque arme porte une malédiction ou une bénédiction',
        'Le marchand qui finance secrètement les deux camps d\'une guerre',
        'L\'astronome-prophète que tout le monde croit, mais qui doute lui-même',
        'Le diplomate qui doit trahir son peuple pour le sauver',
      ],
    },
    {
      icon: '🧬',
      titre: 'Des motivations contradictoires et profondes',
      cliche: 'Venger sa famille / Sauver son village (point)',
      conseil: 'Pour un manga drame/émotions, les meilleures motivations sont intérieurement contradictoires : vouloir la paix mais être né pour la guerre, aimer son peuple mais remettre en question ses traditions, chercher la liberté tout en portant le poids d\'une lignée, se battre pour un idéal qu\'on commence à ne plus croire.',
      exemples: [
        'Briser une prophétie qui le/la condamne — mais que tout le monde croit vraie',
        'Prouver que l\'ancienne façon de faire doit mourir — mais en ayant honte de le penser',
        'Réconcilier deux vérités irréconciliables sur ses origines',
        'Devenir exactement ce qu\'il/elle méprisait dans ses ennemis',
        'Protéger quelqu\'un en sachant que cette protection le/la détruira',
      ],
    },
    {
      icon: '💔',
      titre: 'Des traumatismes nuancés, pas juste de la douleur brute',
      cliche: 'Village détruit → colère → vengeance',
      conseil: 'Un traumatisme riche vient d\'une décision impossible, pas juste d\'une perte. A survécu en fuyant au lieu de se battre. A trahi quelqu\'un pour une cause qui s\'est révélée fausse. Porte un pouvoir hérité qui a détruit ses ancêtres. A choisi la victoire au détriment de ses valeurs. Ce sont ces nuances qui créent l\'émotion.',
      exemples: [
        'A survécu parce qu\'il/elle a fui — et ne s\'en est jamais pardonné(e)',
        'A trahi une personne aimée pour sauver beaucoup de monde — et se demande si ça valait',
        'Porte un don ancestral qui a tué tous ceux qui l\'ont possédé avant lui/elle',
        'A choisi de gagner une guerre d\'une façon dont il/elle a honte',
      ],
    },
  ],
  systemePouvoirs: [
    {
      icon: '✨',
      titre: 'Enracine tes pouvoirs dans des mythologies réelles',
      cliche: 'Magie vague "ancestrale" sans règles ni logique',
      conseil: 'Les mythologies africaines sont d\'une richesse immense : les Orisha yoruba (Shango = foudre, Yemoja = eau, Ogun = fer et guerre, Oya = vent et changement), le concept de Maat égyptien (équilibre cosmique comme force et loi), le Nyama bambara (énergie vitale dans les objets et êtres transformés par les forgerons), le Nommo dogon, les Nkisi kongo. Ces systèmes ont des règles internes cohérentes.',
      exemples: [
        'Pouvoirs liés aux Orisha : chaque utilisateur passe un contrat avec une entité, avec ses règles et tabous',
        'Maat comme source de pouvoir : briser l\'équilibre = perdre ses capacités',
        'Nyama : la puissance cache dans les objets forgés — une épée peut avoir une volonté',
        'Mémoire ancestrale transmise physiquement par le sang ou la voix',
        'Pouvoirs liés au rôle social : un griot qui perd sa voix perd tout',
      ],
    },
    {
      icon: '⚖️',
      titre: 'Des règles strictes et des coûts réels',
      cliche: 'Pouvoir sans limite = sans tension dramatique',
      conseil: 'Les meilleurs systèmes de pouvoir manga ont un coût concret (physique, mémoriel, relationnel, moral), une condition d\'activation difficile, une limite dure et exploitable, et une faiblesse que les antagonistes peuvent découvrir et exploiter. Le pouvoir doit créer des dilemmes, pas juste des solutions.',
      exemples: [
        'Le pouvoir grandit avec la douleur — mais finit par dévorer le porteur',
        'Chaque utilisation efface un souvenir précieux et aléatoire',
        'Le pouvoir ne s\'active que dans un état émotionnel très précis et instable',
        'Utiliser ses capacités affaiblit définitivement une partie du corps',
        'Le pouvoir exige un sacrifice proportionnel à son utilisation',
      ],
    },
  ],
  politique: [
    {
      icon: '🏛️',
      titre: 'Des structures politiques sophistiquées',
      cliche: 'Des tribus en guerre constante sans nuance politique',
      conseil: 'L\'Afrique a connu parmi les empires commerciaux les plus sophistiqués du monde (Mali, Songhaï, Aksum, Kongo, Monomotapa), des confédérations d\'États avec des constitutions orales, des royaumes matriarcaux (Dahomey, certains royaumes akan), des conseils de sages régissant des cités-États, des systèmes de gestion des conflits très élaborés.',
      exemples: [
        'Empire commercial où la vraie guerre se mène avec l\'or et les routes, pas les armées',
        'Confédération régie par un Conseil des Voix — chaque clan y a un vote',
        'Royaume matriarcal avec succession par les femmes — et les hommes qui veulent changer ça',
        'Cité-État neutre dans un conflit régional — et les pressions pour la faire choisir un camp',
        'Pacte de non-agression millénaire qui commence à se fissurer',
      ],
    },
    {
      icon: '🤝',
      titre: 'Des conflits au-delà de la guerre pure',
      cliche: 'Guerre physique = seul mode de résolution des conflits',
      conseil: 'Les conflits les plus riches dramatiquement sont : économiques (qui contrôle les routes?), idéologiques (tradition vs changement), religieux (quelle divinité est vraie?), successoraux (qui hérite?), philosophiques (comment doit-on vivre?), intergénérationnels (les anciens vs les jeunes). La guerre peut en être le résultat — pas le seul mode d\'expression.',
      exemples: [
        'Guerre économique qui devient militaire quand le commerce échoue',
        'Schisme religieux qui divise familles, clans et armées',
        'La technologie nouvelle contre la sagesse ancienne — qui a raison?',
        'Qui hérite du trône quand les règles de succession sont brisées?',
        'Un peuple qui se divise sur : faut-il assimiler ou résister?',
      ],
    },
  ],
}

// ─── ANALYSE PERSONNAGE ───────────────────────────────────────────────────────
export function analyzeCharacter(character) {
  const advice = []
  const sections = []

  // — Identité (poids 15) —
  const identityScore = calcSectionScore([
    [character.name, 1],
    [character.age, 1],
    [character.gender, 1],
    [character.role, 1],
    [character.status, 1],
    [character.nickname, 3],
  ])
  sections.push({ label: 'Identité', score: identityScore, weight: 15, icon: '🪪' })
  if (!hasContent(character.name)) advice.push({ level: 'error', text: 'Le personnage n\'a pas encore de nom.' })
  if (!hasContent(character.role)) advice.push({ level: 'warning', text: 'Définis son rôle dans l\'histoire (Protagoniste, Antagoniste, Allié…).' })

  // — Apparence (poids 10) —
  const appearScore = calcSectionScore([
    [character.height, 3],
    [character.hairColor, 3],
    [character.eyeColor, 3],
    [character.distinctiveFeatures, 15],
    [character.clothingStyle, 15],
  ])
  sections.push({ label: 'Apparence', score: appearScore, weight: 10, icon: '👁️' })
  if (!hasContent(character.distinctiveFeatures, 10)) advice.push({ level: 'tip', text: 'Ajoute des traits distinctifs marquants — ce sont les détails dont le lecteur se souvient (cicatrice, tatouage, posture, regard particulier).' })
  if (!hasContent(character.clothingStyle, 10)) advice.push({ level: 'tip', text: 'Le style vestimentaire dit beaucoup sur la culture, le statut social et la personnalité.' })

  // — Personnalité (poids 25 — crucial pour drama/émotions) —
  const personScore = calcSectionScore([
    [character.qualities, 10],
    [character.flaws, 10],
    [character.fears, 10],
    [character.motivations, 10],
    [character.values, 10],
    [character.quote, 5],
  ])
  sections.push({ label: 'Personnalité', score: personScore, weight: 25, icon: '🧠' })
  if (!hasContent(character.flaws, 10)) advice.push({ level: 'warning', text: 'Ses défauts sont vides — un personnage sans failles n\'est pas crédible et ne peut pas évoluer émotionnellement.' })
  if (!hasContent(character.motivations, 10)) advice.push({ level: 'error', text: 'Sans motivation claire, les actions du personnage n\'ont pas de sens narratif.' })
  if (!hasContent(character.fears, 10)) advice.push({ level: 'tip', text: 'Les peurs profondes créent de la tension dramatique — c\'est ce qu\'un antagoniste peut exploiter.' })
  if (!hasContent(character.values, 10)) advice.push({ level: 'tip', text: 'Les valeurs définissent les lignes que le personnage ne peut pas franchir — et le moment dramatique où il les franchit quand même.' })

  // — Histoire (poids 25) —
  const histScore = calcSectionScore([
    [character.pastHistory, 30],
    [character.keyEvents, 20],
    [character.traumas, 15],
    [character.secrets, 10],
    [character.family, 10],
  ])
  sections.push({ label: 'Histoire', score: histScore, weight: 25, icon: '📜' })
  if (!hasContent(character.pastHistory, 20)) advice.push({ level: 'warning', text: 'Le passé est vide — l\'histoire d\'un personnage construit et justifie ses comportements présents.' })
  if (!hasContent(character.traumas, 10)) advice.push({ level: 'tip', text: 'Un traumatisme bien choisi peut devenir un moteur émotionnel puissant tout au long du manga.' })
  if (!hasContent(character.secrets, 10)) advice.push({ level: 'tip', text: 'Un secret gardé crée du mystère — sa révélation peut être un turning point clé.' })

  // — Compétences & Pouvoirs (poids 15) —
  const skillScore = calcSectionScore([
    [character.combatSkills, 15],
    [character.specialPowers, 15],
    [character.uniqueSkills, 10],
    [character.weaknesses, 15],
    [character.powerLevel, 1],
  ])
  sections.push({ label: 'Compétences', score: skillScore, weight: 15, icon: '⚔️' })
  if (!hasContent(character.weaknesses, 10)) advice.push({ level: 'warning', text: 'Ses limites et faiblesses ne sont pas définies — un pouvoir sans contrainte est narrativement ennuyeux et sans tension.' })
  if (!hasContent(character.uniqueSkills, 10)) advice.push({ level: 'tip', text: 'Les compétences non-combat (intelligence, rhétorique, savoir-faire artisanal) enrichissent un personnage d\'action.' })

  // — Arc Narratif (poids 10) —
  const arcScore = calcSectionScore([
    [character.objectives, 15],
    [character.internalConflicts, 15],
    [character.narrativeEvolution, 15],
    [character.turningPoint, 15],
  ])
  sections.push({ label: 'Arc Narratif', score: arcScore, weight: 10, icon: '📈' })
  if (!hasContent(character.objectives, 10)) advice.push({ level: 'warning', text: 'Définis ses objectifs — ce que veut un personnage dicte toutes ses décisions et son arc.' })
  if (!hasContent(character.internalConflicts, 10)) advice.push({ level: 'tip', text: 'Pour un manga drame/émotions, les conflits internes sont l\'essence de l\'arc émotionnel.' })
  if (!hasContent(character.narrativeEvolution, 10)) advice.push({ level: 'tip', text: 'Comment ce personnage sera-t-il différent à la fin ? C\'est la colonne vertébrale de son développement.' })

  const overallScore = calcWeightedScore(sections)

  return {
    overallScore,
    sections,
    advice,
    label: getScoreLabel(overallScore),
    color: getScoreColor(overallScore),
    africaTips: AFRICA_TIPS.personnages,
  }
}

// ─── ANALYSE MONDE ───────────────────────────────────────────────────────────
export function analyzeWorld(world) {
  const advice = []
  const sections = []

  // — Base (poids 20) —
  const baseScore = calcSectionScore([
    [world.worldName, 1],
    [world.description, 30],
    [world.era, 5],
    [world.atmosphere, 20],
  ])
  sections.push({ label: 'Présentation', score: baseScore, weight: 20, icon: '🌐' })
  if (!hasContent(world.worldName)) advice.push({ level: 'error', text: 'Ton monde n\'a pas encore de nom.' })
  if (!hasContent(world.description, 30)) advice.push({ level: 'warning', text: 'Décris ton monde en quelques phrases — c\'est la base de tout.' })
  if (!hasContent(world.atmosphere, 15)) advice.push({ level: 'tip', text: 'L\'ambiance générale (ton, feeling, registre) aide à garder la cohérence du monde.' })

  // — Géographie (poids 20) —
  const geoScore = calcSectionScore([
    [world.geography, 30],
    [world.regions, 20],
    [world.climate, 10],
    [world.resources, 10],
  ])
  sections.push({ label: 'Géographie', score: geoScore, weight: 20, icon: '🗺️' })
  if (!hasContent(world.geography, 20)) advice.push({ level: 'warning', text: 'La géographie définit les enjeux territoriaux et les cultures — élément fondateur du monde.' })
  if (!hasContent(world.resources, 10)) advice.push({ level: 'tip', text: 'Les ressources rares (eau, minerais, magie) sont souvent à l\'origine des conflits et alliances.' })

  // — Histoire (poids 20) —
  const histScore = calcSectionScore([
    [world.worldOrigins, 30],
    [world.greatWars, 20],
    [world.foundingEvents, 20],
    [world.currentState, 20],
  ])
  sections.push({ label: 'Histoire', score: histScore, weight: 20, icon: '📚' })
  if (!hasContent(world.worldOrigins, 20)) advice.push({ level: 'tip', text: 'Un mythe fondateur donne une profondeur unique et colore toute la culture du monde.' })
  if (!hasContent(world.currentState, 20)) advice.push({ level: 'warning', text: 'Décris l\'état actuel du monde — les tensions en cours au début de l\'histoire.' })

  // — Système de pouvoirs (poids 25) —
  const powerScore = calcSectionScore([
    [world.powerSystemName, 1],
    [world.powerOrigins, 20],
    [world.powerTypes, 20],
    [world.powerLimits, 20],
    [world.powerRarity, 10],
    [world.powerAcquisition, 10],
  ])
  sections.push({ label: 'Système de pouvoirs', score: powerScore, weight: 25, icon: '✨' })
  if (!hasContent(world.powerSystemName)) advice.push({ level: 'tip', text: 'Donne un nom à ton système de pouvoirs — ça le rend concret et identifiable par le lecteur.' })
  if (!hasContent(world.powerLimits, 20)) advice.push({ level: 'warning', text: 'Les limitations de ton système de pouvoirs sont cruciales — sans elles, aucun enjeu dramatique possible.' })
  if (!hasContent(world.powerOrigins, 20)) advice.push({ level: 'tip', text: 'D\'où viennent ces pouvoirs ? Un lien avec des mythologies africaines les rendra uniques et cohérents.' })

  // — Société (poids 15) —
  const societyScore = calcSectionScore([
    [world.socialStructure, 15],
    [world.religions, 15],
    [world.technology, 10],
    [world.languages, 5],
    [world.economy, 10],
  ])
  sections.push({ label: 'Société', score: societyScore, weight: 15, icon: '🏛️' })
  if (!hasContent(world.socialStructure, 15)) advice.push({ level: 'tip', text: 'La structure sociale détermine les tensions de classe et les rapports de pouvoir dans l\'histoire.' })
  if (!hasContent(world.religions, 15)) advice.push({ level: 'tip', text: 'Les croyances sont une source riche de conflits, d\'alliances et de symbolisme dans un manga.' })

  const overallScore = calcWeightedScore(sections)

  return {
    overallScore,
    sections,
    advice,
    label: getScoreLabel(overallScore),
    color: getScoreColor(overallScore),
    africaTips: [...AFRICA_TIPS.lieux, ...AFRICA_TIPS.systemePouvoirs, ...AFRICA_TIPS.politique],
  }
}

// ─── ANALYSE LIEU ────────────────────────────────────────────────────────────
export function analyzeLocation(location) {
  const advice = []
  const checks = [
    { key: 'description', label: 'description générale', minLen: 30, level: 'warning' },
    { key: 'importance', label: 'importance narrative (pourquoi ce lieu compte dans l\'histoire?)', minLen: 20, level: 'warning' },
    { key: 'inhabitants', label: 'habitants / population', minLen: 10, level: 'tip' },
    { key: 'atmosphere', label: 'particularités et ambiance', minLen: 15, level: 'tip' },
    { key: 'history', label: 'histoire du lieu', minLen: 20, level: 'tip' },
  ]

  let filled = 0
  checks.forEach(({ key, label, minLen, level }) => {
    if (hasContent(location[key], minLen)) {
      filled++
    } else {
      advice.push({ level, text: `Ajoute : ${label}.` })
    }
  })

  const score = Math.round((filled / checks.length) * 100)

  return {
    overallScore: score,
    sections: [],
    advice,
    label: getScoreLabel(score),
    color: getScoreColor(score),
    africaTips: AFRICA_TIPS.lieux,
  }
}

// ─── ANALYSE FACTION ─────────────────────────────────────────────────────────
export function analyzeFaction(faction) {
  const advice = []
  const checks = [
    { key: 'ideology', label: 'idéologie et valeurs', minLen: 20, level: 'warning' },
    { key: 'objectives', label: 'objectifs de la faction', minLen: 15, level: 'warning' },
    { key: 'leader', label: 'chef / dirigeant', minLen: 3, level: 'tip' },
    { key: 'methods', label: 'méthodes et moyens utilisés', minLen: 15, level: 'tip' },
    { key: 'factionHistory', label: 'histoire de la faction', minLen: 20, level: 'tip' },
    { key: 'enemies', label: 'ennemis et adversaires', minLen: 5, level: 'tip' },
    { key: 'motto', label: 'devise ou slogan', minLen: 3, level: 'tip' },
  ]

  let filled = 0
  checks.forEach(({ key, label, minLen, level }) => {
    if (hasContent(faction[key], minLen)) {
      filled++
    } else {
      advice.push({ level, text: `Ajoute : ${label}.` })
    }
  })

  if (!hasContent(faction.ideology, 20)) {
    // Already added above, but add specific advice
  }

  const score = Math.round((filled / checks.length) * 100)

  return {
    overallScore: score,
    sections: [],
    advice,
    label: getScoreLabel(score),
    color: getScoreColor(score),
    africaTips: AFRICA_TIPS.politique,
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function calcSectionScore(fields) {
  // fields = [[value, minLen], ...]
  let total = 0
  let filled = 0
  fields.forEach(([val, minLen]) => {
    total++
    if (hasContent(val, minLen)) filled++
  })
  return total === 0 ? 0 : Math.round((filled / total) * 100)
}

function calcWeightedScore(sections) {
  let weightedSum = 0
  let totalWeight = 0
  sections.forEach(({ score, weight }) => {
    weightedSum += score * weight
    totalWeight += weight
  })
  return totalWeight === 0 ? 0 : Math.round(weightedSum / totalWeight)
}

export function getScoreLabel(score) {
  if (score < 15) return 'Ébauche'
  if (score < 35) return 'En construction'
  if (score < 55) return 'En développement'
  if (score < 75) return 'Bien développé'
  if (score < 90) return 'Très complet'
  return 'Maîtrisé'
}

export function getScoreColor(score) {
  if (score < 30) return '#ef4444'
  if (score < 55) return '#f97316'
  if (score < 75) return '#eab308'
  return '#22c55e'
}
