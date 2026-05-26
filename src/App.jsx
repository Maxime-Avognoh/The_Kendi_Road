import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Guide from './pages/Guide.jsx'
import Soumission from './pages/Soumission.jsx'
import FeedbackPage from './pages/FeedbackPage.jsx'
import Historique from './pages/Historique.jsx'
import Parametres from './pages/Parametres.jsx'

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/soumettre" element={<Soumission />} />
          <Route path="/feedback/:id" element={<FeedbackPage />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/parametres" element={<Parametres />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
