// ─── Client API pour MAESTRO ──────────────────────────────────────────────────

export async function submitForFeedback({ category, subcategory, title, content, context, additionalContext, apiKey }) {
  const headers = { 'Content-Type': 'application/json' }
  if (apiKey) headers['x-api-key'] = apiKey

  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers,
    body: JSON.stringify({ category, subcategory, title, content, context, additionalContext }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `Erreur serveur (${res.status})`)
  if (!data.success) throw new Error(data.error || 'Erreur inconnue')
  return data.feedback
}

export async function checkServerHealth() {
  try {
    const res = await fetch('/api/health')
    return res.ok
  } catch {
    return false
  }
}
