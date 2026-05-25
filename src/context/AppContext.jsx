import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e)
  }
  return defaultValue
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e)
  }
}

export function AppProvider({ children }) {
  const [characters, setCharacters] = useState(() => loadFromStorage('kendi_characters', []))
  const [locations, setLocations] = useState(() => loadFromStorage('kendi_locations', []))
  const [factions, setFactions] = useState(() => loadFromStorage('kendi_factions', []))
  const [storyArcs, setStoryArcs] = useState(() => loadFromStorage('kendi_storyArcs', []))
  const [timelineEvents, setTimelineEvents] = useState(() => loadFromStorage('kendi_timelineEvents', []))
  const [worldData, setWorldData] = useState(() => loadFromStorage('kendi_worldData', {}))

  useEffect(() => { saveToStorage('kendi_characters', characters) }, [characters])
  useEffect(() => { saveToStorage('kendi_locations', locations) }, [locations])
  useEffect(() => { saveToStorage('kendi_factions', factions) }, [factions])
  useEffect(() => { saveToStorage('kendi_storyArcs', storyArcs) }, [storyArcs])
  useEffect(() => { saveToStorage('kendi_timelineEvents', timelineEvents) }, [timelineEvents])
  useEffect(() => { saveToStorage('kendi_worldData', worldData) }, [worldData])

  // Characters
  const addCharacter = useCallback((character) => {
    setCharacters(prev => [...prev, { ...character, createdAt: Date.now() }])
  }, [])

  const updateCharacter = useCallback((id, updates) => {
    setCharacters(prev => prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c))
  }, [])

  const deleteCharacter = useCallback((id) => {
    setCharacters(prev => prev.filter(c => c.id !== id))
  }, [])

  // Locations
  const addLocation = useCallback((location) => {
    setLocations(prev => [...prev, { ...location, createdAt: Date.now() }])
  }, [])

  const updateLocation = useCallback((id, updates) => {
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updates, updatedAt: Date.now() } : l))
  }, [])

  const deleteLocation = useCallback((id) => {
    setLocations(prev => prev.filter(l => l.id !== id))
  }, [])

  // Factions
  const addFaction = useCallback((faction) => {
    setFactions(prev => [...prev, { ...faction, createdAt: Date.now() }])
  }, [])

  const updateFaction = useCallback((id, updates) => {
    setFactions(prev => prev.map(f => f.id === id ? { ...f, ...updates, updatedAt: Date.now() } : f))
  }, [])

  const deleteFaction = useCallback((id) => {
    setFactions(prev => prev.filter(f => f.id !== id))
  }, [])

  // Story Arcs
  const addStoryArc = useCallback((arc) => {
    setStoryArcs(prev => [...prev, { ...arc, createdAt: Date.now() }])
  }, [])

  const updateStoryArc = useCallback((id, updates) => {
    setStoryArcs(prev => prev.map(a => a.id === id ? { ...a, ...updates, updatedAt: Date.now() } : a))
  }, [])

  const deleteStoryArc = useCallback((id) => {
    setStoryArcs(prev => prev.filter(a => a.id !== id))
  }, [])

  // Timeline Events
  const addTimelineEvent = useCallback((event) => {
    setTimelineEvents(prev => [...prev, { ...event, createdAt: Date.now() }])
  }, [])

  const updateTimelineEvent = useCallback((id, updates) => {
    setTimelineEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates, updatedAt: Date.now() } : e))
  }, [])

  const deleteTimelineEvent = useCallback((id) => {
    setTimelineEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  // World Data
  const updateWorldData = useCallback((updates) => {
    setWorldData(prev => ({ ...prev, ...updates, updatedAt: Date.now() }))
  }, [])

  const value = {
    characters,
    locations,
    factions,
    storyArcs,
    timelineEvents,
    worldData,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    addLocation,
    updateLocation,
    deleteLocation,
    addFaction,
    updateFaction,
    deleteFaction,
    addStoryArc,
    updateStoryArc,
    deleteStoryArc,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    updateWorldData,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
