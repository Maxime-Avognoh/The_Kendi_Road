import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CharacterList from './pages/characters/CharacterList.jsx'
import CharacterForm from './pages/characters/CharacterForm.jsx'
import CharacterSheet from './pages/characters/CharacterSheet.jsx'
import WorldHub from './pages/world/WorldHub.jsx'
import Locations from './pages/world/Locations.jsx'
import Factions from './pages/world/Factions.jsx'
import StoryArcs from './pages/story/StoryArcs.jsx'
import Timeline from './pages/story/Timeline.jsx'

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personnages" element={<CharacterList />} />
          <Route path="/personnages/nouveau" element={<CharacterForm />} />
          <Route path="/personnages/:id" element={<CharacterSheet />} />
          <Route path="/personnages/:id/modifier" element={<CharacterForm />} />
          <Route path="/monde" element={<WorldHub />} />
          <Route path="/monde/lieux" element={<Locations />} />
          <Route path="/monde/factions" element={<Factions />} />
          <Route path="/arcs" element={<StoryArcs />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
