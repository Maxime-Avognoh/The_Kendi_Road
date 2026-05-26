import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import cors from 'cors'

const app = express()
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:4173'] }))
app.use(express.json({ limit: '50kb' }))

// ─── Critères par catégorie ──────────────────────────────────────────────────
const CATEGORY_CRITERIA = {
  scenario: [
    'Originalité & Concept',
    'Structure Narrative',
    'Cohérence & Logique Interne',
    'Potentiel Émotionnel',
    'Complexité & Profondeur',
    'Potentiel Commercial & Sérialisation',
  ],
  chapitre: [
    'Pacing & Rythme',
    'Impact Dramatique',
    'Avancement Narratif',
    'Dialogues & Voix',
    'Description & Atmosphère',
    'Accroche & Cliffhanger',
  ],
  personnage: [
    'Profondeur Psychologique',
    'Cohérence Comportementale',
    'Arc de Transformation',
    'Originalité & Mémorabilité',
    'Impact Émotionnel sur le Lecteur',
    'Relations & Dynamiques',
  ],
  worldbuilding: [
    'Cohérence & Logique Interne',
    'Originalité & Créativité',
    'Richesse des Détails',
    'Intégration Narrative',
    'Potentiel d\'Exploration',
  ],
  arc: [
    'Structure & Progression',
    'Tension Dramatique',
    'Développement des Personnages',
    'Climax & Résolution',
    'Thème & Message Central',
    'Satisfaction du Lecteur',
  ],
  dialogue: [
    'Authenticité des Voix',
    'Rythme & Fluidité',
    'Sous-texte & Profondeur',
    'Exposition Naturelle',
    'Tension & Conflit Verbal',
  ],
  theme: [
    'Clarté du Message',
    'Profondeur Philosophique',
    'Universalité & Résonance',
    'Cohérence avec le Récit',
    'Originalité de la Perspective',
  ],
}

// ─── Prompts par catégorie ────────────────────────────────────────────────────
function buildCategoryContext(category, subcategory) {
  const contexts = {
    scenario: `Tu analyses un SCÉNARIO GLOBAL ou un PITCH d'œuvre manga/littéraire. Évalue la solidité du concept, son originalité, sa cohérence interne et son potentiel narratif sur le long terme. Pense aux grandes œuvres comme Fullmetal Alchemist, Attack on Titan, One Piece — qu'est-ce qui leur donne leur force ? Applique ces standards.`,
    chapitre: `Tu analyses un CHAPITRE ou une SCÈNE. Évalue le rythme, l'impact dramatique de chaque beat narratif, la qualité des dialogues et des descriptions. Pense à comment un mangaka dessinerait chaque panel — est-ce que le texte se traduit en images percutantes ?`,
    personnage: `Tu analyses un PERSONNAGE — sa fiche, son histoire, sa psychologie. Évalue la profondeur et la cohérence de ce personnage. Les meilleurs personnages de manga ont une blessure intérieure claire, un code moral défini et une trajectoire de transformation évidente. Applique ces critères avec exigence.`,
    worldbuilding: `Tu analyses du WORLD BUILDING — un univers, un système de magie/pouvoir, une géopolitique, une culture. Évalue la cohérence logique, l'originalité et la richesse du monde. Un bon world building sert l'histoire et les personnages — il ne doit jamais être fine à lui-même.`,
    arc: `Tu analyses un ARC NARRATIF — une progression d'histoire avec début, milieu et fin. Évalue la structure dramatique, la montée des enjeux, le développement des personnages et la satisfaction de la résolution. Applique les principes du voyage du héros et de la structure en 3 actes.`,
    dialogue: `Tu analyses des DIALOGUES ou de l'ÉCRITURE. Évalue l'authenticité des voix des personnages, le sous-texte, la fluidité de la lecture. En manga, chaque ligne de dialogue doit servir soit le caractère soit l'intrigue — souvent les deux. Aucun mot ne doit être gaspillé.`,
    theme: `Tu analyses un THÈME ou un MESSAGE. Évalue comment l'auteur explore ce thème, sa profondeur et son universalité. Les meilleures œuvres ont un thème central qui résonne à travers chaque scène et chaque personnage. Exemple : FMA parle de l'équivalence des échanges comme métaphore de la mort et du sacrifice.`,
  }
  return contexts[category] || contexts.scenario
}

function buildSystemPrompt() {
  return `Tu es MAESTRO — conseiller éditorial d'élite spécialisé dans le manga et la littérature narrative d'action/aventure/drame. Tu as formé des auteurs publiés chez Jump, Shonen Magazine, et des maisons d'édition françaises de premier plan. Tu es exigeant, direct, passionné, et tu ne flattes jamais sans raison.

Ton objectif : transformer des auteurs en devenir en futures stars. Tu crois au potentiel de chacun, mais tu n'acceptes pas la médiocrité. Tu donnes des feedbacks précis, actionnables et profonds — pas des généralités.

RÈGLES ABSOLUES :
- Tu répondes UNIQUEMENT en JSON valide
- Tu n'utilises jamais de markdown dans tes valeurs JSON (pas de **, pas de #)
- Tes notes sont précises (utilise les décimales : 14.5, 16, 18.5...)
- Tes commentaires sont longs, détaillés, avec des exemples concrets
- Tu parles à l'auteur directement (tu/vous)
- Ton ton est celui d'un mentor expert : bienveillant mais sans complaisance
- Chaque critique est accompagnée d'une suggestion concrète
- Tu cites des œuvres de référence quand pertinent (manga, romans, films)

FORMAT JSON OBLIGATOIRE :
{
  "introduction": "string — ton premier ressenti honnête en 3-4 phrases percutantes",
  "global_score": number,
  "global_comment": "string — explication du score global en 2-3 phrases",
  "criteria": [
    {
      "name": "string",
      "score": number,
      "icon": "string — emoji représentatif",
      "comment": "string — analyse approfondie de ce critère (au moins 3-4 phrases)",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    }
  ],
  "what_works": ["string — élément fort avec explication"],
  "what_needs_work": ["string — problème avec solution concrète"],
  "action_points": [
    {
      "priority": "haute|moyenne|basse",
      "action": "string — action concrète et précise"
    }
  ],
  "reference_works": ["string — œuvre de référence avec explication du rapport"],
  "potential_assessment": "string — évaluation du potentiel de l'auteur (3-4 phrases)",
  "verdict": "string — verdict final en une phrase courte et percutante"
}`
}

function buildUserPrompt(category, subcategory, title, content, context, additionalContext) {
  const categoryContext = buildCategoryContext(category)
  const criteria = CATEGORY_CRITERIA[category] || CATEGORY_CRITERIA.scenario

  return `${categoryContext}

CATÉGORIE : ${category.toUpperCase()}${subcategory ? ` — ${subcategory}` : ''}
TITRE DE L'ŒUVRE/SOUMISSION : ${title || 'Sans titre'}
${context ? `CONTEXTE FOURNI PAR L'AUTEUR : ${context}` : ''}
${additionalContext ? `INFORMATIONS SUPPLÉMENTAIRES : ${additionalContext}` : ''}

CONTENU À ANALYSER :
---
${content}
---

Analyse ce contenu avec les critères suivants et note chacun sur 20 :
${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Sois précis, exigeant et constructif. L'auteur veut progresser, pas être flatté.
Réponds en JSON valide uniquement.`
}

// ─── Route API ────────────────────────────────────────────────────────────────
app.post('/api/feedback', async (req, res) => {
  const apiKey = req.headers['x-api-key'] || process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(400).json({ error: 'Clé API Anthropic manquante. Configurez ANTHROPIC_API_KEY ou passez-la dans x-api-key.' })
  }

  const { category, subcategory, title, content, context, additionalContext } = req.body
  if (!content || content.trim().length < 50) {
    return res.status(400).json({ error: 'Le contenu doit faire au moins 50 caractères.' })
  }

  const client = new Anthropic({ apiKey })

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 8000,
      system: buildSystemPrompt(),
      messages: [{
        role: 'user',
        content: buildUserPrompt(category, subcategory, title, content, context, additionalContext)
      }]
    })

    const rawText = message.content[0].text.trim()
    // Extract JSON even if there's surrounding text
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Format JSON invalide dans la réponse')

    const feedback = JSON.parse(jsonMatch[0])
    res.json({ success: true, feedback })
  } catch (err) {
    console.error('Feedback error:', err)
    if (err instanceof SyntaxError) {
      res.status(500).json({ error: 'Erreur de parsing JSON dans la réponse IA.' })
    } else {
      res.status(500).json({ error: err.message || 'Erreur serveur.' })
    }
  }
})

app.get('/api/health', (_req, res) => res.json({ status: 'ok', version: '2.0.0' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🎌 MAESTRO API → http://localhost:${PORT}`))
