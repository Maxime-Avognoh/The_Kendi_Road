import React, { createContext, useContext, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AppContext = createContext(null)

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) return JSON.parse(stored)
  } catch (e) { /* ignore */ }
  return defaultValue
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) { /* ignore */ }
}

export function AppProvider({ children }) {
  const [submissions, setSubmissions] = useState(() => loadFromStorage('maestro_submissions', []))
  const [apiKey, setApiKeyState] = useState(() => loadFromStorage('maestro_apikey', ''))

  const saveApiKey = useCallback((key) => {
    setApiKeyState(key)
    saveToStorage('maestro_apikey', key)
  }, [])

  const addSubmission = useCallback((data, feedback) => {
    const submission = {
      id: uuidv4(),
      createdAt: Date.now(),
      ...data,
      feedback,
    }
    setSubmissions(prev => {
      const next = [submission, ...prev].slice(0, 50) // max 50 historique
      saveToStorage('maestro_submissions', next)
      return next
    })
    return submission.id
  }, [])

  const deleteSubmission = useCallback((id) => {
    setSubmissions(prev => {
      const next = prev.filter(s => s.id !== id)
      saveToStorage('maestro_submissions', next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setSubmissions([])
    saveToStorage('maestro_submissions', [])
  }, [])

  return (
    <AppContext.Provider value={{
      submissions,
      apiKey,
      saveApiKey,
      addSubmission,
      deleteSubmission,
      clearHistory,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
